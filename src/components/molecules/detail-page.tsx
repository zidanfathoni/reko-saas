import Image from "next/image"
import { Badge } from "../atoms";



interface DetailPageProps {
  title?: string;
  author?: string;
  date?: string;
  coverImage?: string;
  content?: string;
  tags?: string[];
  stacks?: string[];

}

const DetailPage: React.FC<DetailPageProps> = ({
  title,
  author,
  date,
  coverImage,
  content,
  tags,
  stacks
}) => {
  const dateNow = new Date();


  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">title</h1>
        <div className="text-gray-600 mb-4">
          By Zidanfath | {date ? new Date(date).toLocaleDateString() : new Date(dateNow).toLocaleDateString()}
        </div>
        <Image
          src={"/placeholder.svg"}
          alt={`Cover image for Zidanfath`}
          width={800}
          height={400}
          className="rounded-lg shadow-md mb-4"
        />
        <div className="flex flex-wrap gap-2 mb-4">
          {tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </header>
      <div className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: content ?? <div></div> }} />
      <footer>
        <h2 className="text-2xl font-semibold mb-2">Technologies Discussed</h2>
        <div className="flex flex-wrap gap-2">
          {stacks?.map((stack) => (
            <Badge key={stack} variant="outline">
              {stack}
            </Badge>
          ))}
        </div>
      </footer>
    </article>
  )
}

export default DetailPage;