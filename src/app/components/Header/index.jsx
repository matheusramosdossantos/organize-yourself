import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";

import logoOY from "../../../../public/images/organize_yourself_logo_no_bg.png";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.imgDiv}>
        <Image
          className={styles.img}
          src={logoOY}
          alt="Organize Yourself logo"
          width={80}
          height={80}
        />
      </div>
    </header>
  );
}
