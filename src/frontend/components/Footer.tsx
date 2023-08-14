import Link from "next/link";

export default function Footer() {
  return (
    <div className="footer">
      <h3 className="footer__title">Interesse? Dann melde dich jetzt</h3>
      <p>
        <Link href="/kontakt" className="footer__site">
          Kontakt
        </Link>
      </p>
      <p>
        <Link href="/impressum" className="footer__site">
          Impressum
        </Link>
      </p>
      <p className="footer__creator">
        Diese Seite wurde von Kilian Aaron Brinkner mit NextJS erstellt.
      </p>
    </div>
  );
}
