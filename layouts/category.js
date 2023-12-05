import { useState } from 'react'
import BlogPost from '@/components/BlogPost'
import Container from '@/components/Container'
import PropTypes from 'prop-types'

const CategoryLayout = ({ posts, currentCategory }) => {
  return (
    <Container>
      {/* <h1>{currentCategory}</h1> */}
      <div className="article-container my-8">
        {posts?.slice(0, 20).map(post => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </Container>
  )
}
CategoryLayout.propTypes = {
  posts: PropTypes.array.isRequired,
  currentCategory: PropTypes.string
}
export default CategoryLayout
