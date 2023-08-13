import { NewsResource } from "@/src/Resources";
import { formatDate, truncateText } from "@/src/utils/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  news: NewsResource;
}



export default function NewsListItem({ news }: Props) {
  const truncatedText = truncateText(news.text);


  return (
    <Link href={`/news/${news.id}`}>
      <div className="item rounded">
        <div className="item__textcontainer">
          <h3 className="item__title">{news.title}</h3>
          <h4 className="item__subtitle">{news.subtitle}</h4>
          <p className="item__text">
            {truncatedText}...<br></br>
            <em>
              Geschrieben von {news.authorName} am{" "}
              {formatDate(news.createdAt!)}
            </em>
          </p>
        </div>
        <div className="item__image">
          {news.images[0] && (
            <Image
              src={news.images[0]}
              alt="Bild"
              width={800}
              height={800}
              className="rounded"
            />
          )}
        </div>
      </div>
    </Link>
  );
}
