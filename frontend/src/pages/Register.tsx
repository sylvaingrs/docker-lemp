import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AuthCardLayout from '@/components/layout/AuthCardLayout';
import { fetchData, ResponseRegisterAndLogin, mainUrl } from '@/lib/utils';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { setAccessToken } from '@/lib/auth';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    const responseRegister: ResponseRegisterAndLogin = await fetchData(
      `${mainUrl}/api/auth/register`,
      'POST',
      formData,
    );
    if (responseRegister.error) {
      setErr(responseRegister.error.message);
      setLoading(false);
      return;
    }
    if (responseRegister.data?.accessToken) {
      setAccessToken(responseRegister.data.accessToken);
      window.location.href = '/';
    } else {
      setErr('No token returned');
    }
    setLoading(false);
  };

  return (
    <AuthCardLayout
      title="Inscription"
      footer={
        <p className="s-text-regular">
          Déjà un compte ?{' '}
          <Link to="/login" className="s-link">
            Se connecter
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="s-flex s-flex-column s-gap-l">
        <div className="s-flex s-flex-column s-gap-s">
          <label className="s-label">Nom</label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Votre nom"
            required
          />
        </div>
        <div className="s-flex s-flex-column s-gap-s">
          <label className="s-label">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="email@example.com"
            required
          />
        </div>
        <div className="s-flex s-flex-column s-gap-s">
          <label className="s-label">Mot de passe</label>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Minimum 6 caractères"
            required
            minLength={6}
          />
        </div>
        {err && <div className="s-error-box">{err}</div>}
        <Button type="submit" className="s-w-full" disabled={loading}>
          {loading ? 'Inscription...' : "S'inscrire"}
        </Button>
      </form>
    </AuthCardLayout>
  );
}
