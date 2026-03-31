import React from 'react'
import './PostCreateEdit.scss'
import './PostPagesAll.scss'
const PostCreate = () => {
  return (
    <section className='page post-section post-create'>
      <div className="inner">
        <form action="">
          <div className="post-card">
            <div className="post-field">
              <label className='post-label'>카테고리</label>
              <div className="post-input-wrap">
                <select >
                  <option value=""></option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default PostCreate