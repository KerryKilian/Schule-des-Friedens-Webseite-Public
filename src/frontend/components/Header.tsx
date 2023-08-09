import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsList } from "react-icons/bs";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
    <BsList className="navigation__icon" size={24} onClick={toggleMenu}></BsList>
      <nav className={`navigation ${isOpen ? "isOpen" : "isClosed"}`} id="navigation">
        <ul className={`navigation__ul ${isOpen ? 'open' : ''}`}>
          <li className="navigation__li rounded">
            <Link className="navigation__link" href="https://www.santegidio.org/">
              <Image
                src={`/images/santegidio.jpg`}
                alt="Logo"
                width={1000}
                height={600}
                className="navigation__image rounded"
              />
            </Link>
          </li>
          <li className="navigation__li rounded">
            <Link href="/" className="navigation__link rounded">
              Über uns
            </Link>
          </li>
          <li className="navigation__li rounded">
            <Link href="/kinder" className="navigation__link rounded">
            Kinder
            </Link>
          </li>
          <li className="navigation__li rounded">
            <Link href="/jugendliche" className="navigation__link rounded">
            Jugendliche
            </Link>
          </li>
          <li className="navigation__li rounded">
            <Link href="/aktuelles" className="navigation__link rounded">
            Aktuelles
            </Link>
          </li>
          <li className="navigation__li rounded">
            <Link href="/kontakt" className="navigation__link rounded">
            Kontakt
            </Link>
          </li>
          <li className="navigation__li rounded">
            <Link href="/intern" className="navigation__link rounded">
            Intern
            </Link>
          </li>
        </ul>
        
      </nav>
      
    </>
  );
}
