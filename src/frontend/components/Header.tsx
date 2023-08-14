import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsList } from "react-icons/bs";
import { useLoginContext } from "../LoginContext";
import { getLoginInfoFromJWT, removeJWT, storeJWT } from "../JWTManager";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { loginInfo, setLoginInfo } = useLoginContext();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  /**
   * logs the user in. if successful, the jwt will be saved in local storage and
   * the ip adress will be saved in loginInfo.
   * @param e React.FormEvent
   */
  const doLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ password: password }),
      });
      console.log(response);
      const result = await response.json();
      console.log(result);
      const jwt = result.jwtTokenString;

      if (jwt) {
        // store JWT in local storage
        storeJWT(jwt);
        // sync react state
        const loginInfo = getLoginInfoFromJWT(jwt);
        setLoginInfo(loginInfo);
        toggleForm();
      } else {
        setMessage("Login fehlgeschlagen");
      }
    } catch (err) {
      console.log(err);
      setMessage(String(err));
    }
    // finally {
    //   setPassword("");
    // }
  };

  const doLogout = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginInfo(null);
    removeJWT();
  };

  return (
    <>
      <BsList
        className="navigation__icon"
        size={24}
        onClick={toggleMenu}
      ></BsList>
      <nav
        className={`navigation ${isOpen ? "isOpen" : "isClosed"}`}
        id="navigation"
      >
        <ul className={`navigation__ul ${isOpen ? "open" : ""}`}>
          <li className="navigation__li rounded">
            <Link
              className="navigation__link"
              href="https://www.santegidio.org/"
            >
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
          {loginInfo && (
            <li className="navigation__li rounded">
              <Link href="/intern" className="navigation__link rounded">
                Intern
              </Link>
            </li>
          )}

          <li className="navigation__li rounded">
            {loginInfo ? (
              <div
                className="navigation__link rounded"
                onClick={(e) => doLogout(e)}
              >
                Logout
              </div>
            ) : (
              <div className="navigation__link rounded" onClick={toggleForm}>
                Login
              </div>
            )}
          </li>
        </ul>
      </nav>
      {isFormOpen && (
        <div className="login__overlay">
          <div className="login__container">
            <div className="centered-form">
              <h3 className="login__title">Login</h3>
              <p className="login__description">
                Melde dich an, um auf interne Informationen zugreifen zu können.
              </p>
              <form className="form" onSubmit={(e) => doLogin(e)}>
                <div className="form__layout">
                  <input
                    type="password"
                    placeholder="Password"
                    className="question__input margin"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="question__button accept">
                  Login
                </button>
                <button
                  type="button"
                  onClick={toggleForm}
                  className="question__button"
                >
                  Abbrechen
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
