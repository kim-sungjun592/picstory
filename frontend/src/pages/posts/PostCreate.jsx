import React, { useEffect, useRef, useState } from 'react'
import './PostCreateEdit.scss'
import './PostPagesAll.scss'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { CATEGORY_OPTIONS } from '@/constants/category'
import PostTag from '@/components/posts/PostTag'
const PostCreate = () => {
  return (
    <section className='page post-section post-create'>
      <div className="inner">
        <form action="" className='post-form'>
          <div className="post-card">
            <div className="post-field">
              <label className='post-label'>카테고리</label>
              <div className="post-input-wrap">
                <select >
                  {CATEGORY_OPTIONS.map((opt) => (

                    <option value={opt.value} key={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Input
              label="제목"
              name="title"
              placeholder="제목을 입력하세요"
            />
            <div className="post-tag-box">

              <div className="tags">
                <PostTag tag="tag1" />
                <PostTag tag="tag1" />
                <PostTag tag="tag1" />
                <PostTag tag="tag1" />
                <PostTag tag="tag1" />
                <PostTag tag="tag1" />
                <PostTag tag="tag1" />
                <PostTag tag="tag1" />
                <input type="text" className='post-tag-input' placeholder='tag를 자유롭게 입력하세요' />
                <Button type="button" text="+ 태그 추가" className="post-tag-add" />
              </div>
            </div>
            <div className="post-field">
              <label className='post-label'>내용</label>
              <div className="post-input-wrap">
                <textarea className='post-textarea' placeholder='내용을 자유롭게 입력하세요' />
              </div>
            </div>
            <div className="post-upload-card">
              <div className="post-upload-placeholder">

              <input type="file" accept='image/*' className='post-uppload-input' />
              <img src="" alt="img" />
              <p className='post-upload-title'>이미지를 업로드 하세요</p>
              <span className="post-upload-desc">
                클릭하거나 파일을 드래그 하여 업로드
              </span>
              </div>
            </div>

            <div className="post-actions">
              <Button
                type="button"
                text="취소하기"
                className="cancel"
              />
              <Button
                type="submit"
                text="저장하기"
                className="save"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default PostCreate