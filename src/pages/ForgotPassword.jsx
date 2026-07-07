import { Link } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { T } from '@/lib/translations';
import AuthLayout from '@/components/AuthLayout';

export default function ForgotPassword() {
  const [lang] = useLanguage();
  const t = T[lang];

  return (
    <AuthLayout
      icon={KeyRound}
      title={t.auth_reset_password}
      subtitle={null}
      footer={
        <Link to="/login" className="text-gold font-medium hover:underline">
          {t.auth_back_to_sign_in}
        </Link>
      }
    >
      <div className="flex flex-col gap-3 py-2">
        <p className="font-inter text-sm text-foreground leading-relaxed">
          Accounts in Fiat Lux are stored locally on this device only — no email server is involved,
          so password recovery by email is not available.
        </p>
        <p className="font-inter text-sm text-muted-foreground leading-relaxed">
          If you have forgotten your password, the simplest option is to create a new account.
          Your favorites and settings are tied to local storage, so they will carry over
          if you use the same device.
        </p>
      </div>
    </AuthLayout>
  );
}
