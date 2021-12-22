import Head from 'next/head'
import { useUser } from '@auth0/nextjs-auth0';
import { createClient } from 'contentful';
import PostPreview from '../components/post-preview';

export default function Home({ posts }) {

  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <Head>
        <title>Pizza Time</title>
        <meta name="description" content="Pizza (Italian: [pittsa], Neapolitan: [pittsə]) is a dish of Italian origin consisting of a usually round, flat base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients (such as anchovies, mushrooms, onions, olives, pineapple, meat, etc.), which is then baked at a high temperature, traditionally in a wood-fired oven.[1] A small pizza is sometimes called a pizzetta. A person who makes pizza is known as a pizzaiolo." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-4xl font-extrabold text-red-700">
          {user ? `Welcome, ${user.name}!` : 'Welcome to Pizza Time!'}
        </h1>
        <section className="mt-12">
          <h2 className="text-3xl font-extrabold text-red-700 mb-6">From the Pizza Blog</h2>
          <div className="grid gap-6 lg:grid-cols-4">
            {posts.map((post) => (
              <PostPreview key={post.sys.id} post={post} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })

  const res = await client.getEntries({
    content_type: 'post'
  })

  return {
    props: {
      posts: res.items
    }
  }
}
