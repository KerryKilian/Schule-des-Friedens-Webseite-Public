import { GetServerSideProps } from "next";
import { NewsResource } from "@/src/Resources";
import { formatDate } from "@/src/utils/utils";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import { Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

type NewsDetailProps = {
  news: NewsResource;
};

const ItemDetailPage = ({ news }: NewsDetailProps) => {
  console.log(news.images)

  const settings = {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      clickable: true,
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: true,
    },
    breakpoints: {
      600: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1800: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      2000: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
    },
    modules: [Pagination, Autoplay],
    className: "news__slidercontainer",
  };
  return (
    <div className="news">
      <h1 className="news__title">{news.title}</h1>
      <div className="news__slider">
      <Swiper {...settings}>
        {
          news.images.map((image) => {
            return (
             <SwiperSlide key={image} className="news__slide">
                <Image src={image} alt={`Picture of ${image}`} layout="fill" className="news__slideimage rounded">
                </Image>
              </SwiperSlide> 
            )
          })
        }
      </Swiper>
    </div>
      <p className="news__namedate">Geschrieben von {news.authorName} am {formatDate(news.createdAt)}</p>
      <p className="news__text">
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
      url = `${process.env.NEXT_PUBLIC_PRODUCTION_ADDRESS}/api/news/${newsId}`;
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
