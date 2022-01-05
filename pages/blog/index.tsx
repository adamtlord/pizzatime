import Head from 'next/head'
import PostPreview from '../../components/post-preview';
import { client } from '../../content/contentful';
import { GetStaticProps } from 'next';

export default function Home({ posts }) {

  return (
    <div>
      <Head>
        <title>Pizza Time Blog</title>
      </Head>

      <main>
        <h1 className="text-4xl font-extrabold text-red-700">
          Our Latest Pizza Blog Posts
        </h1>
        <section className="mt-12">
          <div className="grid grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostPreview key={post.sys.id} post={post} showPreview />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const res = await client.getEntries({
    content_type: 'post'
  })

  return {
    props: {
      posts: res.items
    }
  }
}
