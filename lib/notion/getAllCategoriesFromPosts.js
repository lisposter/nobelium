export function getAllCategoriesFromPosts (posts) {
  const catedPosts = posts.filter(post => post?.category)
  const categories = [...catedPosts.map(p => p.category).flat()]
  const categoryObj = {}
  categories.forEach(cate => {
    if (cate in categoryObj) {
      categoryObj[cate]++
    } else {
      categoryObj[cate] = 1
    }
  })
  return categoryObj
}
