import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react';
import { AuthLayout, Divider, GoogleButton } from './AuthLayout';
import { Button } from '../../components/ui/Button';
import { Checkbox, Field, Input } from '../../components/ui/Input';
import { Alert } from '../../components/ui/States';
import { useUser } from '../../contexts/UserContext';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('Anurag.Yadav@ngip.io');
  const [password, setPassword] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { switchRole } = useUser();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }
    setLoading(true);
    window.setTimeout(() => navigate('/app/dashboard'), 700);
  };

  return (
    <AuthLayout
      title="Sign in to NGIP"
      subtitle="Access global economic research, instruments and your portfolio."
      footer={
      <div className="space-y-4">
          <Divider label="or" />
          <GoogleButton label="Continue with Google" />
          <p className="text-center text-[13px] text-ink-3">
            New to NGIP?{' '}
            <Link
            to="/register"
            className="font-medium text-accent hover:text-accent-hover">
            
              Create account
            </Link>
          </p>
          
          <div className="mt-8 rounded-lg border border-line-strong bg-subtle p-4">
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-ink-3">Demo Roles</h3>
            <div className="space-y-2">
              <Button 
                type="button" 
                variant="secondary" 
                size="sm" 
                full 
                onClick={() => { switchRole('Individual'); navigate('/app/dashboard'); }}
              >
                Continue as Individual investor
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                size="sm" 
                full 
                onClick={() => { switchRole('Admin'); navigate('/admin/dashboard'); }}
              >
                Continue as Admin
              </Button>
            </div>
          </div>
          <p className="flex items-center justify-center gap-1.5 border-t border-line pt-4 text-[11px] text-ink-4">
            <LockIcon className="h-3 w-3" />
            Protected by 256-bit TLS. NGIP never asks for your password by email.
          </p>
        </div>
      }>
      
      <form onSubmit={submit} className="space-y-4">
        {error && <Alert tone="neg" title={error} />}
        <Field label="Email" required>
          <Input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com" />
          
        </Field>
        <Field label="Password" required>
          <div className="relative">
            <Input
              type={show ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="pr-10" />
            
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? 'Hide password' : 'Show password'}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-4 transition-colors duration-150 ease-swift hover:text-ink-2">
              
              {show ?
              <EyeOffIcon className="h-4 w-4" /> :

              <EyeIcon className="h-4 w-4" />
              }
            </button>
          </div>
        </Field>
        <div className="flex items-center justify-between">
          <Checkbox checked={remember} onChange={setRemember} label="Remember me" />
          <Link
            to="/forgot-password"
            className="text-xs font-medium text-accent hover:text-accent-hover">
            
            Forgot password?
          </Link>
        </div>
        <Button type="submit" variant="primary" size="lg" full loading={loading}>
          Sign in
        </Button>
      </form>
    </AuthLayout>);

}