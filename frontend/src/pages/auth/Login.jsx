import React ,{useState}from 'react'
import Button from '../../components/ui/Button'
import './Login.scss'
import Input from '@/components/ui/Input'
import { Link,useNavigate } from 'react-router-dom'
const Login = () => {

  const navigate = useNavigate()
  const [form, setForm]=useState({
    email:'',
    password:''
  })

  const [error, setError]=useState('')
  const [isLoading, setIsLoading]=useState(false)

  const handleBack =()=>{
    navigate(-1)
  }

  return (
    <section className='login'>
      <div className="inner">
        <div className="login-box">

          <nav>
            <h2>로그인</h2>
            <Button text="뒤로가기" 
            className="back"
            icons
            onClick={handleBack} />
          </nav>
          <form className='login-form'>
            <div className="form-group">

              <Input
                type="email"
                placeholder="이메일을 입력하세요"
              />
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <div className="login-btn-wrap">
              <Button text="로그인" type="submit" className="primary" />
            </div>
          </form>

          <div className="signup-now">
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