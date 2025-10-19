import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthCardLayout from '@/components/layout/AuthCardLayout';
import { fetchData, ResponseRegisterAndLogin, mainUrl } from '@/lib/utils';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { setAccessToken } from '@/lib/auth';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setErr('');
    setLoading(true);
    const responseLogin: ResponseRegisterAndLogin = await fetchData(
      `${mainUrl}/api/auth/login`,
      'POST',
      formData,
    );
    if (responseLogin.error) {
      setErr(responseLogin.error.message);
      setLoading(false);
      return;
    }
    if (responseLogin.data?.accessToken) {
      setAccessToken(responseLogin.data.accessToken);
      window.location.href = '/';
    } else {
      setErr('No token returned');
    }
    setLoading(false);
  };

  return (
    <AuthCardLayout
      title="Connexion"
      footer={
        <p className="s-text-regular">
          Pas encore de compte ?{' '}
          <Link to="/register" className="s-link">
            S'inscrire
          </Link>
        </p>
      }
    >
      <div className="s-flex s-flex-column s-gap-l">
        <div className="s-flex s-flex-column s-gap-s">
          <label className="s-label">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="votre@email.com"
          />
        </div>
        <div className="s-flex s-flex-column s-gap-s">
          <label className="s-label">Mot de passe</label>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Votre mot de passe"
          />
        </div>
        {err && <div className="s-error-box">{err}</div>}
        <Button className="s-w-full" disabled={loading} onClick={handleSubmit}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </Button>
      </div>
    </AuthCardLayout>
  );
}
