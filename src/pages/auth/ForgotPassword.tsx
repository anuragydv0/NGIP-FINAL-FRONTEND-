import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, MailCheckIcon } from 'lucide-react';
import { AuthLayout } from './AuthLayout';
import { Button } from '../../components/ui/Button';
import { Field, Input } from '../../components/ui/Input';
import { Alert } from '../../components/ui/States';

export function ForgotPassword() {
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 700);
  };

  return (
    <AuthLayout
      title={sent ? 'Check your inbox' : 'Reset your password'}
      subtitle={
      sent ?
      undefined :
      'Enter the email associated with your NGIP account and we will send a secure reset link.'
      }
      footer={
      <Link
        to="/login"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-3 transition-colors duration-150 ease-swift hover:text-accent">
        
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          Back to sign in
        </Link>
      }>
      
      {sent ?
      <div className="space-y-5">
          <div className="flex flex-col items-center rounded-lg border border-line bg-subtle px-6 py-8 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
              <MailCheckIcon className="h-5 w-5" />
            </span>
            <p className="mt-4 text-[13px] font-semibold text-ink">
              Reset link sent to {email || 'your email'}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-3">
              The link expires in 30 minutes. If it does not arrive, check your
              spam folder or request another.
            </p>
          </div>
          <Button full variant="secondary" onClick={() => setSent(false)}>
            Send again
          </Button>
        </div> :

      <form onSubmit={submit} className="space-y-4">
          <Alert tone="info">
            For your security, we never confirm whether an email is registered.
          </Alert>
          <Field label="Email" required>
            <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            autoComplete="email" />
          
          </Field>
          <Button type="submit" variant="primary" size="lg" full loading={loading}>
            Send reset link
          </Button>
        </form>
      }
    </AuthLayout>);

}