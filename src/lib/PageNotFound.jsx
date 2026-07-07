import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <p className="font-inter text-xs font-medium tracking-[0.15em] uppercase text-gold mb-2">404</p>
      <h1 className="font-playfair text-4xl font-bold text-foreground mb-3">Page Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-xs">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button onClick={() => navigate('/')}>Go Home</Button>
    </div>
  );
}
