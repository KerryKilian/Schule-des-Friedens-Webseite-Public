import Image from "next/image";
import {useState, useEffect, useRef} from 'react';
import "animate.css/animate.min.css";
import { AnimationOnScroll } from "react-animation-on-scroll";

interface Props {
  text: string;
  filename: string;
  title: string;
}

export default function Description({text, filename, title}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

    return (
      <div className="description">
        
        <div className="description__layout">
            <AnimationOnScroll className="description__textcontainer" animateIn="animate__fadeInUp" animateOnce={true}>
                <h2 className="description__title">{title}</h2>
                <p className="description__text">{text}</p>
            </AnimationOnScroll>
            <AnimationOnScroll className="description__figure" animateIn="animate__fadeInUp" animateOnce={true}>
            <figure className="">
                <Image src={`/images/${filename}`} alt="Description Image" width={1000} height={600} className='description__image rounded'/>   
                {/* <figcaption>Description</figcaption>     */}
            </figure>
            </AnimationOnScroll>
        </div>
      </div>
    )
  }
  