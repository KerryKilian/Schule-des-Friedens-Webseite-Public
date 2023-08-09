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
      url = "http://www.serveradresse.de/api/news"
    } else {
      url = "http://localhost:3000/api/news"
    }
    const response = await fetch(url);
    const data: NewsResource[] = await response.json();
    console.log(data);

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
  
  
  
  