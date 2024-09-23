import Link from 'next/link'

import { articles } from './data'

export default function Articles() {
  return (
    <div className="flex h-full flex-col gap-y-5 p-4 lg:p-6">
      {articles.map((item) => (
        <div key={item.slug}>
          <Link href={`/articles/${item.slug}`}>{item.title}</Link>
        </div>
      ))}
    </div>
  )
}
