import React, { useState } from 'react'
import Button from '@/components/ui/Button'
import './Auth.scss' // 아래에 제공된 SCSS 코드를 여기에 덮어씌워주세요.
import Input from '@/components/ui/Input'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { login as loginApi } from '@/api/auth.api'
import { useAuth } from '@/store/auth.store'
const KAKAO_LOGIN_URL = import.meta.env.VITE_KAKAO_LOGIN_URL || 'http://localhost:8080/api/auth/kakao'

const Login = () => {
  const navigate = useNavigate()
  const { login, isReady, isAuthed } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSumit = async (e) => {
    e.preventDefault()
    if (!form.email.trim()) {
      setError('이메일을 입력해주세요.')
      return
    }
    if (!form.password.trim()) {
      setError('비밀번호를 입력해주세요.')
      return
    }

    try {
      setIsLoading(true)
      setError('')
      const data = await loginApi({
        email: form.email.trim(),
        password: form.password
      })

      login(data)
      navigate('/app')
    } catch (error) {
      setError(error.message || '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_LOGIN_URL
  }

  const handleBack = () => {
    navigate(-1)
  }

  if (isReady && isAuthed) {
    return <Navigate to="/app" replace />
  }

  return (
    <section className="auth-wrapper">
      <div className="auth-card">
        {/* 헤더 및 뒤로가기 */}
        <nav className="auth-nav">
          <button className="back-btn" onClick={handleBack} aria-label="뒤로가기">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
        </nav>

        {/* 환영 인사 */}
        <div className="auth-header">
          <h2>환영합니다 👋</h2>
          <p> 로그인하고 이야기를 시작해보세요.</p>
        </div>

        {/* 로그인 폼 */}
        <form className="auth-form" onSubmit={handleSumit}>
          <div className="form-group">
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="이메일 (example@gmail.com)"
            />
            <Input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="비밀번호"
            />
          </div>
          
          {error && <p className="error-text">{error}</p>}
          
          <Button 
            text={isLoading ? "로그인 중..." : "이메일로 로그인"} 
            type="submit" 
            className="primary-btn" 
            disabled={isLoading}
          />
        </form>

        {/* 소셜 로그인 구분선 */}
        <div className="divider">
          <span>또는</span>
        </div>

        {/* 소셜 로그인 버튼들 */}
        <div className="social-group">
          <button type="button" className="kakao-btn" onClick={handleKakaoLogin}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg" alt="kakao" className="kakao-icon" />
            카카오로 3초 만에 시작하기
          </button>
        </div>

        {/* 하단 회원가입 링크 */}
        <div className="auth-footer">
          <span>아직 계정이 없으신가요?</span>
          <Link to="/signup" className="signup-link">회원가입</Link>
        </div>
      </div>
    </section>
  )
}

export default Login