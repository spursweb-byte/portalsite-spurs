import { useState } from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from './firebase'
import { useAuth } from './AuthContext'

export default function LoginPage() {
  const { error, setError } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('ログインに失敗しました。もう一度お試しください。')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      {/* Animated background blobs */}
      <div className="login-blob login-blob-1" />
      <div className="login-blob login-blob-2" />
      <div className="login-blob login-blob-3" />

      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <img src={logo} alt="SPURS Logo" className="login-logo-img" />
        </div>

        <div className="login-divider" />

        <h1 className="login-title">ようこそ</h1>
        <p className="login-desc">
          このポータルは <strong>@spurs-inc.com</strong> のアカウントを<br />
          お持ちの方のみアクセス可能です。
        </p>

        {error && (
          <div className="login-error">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <button
          className="google-login-btn"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          {loading ? (
            <span className="login-spinner" />
          ) : (
            <svg width="20" height="20" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
              <path fill="#FFC107" d="M43.6 20.2H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.8z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.4 0 10.3-2 14-5.3l-6.5-5.5C29.7 34.9 27 36 24 36c-5.2 0-9.6-3.1-11.3-7.5L6.1 33.6C9.5 39.7 16.2 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.2H42V20H24v8h11.3c-.8 2.3-2.4 4.3-4.4 5.7l6.5 5.5C43 35.5 44 30 44 24c0-1.3-.1-2.6-.4-3.8z"/>
            </svg>
          )}
          {loading ? 'ログイン中...' : 'Googleアカウントでログイン'}
        </button>

        <p className="login-notice">
          🔒 社外からのアクセスは全て遮断されています
        </p>
      </div>
    </div>
  )
}
