import { fetchData, ResponseRegisterAndLogin, url } from '@/lib/utils';
import { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setErr('');
    setLoading(true);
    const responseLogin: ResponseRegisterAndLogin = await fetchData(
      `${url}/api/auth/login`,
      'POST',
      formData,
    );

    if (responseLogin.error) {
      setErr(responseLogin.error.message);
      setLoading(false);
      return;
    }

    if (responseLogin.data?.accessToken) {
      localStorage.setItem('accessToken', responseLogin.data.accessToken);
      window.location.href = '/';
    } else {
      setErr('No token returned');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Mot de passe</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Votre mot de passe"
              />
            </div>

            {err && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm">
                {err}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-4">
            Pas encore de compte ?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              S'inscrire
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
