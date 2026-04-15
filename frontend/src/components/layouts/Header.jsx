import React, { useState, useEffect } from 'react'
import './Header.scss'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import { logout as logoutApi } from '@/api/auth.api'
import { useAuth } from '@/store/auth.store'
const Header = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const menus = [
    {
      name: '내 메모',
      link: '/app/posts/all'
    },
    {
      name: '내 프로필',
      link: '/app/profile'
    },
    {
      name: '설정',
      link: '/app/setting'
    }
  ]


  useEffect(() => {
    if (!menuOpen) return

    const onkey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', onkey)

    return () => window.removeEventListener('keydown', onkey)

  }, [menuOpen])


  const handleLogout = async () => {
    try {

      await logoutApi()
      logout()
      setMenuOpen(false)
      navigate("/")

    } catch (error) {
      alert(error.message || '로그아웃 오류')
    }
  }
  return (
    <header>
      <div className="inner">
        <h1>
          <Link to="/app">
            <img src="/images/logo.svg" alt="logo" />
          </Link>
        </h1>
        <div className={`right ${menuOpen ? 'is-nav-open' : ''} `}>
          <button
            type='button'
            className='header-menu-toggle'
            aria-expanded={menuOpen}
            aria-controls='header-nav'
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className='header-menu-toggle__label' >메뉴 열기</span>
            <span className='header-menu-toggle__bar' aria-hidden />
            <span className='header-menu-toggle__bar' aria-hidden />
            <span className='header-menu-toggle__bar' aria-hidden />

          </button>
          <div 
          className="header-nav-backdrop"
          aria-hidden
          onClick={()=>setMenuOpen(false)}
          />
          <nav id='header-nav' aria-label='주 메뉴'>

            <ul>
              {menus.map((menu, i) => (
                <li key={i}>
                  <Button
                    icons
                    className="sq"
                    onClick={() =>{ 
                      navigate(menu.link)
                      setMenuOpen(false)
                    }}
                    text={menu.name} />
                </li>
              ))}
            </ul>
          <Button
            text="로그아웃"
            // backico='wh' 
            onClick={handleLogout} />
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header