import { NewsResource } from "@/src/Resources";
import NewsListItem from "@/src/frontend/components/NewsListItem";
import { GetServerSideProps, NextPage } from "next";

const NewsPage: NextPage<{ newsList: NewsResource[] }> = ({ newsList }) => {
  return (
    <>
      <h1>Aktuelles bei der Schule des Friedens</h1>
      <div className="itemlist">
        {newsList.map((element) => (
          <NewsListItem news={element} key={element.title}></NewsListItem>
        ))}
      </div>
    </>
  );
};

export default NewsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    let url: string;
    if (process.env.PRODUCTION === "TRUE") {
      url = process.env.NEXT_PUBLIC_PRODUCTION_ADDRESS!;
    } else {
      url = "http://localhost:3000/api/news";
    }
    const response = await fetch(url);
    const data: NewsResource[] = await response.json();
    console.log(data[0].createdAt);
    // Convert Firestore Timestamps to JavaScript Date objects
    // const newsList = data.map((news: { createdAt: { toDate: () => any; }; }) => ({
    //   ...news,
    //   createdAt: news.createdAt ? news.createdAt.toDate() : null,
    // }));

    return {
      props: { newsList: data }, // Use "newsList" as the key
    };
  } catch (error) {
    console.error(error);
    return {
      props: { newsList: [] },
    };
  }
};
