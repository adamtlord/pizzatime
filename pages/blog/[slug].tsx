import { createClient } from "contentful"
import Image from 'next/image'
import Link from "next/link";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";

export default function Post({ post }) {
  const { body, image, title } = post.fields;
  const dateDisplay = new Date(post.sys.createdAt)
  return (
    <article className="prose mx-auto">
      <Image src={`https:${image.fields.file.url}`} width={image.fields.file.details.image.width} height={image.fields.file.details.image.height} alt={image.fields.file.title} />
      <h2 className="text-5xl font-extrabold text-red-700">{title}</h2>
      <p className="text-sm text-gray-500">{dateDisplay.toDateString()}</p>
      {documentToReactComponents(body)}
      <div className="border-t mt-8 pt-8">
        <Link href="/">
          <a className="flex items-center text-red-700 no-underline">
            <ArrowNarrowLeftIcon className="h-5 w-5 mr-2" />
            Back
          </a>
        </Link>
      </div>
    </article>
  )
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: 'post',
    'fields.slug': params.slug
  })
  return {
    props: {
      post: items[0]
    }
  }
}

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: 'post' })
  const paths = res.items.map(post => {
    return {
      params: {
        slug: post.fields['slug']
      }
    }
  })
  return {
    paths,
    fallback: false
  }
}
