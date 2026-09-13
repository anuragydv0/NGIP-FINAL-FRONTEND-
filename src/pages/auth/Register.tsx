import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckIcon } from 'lucide-react';
import { AuthLayout, Divider, GoogleButton } from './AuthLayout';
import { Button } from '../../components/ui/Button';
import { Checkbox, Field, Input, Select } from '../../components/ui/Input';
import { cx } from '../../utils/format';

const strengthLabels = ['Too short', 'Weak', 'Fair', 'Strong'];

export function Register() {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [country, setCountry] = React.useState('India');
  const [agree, setAgree] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const strength = Math.min(
    3,
    (password.length >= 8 ? 1 : 0) + (
    /[A-Z]/.test(password) ? 1 : 0) + (
    /[0-9!@#$%^&*]/.test(password) ? 1 : 0)
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    window.setTimeout(() => navigate('/onboarding'), 700);
  };

  return (
    <AuthLayout
      title="Create your NGIP account"
      subtitle="Research economies, discover instruments and track your global exposure."
      footer={
      <div className="space-y-4">
          <Divider label="or" />
          <GoogleButton label="Sign up with Google" />
          <p className="text-center text-[13px] text-ink-3">
            Already have an account?{' '}
            <Link
            to="/login"
            className="font-medium text-accent hover:text-accent-hover">
            
              Sign in
            </Link>
          </p>
        </div>
      }>
      
      <form onSubmit={submit} className="space-y-4">
        <Field label="Full name" required>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Aditya Rao"
            autoComplete="name" />
          
        </Field>
        <Field label="Email" required>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            autoComplete="email" />
          
        </Field>
        <Field
          label="Password"
          required
          hint="At least 8 characters, with a capital letter and a number or symbol.">
          
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••"
            autoComplete="new-password" />
          
          {password.length > 0 &&
          <div className="mt-2 flex items-center gap-2">
              <div className="flex flex-1 gap-1">
                {[0, 1, 2].map((i) =>
              <span
                key={i}
                className={cx(
                  'h-1 flex-1 rounded-full transition-colors duration-200 ease-swift',
                  i < strength ?
                  strength === 3 ?
                  'bg-pos' :
                  strength === 2 ?
                  'bg-warn' :
                  'bg-neg' :
                  'bg-ink/10'
                )} />

              )}
              </div>
              <span className="text-[11px] font-medium text-ink-3">
                {strengthLabels[strength]}
              </span>
            </div>
          }
        </Field>
        <Field label="Country of residence">
          <Select value={country} onChange={(e) => setCountry(e.target.value)}>
            {['India', 'Singapore', 'United Arab Emirates', 'United Kingdom', 'United States'].map(
              (c) =>
              <option key={c}>{c}</option>

            )}
          </Select>
        </Field>
        <Checkbox
          checked={agree}
          onChange={setAgree}
          label={
          <span className="text-xs leading-relaxed text-ink-3">
              I agree to the NGIP terms of service, risk disclosure and privacy
              policy.
            </span>
          } />
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          full
          loading={loading}
          disabled={!agree}>
          
          Create account
        </Button>
        <ul className="space-y-1.5 pt-1">
          {[
          'No charge to research economies and instruments',
          'Simulated portfolio to start — funding is optional'].
          map((t) =>
          <li key={t} className="flex items-start gap-2 text-[11px] text-ink-4">
              <CheckIcon className="mt-0.5 h-3 w-3 shrink-0 text-accent" />
              {t}
            </li>
          )}
        </ul>
      </form>
    </AuthLayout>);

}