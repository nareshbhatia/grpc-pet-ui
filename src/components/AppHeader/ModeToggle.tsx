import { Icons } from '@/components/Icons';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button onClick={handleClick} size="icon" variant="outline">
      {theme === 'light' ? <Icons.moon /> : <Icons.sun />}
    </Button>
  );
}
