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

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [lang] = useLanguage();
  const t = T[lang];
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({ email, password, full_name: fullName });
      navigate('/');
    } catch (err) {
      setError(err?.message ?? 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      icon={LatinCrossIcon}
      title={t.auth_create_account}
      subtitle={t.auth_join_sub}
      footer={
        <>
          {t.auth_have_account}{' '}
          <Link to="/login" className="text-gold font-medium hover:underline">
            {t.auth_sign_in_link}
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="full-name">{t.auth_full_name}</Label>
          <Input
            id="full-name"
            type="text"
            placeholder={t.auth_your_name}
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            autoComplete="name"
          />
        </div>
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
          <Label htmlFor="password">{t.auth_password}</Label>
          <Input
            id="password"
            type="password"
            placeholder={t.auth_pass_hint}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? t.auth_creating : t.auth_create_account}
        </Button>
      </form>

    </AuthLayout>
  );
}
