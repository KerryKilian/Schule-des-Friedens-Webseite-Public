import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { NewsResource } from "@/src/Resources";

type NewsDetailProps = {
  news: NewsResource;
};

const ItemDetailPage = ({ news }: NewsDetailProps) => {
  return (
    <div>
      <h1>{news.title}</h1>
      <p className="">
        <em>
          Geschrieben von {news.authorName} am {news.createdAt?.toDateString()}
        </em>
        <br></br>
        {news.text}
      </p>
    </div>
  );
};

export default ItemDetailPage;

export const getServerSideProps: GetServerSideProps<
  NewsDetailProps | {}
> = async (context) => {
  const { newsId } = context.query;

  try {
    let url: string;
    if (process.env.PRODUCTION === "TRUE") {
      url = `http://www.serveradresse.de/api/news/${newsId}`;
    } else {
      url = `http://localhost:3000/api/news/${newsId}`;
    }
    const response = await fetch(url);
    const data: NewsResource = await response.json();

    return {
      props: { news: data }, // Use "newsList" as the key
    };
  } catch (error) {
    console.error(error);
    return {
      props: { news: {} },
    };
  }
};