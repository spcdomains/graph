import Image from "next/image";
import React from "react";
import style from "./index.module.scss";
import Link from "next/link";
const index = () => {
  return (
    <div className={`${style.bg} ${style.flex}`}>
      <h1>POPULAR CATEGORIES</h1>
      <div className={style.cardContainer}>
        <div className={style.card}>
          {" "}
          <Link href={"Skintypes"} className={style.links}>
            {/* <Link href={"Skintypes"} style={{textDecoration:"none"}}> */}
            <Image
              className={style.img}
              src={
                "https://drive.google.com/uc?export=view&id=17h2FTBztvqOBGkriXzdkR-bFHkq7VunH"
              }
              width={250}
              height={280}
              // layout="fill" // Cover the container
              // objectFit="cover" // Ensure the image covers the container
              // priority
              alt="pic"
            ></Image>

            <h1>CASTLES</h1>
            {/* </Link> */}
          </Link>
        </div>

        <div className={style.card}>
        <Link href={"Skintypes"} className={style.links}>
          <Image
            className={style.img}
            src={
              "https://drive.google.com/uc?export=view&id=1DNFso4eSd5pM99E20XIszDoaq_GKXFlP"
            }
            width={250}
            height={280}
            // layout="fill" // Cover the container
            // objectFit="cover" // Ensure the image covers the container
            // priority
            alt="pic"
          ></Image>

          <h1>HERO</h1>
          </Link>
        </div>
        <div className={style.card}>
        <Link href={"Skintypes"} className={style.links}>
          <Image
            className={style.img}
            src={
              "https://drive.google.com/uc?export=view&id=1q87Ncp55PLYDeU5lJtWH3sKgxaZdoRZl"
            }
            width={250}
            height={280}
            // layout="fill" // Cover the container
            // objectFit="cover" // Ensure the image covers the container
            // priority
            alt="pic"
          ></Image>

          <h1>TELEPORT</h1>
          </Link>
        </div>
        <div className={style.card}>
        <Link href={"Skintypes"} className={style.links}>
          <Image
            className={style.img}
            src={"https://drive.google.com/uc?export=view&id=1SqCNrDIT3yoNG6jlEV_CoL-ZyQihpfYW"}
            width={250}
            height={280}

            alt="pic"
          ></Image>

          <h1>PENDANT </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default index;
