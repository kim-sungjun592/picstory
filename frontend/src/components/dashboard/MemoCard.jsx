import React from 'react'
import MemoTag from './MemoTag'
const MemoCard = ({ memo }) => {
    return (
        <div>
            <p>{memo.category}</p>
            <h3>{memo.title}</h3>
            <p>{memo.content}</p>
            <div className="tags">
                {memo.tags.map((tag, i) => (
                    <MemoTag key={i}  tag={tag}/>
                ))}
            </div>
        </div>
    )
}

export default MemoCard