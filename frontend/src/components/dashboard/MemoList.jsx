import React from 'react'
import MemoCard from './MemoCard'
const MemoList = ({memos}) => {
  return (
    <div>
        {memos.map((memo)=>(
            <MemoCard key={memo.id} memo={memo}/>
        ))}
    </div>
  )
}

export default MemoList