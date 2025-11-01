import { fetchData, ResponseRegister, url } from '@/lib/utils';
import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    const responseRegister: ResponseRegister = await fetchData(`${url}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (responseRegister.error) {
      setErr(responseRegister.error.message);
      setLoading(false);
      return;
    }

    if (responseRegister.data?.token) {
      localStorage.setItem('token', responseRegister.data.token);
      alert('Account successfully created');
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
          <h1 className="text-2xl font-bold text-center mb-6">Inscription</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nom</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
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
                required
                minLength={6}
                className="flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Minimum 6 caractères"
              />
            </div>

            {err && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm">
                {err}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Inscription...' : "S'inscrire"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Déjà un compte ?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
