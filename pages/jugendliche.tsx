import { childrenPageData, youthPageData } from "@/src/Data";
import BackgroundImage from "@/src/frontend/components/BackgroundImage";
import Description from "@/src/frontend/components/Description";
import Image from "next/image";

export default function Youth() {
    return (
      <>
        <BackgroundImage/>
        <h1 className='h1 maintitle'>Ehrenamtliche Arbeit mit Jugendlichen</h1>
        {youthPageData.map((element) => (
          <Description text={element.text} filename={element.source} title={element.title} key={element.source}/>
        ))}
      </>
    )
  }
  