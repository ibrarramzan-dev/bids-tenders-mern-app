import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { MailFilled } from "@ant-design/icons";
import logo from "@/public/images/footer-logo.png";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Footer() {
  return (
    <>
      <footer className={montserrat.className}>
        <div className="Footer-logo-col">
          <Image src={logo} alt="Logo" width={70} />
        </div>
        <div>
          <p className="Footer-heading">Menu Links</p>

          <ul>
            <li>
              <Link href="/">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/">Terms of service</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="Footer-heading">Locations</p>

          <ul>
            <li>United States</li>
            <li>Canada</li>
          </ul>
        </div>
        <div>
          <p className="Footer-heading">Support</p>

          <ul>
            <li>+1 800 594-4798</li>
            <li>
              <MailFilled className="Footer-mail-icon" />
              <Link href="mailto:support@sibs.com">support@sibs.com</Link>
            </li>
          </ul>
        </div>
      </footer>
      <p className="Footer-bottom-text">
        SIBS © {new Date().getFullYear()}. All Rights Reserved
      </p>
    </>
  );
}
