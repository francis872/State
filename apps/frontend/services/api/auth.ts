import api from './api';

export async function login(email: string, password: string) {
  const { data } = await api.post('/auth/login', { email, password });
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;
  }
  return data;
}

export async function register(email: string, password: string, name?: string, orgName?: string) {
  const { data } = await api.post('/auth/register', { email, password, name, orgName });
  return data;
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.cookie = 'token=; path=/; max-age=0';
  }
}
