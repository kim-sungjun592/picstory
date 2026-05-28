import React, { useEffect, useState } from 'react';
import './Landing.scss';
import Button from '@/components/ui/Button';
import { NavLink } from 'react-router-dom';

const bgImages = [
  './images/landing-sl-1.png',
  './images/landing-sl-2.png',
  './images/landing-sl-3.png',
];

const Landing = () => {
  const [bubbles, setBubbles] = useState([]);

  // 🌌 화면 진입 시 몽환적인 우주 배경 방울 20개 랜덤 생성
  useEffect(() => {
    const generatedBubbles = Array.from({ length: 20 }).map((_, index) => {
      const size = Math.random() * 60 + 50; // 50px ~ 110px 사이 크기
      return {
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${size}px`,
        delay: `${Math.random() * 6}s`,        // 애니메이션 시작 지연 랜덤
        duration: `${Math.random() * 12 + 10}s`, // 둥실둥실 움직이는 속도 랜덤
        img: bgImages[index % bgImages.length],  // 기존 프로젝트의 슬라이드 이미지 활용!
      };
    });
    setBubbles(generatedBubbles);
  }, []);

  return (
    <section className='landing'>
      {/* 1. 화려한 네온 우주 배경 & 비눗방울 궤도 스페이스 */}
      <div className="landing-bg">
        <div className="neon-circle purple"></div>
        <div className="neon-circle blue"></div>
        
        {/* 🫧 기존 필름 스타일 트랙을 걷어내고 동적 비눗방울 스페이스 주입 */}
        <div className="bubble-space">
          {bubbles.map((bubble) => (
            <div
              key={bubble.id}
              className="floating-bubble"
              style={{
                left: bubble.left,
                top: bubble.top,
                width: bubble.size,
                height: bubble.size,
                animationDelay: bubble.delay,
                animationDuration: bubble.duration,
              }}
            >
              {/* 비눗방울 표면 입체 하이라이트 */}
              <div className="bubble-shimmer"></div>
              {/* 내부 사진 콘텐츠 */}
              <div className="bubble-content">
                <img src={bubble.img} alt="bg-film-bubble" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. 중앙 메인 콘텐츠 (기존 글래스모피즘 카드 유지) */}
      <div className="inner glass-card">
        <div className="t-wrap">
          {/* 상단 일러스트 / 앱 목업 */}
          <div className="mockup-container">
            <img src="/images/landing-img.png" alt="app mockup" className="main-ill" />
          </div>
          
          {/* 타이틀(로고) 및 서브 텍스트 */}
          <div className="text-container">
            <h2>
              <img src="/images/logo.svg" alt="PicStory logo" />
            </h2>
            <p>사진 한장. 한줄 메모. 검색. 공유까지 - Picstory</p>
          </div>
        </div>

        <NavLink to="/login" className="btn-link">
          <Button text='시작하기' className='intro neon-btn' icons={true} />
        </NavLink>
      </div>

      {/* 3. 데코레이션 이미지 */}
      <div className="deco-elements">
        <img src="/images/camera-asset.png" alt="" className="camera-img" />
      </div>
    </section>
  );
}

export default Landing;