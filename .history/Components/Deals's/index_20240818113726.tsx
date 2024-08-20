import React from 'react';
import styles from './index.module.scss'; // Import CSS module

const TodayDeal = ({ deals }) => (
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

export default TodayDeal;
