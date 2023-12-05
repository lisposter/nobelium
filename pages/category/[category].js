import { getAllPosts, getAllCategoriesFromPosts } from '@/lib/notion'
import CategoryLayout from '@/layouts/category'

export default function Tag ({ categories, posts, currentCategory }) {
  return <CategoryLayout categories={categories} posts={posts} currentCategory={currentCategory} />
}

export async function getStaticProps ({ params }) {
  const currentCategory = params.category
  const posts = await getAllPosts({ includePages: false })
  const categories = getAllCategoriesFromPosts(posts)
  const filteredPosts = posts.filter(
    post => post && post.category && post.category.map(cat => cat.toLowerCase()).includes(currentCategory.toLowerCase())
  )
  return {
    props: {
      categories,
      posts: filteredPosts || [],
      currentCategory
    },
    revalidate: 1
  }
}

export async function getStaticPaths () {
  const posts = await getAllPosts({ includePages: false })
  const tags = getAllCategoriesFromPosts(posts)
  return {
    paths: Object.keys(tags).map(category => ({ params: { category } })),
    fallback: true
  }
}
