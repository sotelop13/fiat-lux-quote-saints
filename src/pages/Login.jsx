import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LatinCrossIcon from '@/components/LatinCrossIcon';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';
import { T } from '@/lib/translations';
import AuthLayout from '@/components/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login() {
  const navigate = useNavigate();
  const { login, loginAsGuest } = useAuth();
  const [lang] = useLanguage();
  const t = T[lang];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(err?.message ?? 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    loginAsGuest();
    navigate('/');
  };

  return (
    <AuthLayout
      icon={LatinCrossIcon}
      title={t.auth_welcome_back}
      subtitle={t.auth_sign_in_sub}
      footer={
        <>
          {t.auth_no_account}{' '}
          <Link to="/register" className="text-gold font-medium hover:underline">
            {t.auth_create_one}
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">{t.auth_email}</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{t.auth_password}</Label>
            <Link to="/forgot-password" className="text-xs text-gold hover:underline">
              {t.auth_forgot_password}
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? t.auth_signing_in : t.auth_sign_in}
        </Button>
      </form>

      <Button
        variant="ghost"
        className="w-full mt-2 text-muted-foreground hover:text-foreground"
        onClick={handleGuest}
        disabled={loading}
        type="button"
      >
        {t.auth_guest}
      </Button>
    </AuthLayout>
  );
}
