import React from 'react'
import Button from '../ui/Button'
const PostHeader = ({onCreate}) => {
  return (
    <header className='post-header'>
        <h2 className='post-title'>새 메모를 작성하세요</h2>
        <Button text="새 메모 작성" className="primary" icons/>
    </header>
  )
}

export default PostHeader