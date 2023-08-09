import { NewsResource } from "@/src/Resources"

interface Props {
  news: NewsResource;
}

const truncateText = (text: string): string => {
  const truncatedText = text.slice(0, 100);
  return truncatedText;
};

export default function NewsListItem({news}: Props) {
  const truncatedText = truncateText(news.text);

    return (
      <div className="item rounded">
        <h3 className="item__title">{news.title}</h3>
        <h4 className="item__subtitle">{news.subtitle}</h4>
        <p className="item__text">{truncatedText}...<br></br>
        <em>Geschrieben von {news.authorName} am {news.createdAt?.toDateString()}</em></p>        
      </div>
    )
  }
  