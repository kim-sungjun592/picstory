import React from 'react'
import PostTag from './PostTag'
import './PostComponentAll.scss'
const TagFilterBar = ({ tags, selectedTag, onChangeTag }) => {
  return (
    <div className='tags'>
      <span>#tag:</span>
      {tags.map((tag, i) => (

        <PostTag
          key={`${tag}-${i}`}
          tag={tag}
          onClick={() => onChangeTag(tag)}
          showDelete={false}
        />
      ))}
    </div>
  )
}

export default TagFilterBar