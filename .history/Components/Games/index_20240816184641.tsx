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
                "https://drive.google.com/uc?export=view&id=1dVsUY4bAGfaR2Dl0ucAcGwCUVRlxuxqm"
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
              "https://drive.google.com/uc?export=view&id=1T_rcWpfHm6wi8VeCIkAD5zu0Tp_YTC-D"
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
              "https://drive.google.com/uc?export=view&id=1XzJ_4vu-8E-goa0SJklzI5qpB5aF1V_0"
            }
            width={250}
            height={280}
            // layout="fill" // Cover the container
            // objectFit="cover" // Ensure the image covers the container
            // priority
            alt="pic"
          ></Image>

          <h1>VALKYRIE'S LEGION</h1>
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
