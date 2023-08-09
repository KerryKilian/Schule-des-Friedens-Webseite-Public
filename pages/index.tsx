import { homePageData } from '@/src/Data'
import BackgroundImage from '@/src/frontend/components/BackgroundImage'
import Description from '@/src/frontend/components/Description'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <BackgroundImage/>
      <h1 className='h1 maintitle'>Ehrenamtliche Arbeit in der Schule des Friedens</h1>
      {homePageData.map((element) => (
        <Description text={element.text} filename={element.source} title={element.title} key={element.source}/>
      ))}
    </>
  )
}
