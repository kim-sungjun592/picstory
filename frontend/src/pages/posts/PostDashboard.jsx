import PostHeader from '@/components/posts/PostHeader'
import PostList from '@/components/posts/PostList'
import TagFilterBar from '@/components/posts/TagFilterBar'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useState } from 'react'
import './PostPagesAll.scss'
const PostDashboard = () => {

    const [selectedTag, setSelectedTag] = useState('전체')
    const [searchKeyword, setSearchKeyword] = useState('')
    const tags = ['태그1', '태그2', '태그3']

    const posts = [
        {
            id: 1,
            category: 'CASE STUDY',
            title: 'Korba',
            content:
                '사용자 맞춤형 웹 경험을 설계하고 구현한 프로젝트입니다. 반응형 UI와 직관적인 흐름에 집중했습니다.',
            tags: ['태그1', '태그2'],
            thumbnail: '/images/sample1.jpg',
        },
        {
            id: 2,
            category: 'CASE STUDY',
            title: 'Picnote',
            content:
                '이미지와 메모를 함께 관리할 수 있는 서비스 예시입니다. 태그 분류와 목록 구성을 중심으로 제작했습니다.',
            tags: ['태그2'],
            thumbnail: '/images/sample2.jpg',
        },
        {
            id: 3,
            category: 'CASE STUDY',
            title: 'Memo Archive',
            content:
                '저장된 메모를 한곳에서 모아보고 관리할 수 있는 아카이브 페이지입니다. 검색과 필터 확장을 고려했습니다.',
            tags: ['태그3'],
            thumbnail: '/images/sample3.jpg',
        },
    ]

    const filteredByTag =
        selectedTag === '전체'
            ? posts
            : posts.filter((post) =>
                post.tags.includes(selectedTag)
            )


    const filteredPosts = filteredByTag.filter((post) => {
        const keyword = searchKeyword.toLowerCase().trim()

        if (!keyword) return true


        return (
            post.title.toLowerCase().includes(keyword) ||
            post.content.toLowerCase().includes(keyword)
        )
    })
    const handleCreatePost = () => {
        console.log('새 메모 작성')
    }
    return (
        <section className='page post-section'>
            <div className="inner">
                <PostHeader onCreate={handleCreatePost} />
                <div className="input-post">
                    <Input
                    placeholder="게시글 제목 또는 내용을 검색하세요"
                    value={searchKeyword}
                    onChange={(e)=>setSearchKeyword(e.target.value)}
                    />
                </div>
                <div className="tags-wrapper">

                    <TagFilterBar
                        tags={tags}
                        selectedTag={selectedTag}
                        onChangeTag={setSelectedTag}
                    />
                    <Button text="전체 게시글 보기" className="wh" />
                </div>
                <PostList posts={filteredPosts} />
            </div>
        </section>
    )
}

export default PostDashboard