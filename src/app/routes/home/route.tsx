import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@connectrpc/connect';
import { createConnectTransport } from '@connectrpc/connect-web';
import {
  PetService,
  PetStatus,
} from '@nareshbhatia/grpc-pet-server/gen/ts/pet/v1/pet_pb';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

const transport = createConnectTransport({
  baseUrl: 'http://localhost:8080',
});

const client = createClient(PetService, transport);

function formatPetStatus(status: PetStatus | null): string {
  if (status === null) return 'Not fetched';

  // Convert enum to human-readable string
  const statusStr = PetStatus[status] || String(status);
  // Convert SNAKE_CASE to Title Case
  return statusStr
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function formatHeartbeat(timestampMs: number | null): string {
  if (timestampMs === null) return 'Not subscribed';
  return format(new Date(timestampMs), 'hh:mm:ss a');
}

export function HomePage() {
  const [status, setStatus] = useState<PetStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [heartbeat, setHeartbeat] = useState<number | null>(null);

  const fetchStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.getStatus({});
      setStatus(response.status);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchStatus();

    // Subscribe to heartbeat stream
    const abortController = new AbortController();

    void (async () => {
      try {
        for await (const response of client.subscribeHeartbeat(
          {},
          { signal: abortController.signal },
        )) {
          setHeartbeat(Number(response.timestampMs));
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Heartbeat error:', err);
        }
      }
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="container flex-1 w-full">
      <main className="flex flex-col gap-8 py-8">
        <h1 className="text-2xl font-bold">Home</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Pet Status</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Status:
                </p>
                {error !== null && error !== '' ? (
                  <p className="text-lg font-semibold text-destructive">
                    Error: {error}
                  </p>
                ) : (
                  <p className="text-lg font-semibold">
                    {formatPetStatus(status)}
                  </p>
                )}
              </div>
              <Button disabled={loading} onClick={fetchStatus}>
                {loading ? 'Loading...' : 'Get Latest Status'}
              </Button>
            </CardContent>
          </Card>

          {/* Heartbeat Card */}
          <Card>
            <CardHeader>
              <CardTitle>Pet Heartbeat</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Heartbeat:
                </p>
                <p className="text-lg font-semibold font-mono tabular-nums">
                  {formatHeartbeat(heartbeat)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
