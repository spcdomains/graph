import Image from "next/image";
import React, { useEffect } from "react";
import style from "./index.module.scss";
import Link from "next/link";

const Index = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Trigger animation when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(style.inView);
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, observerOptions);

    document.querySelectorAll(`.${style.card}`).forEach((card) => {
      observer.observe(card);
    });
  }, []);

  return (
    <div className={`${style.bg} ${style.flex}`}>
      <h1>FEATURED SKINS</h1>
      <div className={style.cardContainer}>
        {[
          {
            href: "Skintypes",
            src: "https://drive.google.com/uc?export=view&id=1TqH4DnBMlFu_AkiLT7xu25EMem2pEKi4",
            alt: "VOODOO CAULDRON"
          },
          {
            href: "Skintypes",
            src: "https://drive.google.com/uc?export=view&id=1T_rcWpfHm6wi8VeCIkAD5zu0Tp_YTC-D",
            alt: "COLORED EGG"
          },
          {
            href: "Skintypes",
            src: "https://drive.google.com/uc?export=view&id=1cZWT49HFykHH5PpDJbvb6Ja2F303yiih",
            alt: "SPLENDOR HALO"
          },
          {
            href: "Skintypes",
            src: "https://drive.google.com/uc?export=view&id=1eTHPVDn659FheKvpCQs1ItYbtGfgQf4f",
            alt: "BALL LIGHTENING"
          }
        ].map((item, index) => (
          <div className={style.card} key={index}>
            <Link href={item.href} className={style.links}>
              <Image
                className={style.img}
                src={item.src}
                width={250}
                height={280}
                alt={item.alt}
              />
              <h1>{item.alt}</h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
