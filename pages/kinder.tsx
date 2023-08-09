import { childrenPageData, homePageData } from '@/src/Data'
import BackgroundImage from '@/src/frontend/components/BackgroundImage'
import Description from '@/src/frontend/components/Description'
import Image from 'next/image'

export default function Children() {
  return (
    <>
      <BackgroundImage/>
      <h1 className='h1 maintitle'>Ehrenamtliche Arbeit mit Kindern</h1>
      {childrenPageData.map((element) => (
        <Description text={element.text} filename={element.source} title={element.title} key={element.source}/>
      ))}
    </>
  )
}
