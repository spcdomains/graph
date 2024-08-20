import React from 'react';
import styles from './index.module.scss'; // Import CSS module
import Image from 'next/image';

const deals = [
  {
    href: "Skintypes",
    src: "https://drive.google.com/uc?export=view&id=1TqH4DnBMlFu_AkiLT7xu25EMem2pEKi4",
    alt: "VOODOO CAULDRON"
  },
  {
    href: "Skintypes",
    src: "https://drive.google.com/uc?export=view&id=1DXKf3ltVYCin1tQTz52uXpBjAJvTo5p6",
    alt: "BLADE OF ICE"
  },
  {
    href: "Skintypes",
    src: "https://drive.google.com/uc?export=view&id=1cZWT49HFykHH5PpDJbvb6Ja2F303yiih",
    alt: "SPLENDOR HALO"
  },
  {
    href: "Skintypes",
    src: "https://drive.google.com/uc?export=view&id=1XzJ_4vu-8E-goa0SJklzI5qpB5aF1V_0",
    alt: "TELEPORT"
  }
];

const Index = () => (
  <div className={styles.container}>
    <div className={styles.cardContainer}>
      {deals.map((deal, index) => (
        <a href={deal.href} key={index} className={styles.links}>
          <div className={styles.card}>
            <Image src={deal.src} alt={deal.alt} width={100} height={100}/>
            <div className={styles.overlay}>
              <h2>{deal.alt}</h2>
              {/* Optionally, you can add more details here */}
            </div>
            <h1>{deal.alt}</h1>
          </div>
        </a>
      ))}
    </div>
  </div>
);

export default Index;
