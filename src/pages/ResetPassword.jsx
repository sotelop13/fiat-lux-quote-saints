import { Link } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { T } from '@/lib/translations';
import AuthLayout from '@/components/AuthLayout';

export default function ResetPassword() {
  const [lang] = useLanguage();
  const t = T[lang];

  return (
    <AuthLayout
      icon={KeyRound}
      title={t.auth_new_password}
      subtitle={null}
      footer={
        <Link to="/login" className="text-gold font-medium hover:underline">
          {t.auth_back_to_sign_in}
        </Link>
      }
    >
      <div className="flex flex-col gap-3 py-2">
        <p className="font-inter text-sm text-foreground leading-relaxed">
          Accounts in Fiat Lux are stored locally on this device — password reset links
          are not supported.
        </p>
        <p className="font-inter text-sm text-muted-foreground leading-relaxed">
          If you cannot access your account, create a new one. Your favorites and settings
          stored on this device will remain intact.
        </p>
      </div>
    </AuthLayout>
  );
}
