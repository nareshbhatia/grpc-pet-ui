# gRPC Pet UI

A simple React app to demonstrate gRPC concepts. Connects to the
[gRPC Pet Server](https://github.com/nareshbhatia/grpc-pet-server).

![Screenshot](assets/screenshot.png)

## Prerequisites for development

1. Install [Node Version Manager](https://github.com/nvm-sh/nvm) (nvm). It
   allows using different versions of node via the command line
2. Run `nvm use` to use the required version of node.
3. Run `pnpm i` to install required packages.
4. Make sure that
   [gRPC Pet Server](https://github.com/nareshbhatia/grpc-pet-server) is running
   on port 8080 (`go run server/main.go`).

## Development Build

```shell
pnpm dev
```

Now point your browser to http://localhost:3000

## Production Build

```shell
pnpm build
pnpm preview
```

Now point your browser to http://localhost:3000

## All Commands

```
pnpm build            # builds the prod bundle
pnpm clean            # deletes all build artifacts
pnpm dev              # runs the dev build
pnpm fix              # lints, formats and attempts to fix any issues (requires `pnpm build` has been ran)
pnpm lint             # runs the linter, useful for debugging lint issues (generally `pnpm fix` is preferred)
pnpm preview          # runs the prod build
```
