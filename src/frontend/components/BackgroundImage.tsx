import Image from "next/image";

export default function BackgroundImage() {
    return <Image src="/images/background-main.jpeg" alt="Image with many children" width={3000} height={1200} className='backgroundimage'/>;
}