import React from "react";
import style from "./index.module.scss";
import Image from "next/image";
const index = () => {
  return (
    <div className={`${style.bg} ${style.flex}`}>
      <div className={style.left}>
        <div className={style.l}>
          <Image
            src={
              "https://static.wixstatic.com/media/43ee96_b6b569e5d4674f48b3a1ba366ffe4632~mv2.jpeg/v1/fill/w_1169,h_745,al_c/43ee96_b6b569e5d4674f48b3a1ba366ffe4632~mv2.jpeg"
            }
            alt="pic"
            width={300}
            height={100}
            objectFit="cover"
            className={style.logo}
          ></Image>
        </div>
      </div>
      <div className={style.right}>
        <h1>Why Choose us?</h1>
        <ul className={style.ul}>
          <li>
            {" "}
            <b>1.Secure Transactions:</b> Trust in a robust system built to
            safeguard your assets and transactions.
          </li>
          <li>
            {" "}
            <b>2.Gamer-Centric Design:</b> Experience a platform tailored to the
            needs and passions of gamers like you.
          </li>
          <li>
            {" "}
            <b>3.Seamless Experience:</b> Enjoy an intuitive interface that
            makes trading your virtual valuables effortless and enjoyable.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default index;
