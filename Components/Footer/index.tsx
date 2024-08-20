import React from 'react';
import styles from './inde.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.text}>
        © 2024 Sufficient Premium Club. All rights reserved.
      </div>
      <div className={`${styles.icon} ${styles['mobile-hidden']}`}>
        {/* <img 
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/598px-WhatsApp_icon.png' 
          alt='WhatsApp Icon'
        /> */}
      </div>
    </div>
  );
}

export default Footer;
