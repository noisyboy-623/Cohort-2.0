import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { useAuth } from '../hook/useAuth'

const Login = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState('')
    const [ focusedInput, setFocusedInput ] = useState(null)

    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    const { handleLogin } = useAuth()

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'email') setEmail(value)
        if (name === 'password') setPassword(value)
    }

    const submitForm = async (event) => {
        event.preventDefault()
        setError('')

        try {
            const payload = {
                email,
                password,
            }
            await handleLogin(payload)
            navigate("/")
        } catch (err) {
            setError(err.message || 'Failed to login')
        }
    }

    if(!loading && user){
        return <Navigate to="/" replace />
    }


  const colors = {
    bgPrimary: '#1a1a1a',
    bgSecondary: '#242424',
    border: '#3a3a3a',
    textPrimary: '#f5f5f5',
    textSecondary: '#808080',
    accent: '#20b8cd',
    accentHover: '#1aa3b5'
  }

  const inputStyle = {
    backgroundColor: colors.bgSecondary,
    borderColor: colors.border,
    color: colors.textPrimary,
    transition: 'all 0.3s ease',
    outline: 'none'
  }

  return (
    <div style={{ backgroundColor: colors.bgPrimary }} className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-xs">
        {/* Header */}
        <div className="mb-10 text-center animate-fadeIn">
          <h2 style={{ color: colors.textPrimary }} className="text-xl font-light mb-1 transition-colors duration-300">
            Welcome back
          </h2>
          <p style={{ color: colors.textSecondary }} className="text-xs transition-colors duration-300">
            Enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitForm} className="space-y-4 animate-slideUp">
          {error && (
            <div style={{
              backgroundColor: 'rgba(220, 38, 38, 0.1)',
              borderColor: '#dc2626',
              color: '#ef4444'
            }} className="text-xs border px-3 py-2 rounded transition-all duration-300 animate-shake">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={handleChange}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              style={{
                ...inputStyle,
                borderColor: focusedInput === 'email' ? colors.accent : colors.border,
                backgroundColor: focusedInput === 'email' ? colors.bgSecondary : colors.bgSecondary,
                boxShadow: focusedInput === 'email' ? `0 0 0 2px ${colors.accent}20` : 'none'
              }}
              className="w-full px-3 py-2 rounded text-sm border hover:border-opacity-50 hover:shadow-sm transition-all duration-300"
              placeholder="Email"
            />
          </div>

          {/* Password Field */}
          <div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={handleChange}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              style={{
                ...inputStyle,
                borderColor: focusedInput === 'password' ? colors.accent : colors.border,
                backgroundColor: focusedInput === 'password' ? colors.bgSecondary : colors.bgSecondary,
                boxShadow: focusedInput === 'password' ? `0 0 0 2px ${colors.accent}20` : 'none'
              }}
              className="w-full px-3 py-2 rounded text-sm border hover:border-opacity-50 hover:shadow-sm transition-all duration-300"
              placeholder="Password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? colors.border : colors.accent,
              color: colors.bgPrimary,
              transition: 'all 0.3s ease',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = colors.accentHover
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = `0 4px 12px ${colors.accent}40`
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = colors.accent
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}
            className="w-full py-2 mt-6 text-xs font-medium rounded transition-all duration-300 hover:shadow-lg"
          >
            {loading ? (
              <span className="inline-flex items-center">
                <span className="animate-spin mr-2">⏳</span>
                Signing in...
              </span>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        {/* Footer */}
        <p style={{ color: colors.textSecondary }} className="text-center text-xs mt-6 transition-colors duration-300">
          Don't have an account?{' '}
          <a
            href="/register"
            style={{
              color: colors.accent,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = colors.accentHover
              e.target.style.textDecoration = 'underline'
            }}
            onMouseLeave={(e) => {
              e.target.style.color = colors.accent
              e.target.style.textDecoration = 'none'
            }}
            className="font-medium"
          >
            Create one
          </a>
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease;
        }

        .animate-shake {
          animation: shake 0.4s ease;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Login