import { createHash } from 'crypto'
import { clientConfig } from '@/lib/server/config'

import Container from '@/components/Container'
import Hero from '@/components/Hero'
import BlogPost from '@/components/BlogPost'
import Pagination from '@/components/Pagination'
import { getAllPosts, getPostBlocks } from '@/lib/notion'
import { useConfig } from '@/lib/config'

export async function getStaticProps () {
  const posts = await getAllPosts({ includePages: false })

  const all = await getAllPosts({ includePages: true });
  const hero = all.find(post => post.slug === 'hero');

  let blockMap = null;
  try {
    blockMap = await getPostBlocks(hero.id);
  } catch (err) {
    console.error(err);
  }

  const emailHash = createHash('md5')
    .update(clientConfig.email)
    .digest('hex')
    .trim()
    .toLowerCase()

  const postsToShow = posts.slice(0, clientConfig.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > clientConfig.postsPerPage
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext,
      blockMap,
      emailHash
    },
    revalidate: 1
  }
}

export default function Blog ({ postsToShow, page, showNext, blockMap, emailHash }) {
  const { title, description } = useConfig()

  return (
    <Container title={title} description={description}>
      <Hero blockMap={blockMap} emailHash={emailHash} />
      {postsToShow.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
    </Container>
  )
}
