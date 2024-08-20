import React from 'react';
import style from './index.module.scss';
// import video from  '@/public/video/video.mp4'
const Contact = () => {
  return (
    <div className={style.container}>
      <div>
          <video autoPlay muted loop>
            <source src={"/video/video.mp4"} type="video/mp4" />
          </video>
        </div>  
      <div className={style.boxes}>
        <div className={style.box}>
          <a href='https://discord.com/invite/TGkbUAUm' target="_blank">
          <img src='https://i.ytimg.com/vi/7V5jdOjWVU4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCCLmAxRosK3Ltbar9OdDhUHFuDug'></img>
          </a>
        </div>
        <div className={style.box}>
          <a href='https://invite.viber.com/?g2=AQAusJqNJtfIzU8LH8LWnBAuvbmC3ag3bNyVftqLDNZAh%2FV1XT1%2FQ8p1cvglNgwr' target='_blank' >
          
            <img src='https://gravitec.net/blog/wp-content/uploads/2019/05/Viber-logo-1.png'></img>
          </a>
        </div>
        <div className={style.box}>
          <a href='https://www.facebook.com/share/NsuJjh5DgDfckfe8/?mibextid=A7sQZp'>
          <img src='https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2022/03/facebook_logo_hero_1200x675.jpg'></img>
          </a>
        </div>
        <div className={style.box}>
          <a href='"https://wa.me/919599728762"'>
            <img src='data:image/png;base64,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'></img>
          </a>
        </div>
      </div>
      
    </div>
  );
}

export default Contact;
