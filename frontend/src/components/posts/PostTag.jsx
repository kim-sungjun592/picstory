import React from 'react'

const PostTag = ({ tag ,onClick}) => {
  return (
    <span className='post-tag'>
      <span>

        {tag}
      </span>
      <button 
      className='post-tag-delete' 
      onClick={(e)=>{
        e.preventDefault()
        e.stopPropagation()
        onClick?.()
        }}>X</button>
    </span>
  )
}

export default PostTag