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
            src: "https://drive.google.com/uc?export=view&id=176HsD6UQRA2Lh8B9OLLy9fGUmDBLvDtg",
            alt: "VOODOO CAULDRON"
          },
          {
            href: "Skintypes",
            src: "https://drive.google.com/uc?export=view&id=1DXKf3ltVYCin1tQTz52uXpBjAJvTo5p6",
            alt: "BLADE OF ICE"
          },
          {
            href: "Skintypes",
            src: "https://drive.google.com/uc?export=view&id=1CSi_XfupKQguIz2HUwX1pKswNqjsdK58",
            alt: "DREAMY"
          },
          {
            href: "Skintypes",
            src: "https://drive.google.com/uc?export=view&id=1hy40vA_FvDhSrY5C-E4WJM_D_s8yaPGT",
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
