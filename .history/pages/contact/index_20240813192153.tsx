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
          <a href='tel:++919643568010'>
            <img src='https://static.vecteezy.com/system/resources/thumbnails/016/969/401/original/incoming-call-with-accept-and-decline-option-animation-on-black-background-talking-call-screen-telephone-symbol-phone-calling-and-phone-ring-user-interface-animation-with-timer-smartphone-free-video.jpg'></img>
          </a>
        </div>
      </div>
      
    </div>
  );
}

export default Contact;
