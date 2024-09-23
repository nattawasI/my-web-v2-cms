import { articles } from '../data'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  return articles.map((item) => ({
    slug: item.slug,
  }))
}

export default function ArticleDetail({ params }: Props) {
  const article = articles.find((item) => item.slug === params.slug)
  return (
    <div className="flex h-full flex-col gap-y-5 p-4 lg:p-6">
      <h1>{article?.title}</h1>
      <p>{article?.content}</p>
    </div>
  )
}
