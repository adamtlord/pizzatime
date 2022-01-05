import Image from 'next/image';
import Link from 'next/link';
import { ArrowNarrowRightIcon } from '@heroicons/react/solid';

export interface PostPreviewProps {
  post: any,
  key: any,
  showPreview?: boolean
}

function PostPreview({ post, showPreview }: PostPreviewProps) {
  const { title, slug, preview, image } = post.fields;
  const dateDisplay = new Date(post.sys.createdAt)

  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="flex-shrink-0">
        <div className="h-48 w-full object-cover overflow-hidden">
          <Link href={`/blog/${slug}`} passHref>
            <a>
              <Image src={`https:${image.fields.file.url}`} alt={image.fields.title} width={image.fields.file.details.image.width} height={image.fields.file.details.image.height} />
            </a>
          </Link>
        </div>
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="text-sm text-gray-500">
          <time dateTime={post.sys.createdAt}>{dateDisplay.toDateString()}</time>
        </div>
        <div className="flex-1">
          <a href={post.href} className="block mt-2">
            <p className="text-xl font-semibold text-gray-900">{title}</p>
            {showPreview ? (<p className="mt-3 text-base text-gray-500">{
              preview ? (preview) : (<span className="italic">No preview text available</span>)
            }</p>) : ''}
          </a>
        </div>
        <Link href={`/blog/${slug}`} passHref>
          <a className='text-red-700 mt-6 font-bold flex items-center justify-end hover:text-red-500'>Read all about it <ArrowNarrowRightIcon className="h-5 w-5 ml-2" /></a>
        </Link>
      </div>
    </div>
  )
}

PostPreview.defaultProps = {
  showPreview: false
}

export default PostPreview;