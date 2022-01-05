import Head from 'next/head'
import { useUser } from '@auth0/nextjs-auth0';
import PostPreview from '../components/post-preview';
import {client} from '../content/contentful';
import { GetStaticProps } from 'next';
import { PrismaClient } from '@prisma/client';

export default function Home({ posts, users }) {

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
          <h2 className="text-3xl font-extrabold text-red-700 mb-6">From the Pizza Time Blog</h2>
          <div className="grid gap-6 lg:grid-cols-4">
            {posts.map((post) => (
              <PostPreview key={post.sys.id} post={post} />
            ))}
          </div>
        </section>
        <section className="mt-12">
          <h2 className="text-3xl font-extrabold text-red-700 mb-6">Users from the Database</h2>
          <div className="grid gap-6 lg:grid-cols-4">
            {users.map((user) => (
              <h1 key={user.id}><span className="font-mono">{user.id}</span> {user.name} <span className="text-red-600">{user.email}</span></h1>
            ))}
          </div>
          </section>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async() => {

  const res = await client.getEntries({
    content_type: 'post'
  })

  const prisma = new PrismaClient()
  const users = await prisma.user.findMany()

  return {
    props: {
      posts: res.items,
      users
    }
  }
}
