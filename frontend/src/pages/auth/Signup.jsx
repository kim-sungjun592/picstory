import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import './Auth.scss' // 로그인 페이지와 동일한 스타일 공유
import { signup } from '@/api/auth.api'

const Signup = () => {
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!form.name.trim()) return '이름을 입력해주세요.'
    if (!form.email.trim()) return '이메일을 입력해주세요.'
    if (!form.password.trim()) return '비밀번호를 입력해주세요.'
    if (form.password.length < 6) return '비밀번호는 6자 이상이어야 합니다.'
    if (!form.passwordConfirm.trim()) return '비밀번호 확인을 입력해주세요.'
    if (form.password !== form.passwordConfirm) return '비밀번호가 일치하지 않습니다.'
    if (!form.phone.trim()) return '전화번호를 입력해주세요.'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationMessage = validateForm()

    if (validationMessage) {
      setError(validationMessage)
      return
    }

    setError('')
    setIsLoading(true)
    
    try {
      await signup(form)
      alert('회원가입이 완료되었습니다! 🎉')
      navigate('/login')
    } catch (error) {
      setError(error.message || '회원가입 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    navigate(-1)
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

        {/* 안내 문구 */}
        <div className="auth-header">
          <h2>계정 만들기 🚀</h2>
          <p>간단한 정보만 입력하고 PicStory를 시작해보세요.</p>
        </div>

        {/* 회원가입 폼 */}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <Input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="이름"
            />
            <Input
              type="email"
              name="email"
              onChange={handleChange}
              value={form.email}
              placeholder="이메일 (example@gmail.com)"
            />
            <Input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="비밀번호 (6자 이상)"
            />
            <Input
              name="passwordConfirm"
              onChange={handleChange}
              value={form.passwordConfirm}
              type="password"
              placeholder="비밀번호 확인"
            />
            <Input
              name="phone"
              onChange={handleChange}
              value={form.phone}
              type="text"
              placeholder="전화번호 (예: 010-1234-5678)"
            />
          </div>
          
          {error && <p className="error-text">{error}</p>}
          
          <Button 
            text={isLoading ? "가입 처리 중..." : "회원가입 완료하기"} 
            type="submit" 
            className="primary-btn" 
            disabled={isLoading}
          />
        </form>

        {/* 하단 로그인 이동 링크 */}
        <div className="auth-footer">
          <span>이미 계정이 있으신가요?</span>
          <Link to="/login" className="signup-link">로그인하기</Link>
        </div>
        
      </div>
    </section>
  )
}

export default Signup