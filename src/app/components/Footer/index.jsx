import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";
import githubIcon from "../../../../public/icons/icons8-github-128.png";
import linkedinIcon from "../../../../public/icons/icons8-linkedin-100.png";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.mainDiv}>
        <div className={styles.informationsDivs}>
          <h1 className={styles.h1}>Contato</h1>
          <h3>mattheusdossaantos@gmail.com</h3>
          <Link href="https://github.com/matheusramosdossantos" target="_blank">
            <Image
              src={githubIcon}
              alt="Github Icon"
              className={styles.icons}
              id={styles.githubIcon}
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/matheus-ramos-front-enddeveloper/"
            target="_blank"
          >
            <Image
              src={linkedinIcon}
              alt="LinkedIn Icon"
              className={styles.icons}
              id={styles.linkedinIcon}
            />
          </Link>
        </div>
        <div className={styles.informationsDivs}>
          <h1 className={styles.h1}>Sobre</h1>
          <h3>
            Sou um desenvolvedor front-end cujos focos estão concentrados na
            linguagem JavaScript. Esse projeto serve para ajudar as pessoas a se
            organizarem no seu dia-a-dia. Foi produzido com Next.js. Espero que
            tenha apreciado. Obrigado pela visita!
          </h3>
        </div>
      </div>
      <hr />
      <h3 className={styles.copyright}>
        Organize Yourself | Copyright © 2024 Todos os direitos reservados
      </h3>
    </footer>
  );
}
