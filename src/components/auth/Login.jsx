import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { alumni, students, adminUsers } from '../../data/staticData';
import { User, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      let user = null;
      
      if (credentials.role === 'admin') {
        user = adminUsers.find(
          admin => admin.username === credentials.email && admin.password === credentials.password
        );
      } else if (credentials.role === 'alumni') {
        // Simple alumni login: email = 'alumni', password = '123'
        if (credentials.email === 'alumni' && credentials.password === '123') {
          // Return the first alumni (Sarah Johnson) as the logged-in user
          user = alumni[0];
        } else {
          user = null;
        }
      } else if (credentials.role === 'student') {
        // Simple student login: email = 'std', password = '123'
        if (credentials.email === 'std' && credentials.password === '123') {
          // Return the first student (Alex Kumar) as the logged-in user
          user = students[0];
        } else {
          user = null;
        }
      }

      if (user) {
        login(user, credentials.role);
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };

  const demoCredentials = {
    admin: { email: 'admin', password: 'admin123' },
    alumni: { email: 'alumni', password: '123' },
    student: { email: 'std', password: '123' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Alumni Portal</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Login As
            </label>
            <select
              value={credentials.role}
              onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
              className="input-field"
            >
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
              <option value="admin">College Admin</option>
            </select>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email/Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="input-field pl-10"
                placeholder={
                  credentials.role === 'admin' ? 'Username' : 
                  credentials.role === 'alumni' ? 'alumni' : 
                  'std'
                }
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="input-field pl-10"
                placeholder={credentials.role === 'admin' ? 'admin123' : '123'}
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            <LogIn className="h-5 w-5" />
            <span>Sign In</span>
          </button>
        </form>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Demo Credentials:</h3>
          <div className="space-y-2 text-xs text-gray-600">
            <div><strong>Admin:</strong> admin / admin123</div>
            <div><strong>Alumni:</strong> alumni / 123</div>
            <div><strong>Student:</strong> std / 123</div>
          </div>
        </div>

        {/* Quick Login Buttons */}
        <div className="mt-4 space-y-2">
          <div className="text-center text-sm text-gray-600 mb-2">Quick Login:</div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => {
                setCredentials({ email: 'admin', password: 'admin123', role: 'admin' });
              }}
              className="btn-secondary text-xs py-1"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => {
                setCredentials({ email: 'alumni', password: '123', role: 'alumni' });
              }}
              className="btn-secondary text-xs py-1"
            >
              Alumni
            </button>
            <button
              type="button"
              onClick={() => {
                setCredentials({ email: 'std', password: '123', role: 'student' });
              }}
              className="btn-secondary text-xs py-1"
            >
              Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
