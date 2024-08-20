import React from 'react';
import styles from './index.module.scss'; // Import CSS module
// import index from '../About';
const deals=[
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
const index = (deals ) => (
  <div className={styles.container}>
    <div className={styles.cardContainer}>
      {deals.map((deal, index) => (
        <div className={styles.card} key={index}>
          <img src={deal.image} alt={deal.title} />
          <div className={styles.overlay}>
            <h2>{deal.title}</h2>
            <p>{deal.description}</p>
          </div>
          <h1>{deal.title}</h1>
        </div>
      ))}
    </div>
  </div>
);

export default index;
