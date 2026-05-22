import React, { useState } from 'react'
import Button from '@/components/ui/Button'
import './Auth.scss'
import Input from '@/components/ui/Input'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { login as loginApi } from '@/api/auth.api'
import { useAuth } from '@/store/auth.store'

const Login = () => {
  const navigate = useNavigate()
  const { login, isReady, isAuthed } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // 카카오 설정 정보 (환경변수나 별도 config 파일로 관리하는 것을 추천합니다)
  const KAKAO_REST_API_KEY = "YOUR_KAKAO_REST_API_KEY" // 카카오 디벨로퍼스에서 발급받은 REST API 키
  const KAKAO_REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao" // 카카오 디벨로퍼스에 등록한 Redirect URI
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`

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
      setError('이메일을 입력해주세요')
      return
    }
    if (!form.password.trim()) {
      setError('비밀번호를 입력해주세요')
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
      setError(error.message || '로그인을 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  // 카카오 로그인 링크로 이동
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL
  }

  const handleBack = () => {
    navigate(-1)
  }

  if (isReady && isAuthed) {
    return <Navigate to="/app" replace />
  }

  return (
    <section className='auth'>
      <div className="inner">
        <div className="auth-box">
          <nav>
            <h2>로그인</h2>
            <Button
              text="뒤로가기"
              backico='wh'
              className="back"
              onClick={handleBack} />
          </nav>
          <form className='auth-form' onSubmit={handleSumit}>
            <div className="form-group">
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요"
              />
              <Input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <div className="auth-btn-wrap">
              <Button text="로그인" type="submit" className="primary" />
              {/* 카카오 로그인 버튼 추가 */}
              <Button 
                text="카카오 로그인" 
                type="button" 
                className="kakao-btn" 
                onClick={handleKakaoLogin} 
              />
            </div>
          </form>
          {error && <p className='error-text'> {error}</p>}
          <div className="auth-now">
            <span>계정이 없으신가요?</span>
            <Link to="/signup">
              <Button text="회원가입하기" icons />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login