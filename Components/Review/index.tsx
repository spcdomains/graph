import React from 'react'
import style from './index.module.scss'
const Review = () => {
  return (
    <div className={style.caintainer}>
        <div className={style.heading}>
            <h1>Community Ratings</h1>
            <p>Trusted by Sufficent Premium Club</p>
        </div>
        <div className={style.boxes}>
        <div className={style.box}>
          <h1>Amit Sharma</h1>
          <p>🌟🌟🌟🌟🌟</p>
          <p className={style.para}>
            The community features, including forums and user reviews, are also
            a huge plus. Steam's regular updates and the addition of features
            like Steam Workshop and Steam Cloud enhance the gaming experience
          </p>
        </div>
        <div className={style.box}>
          <h1>Shimili</h1>
          <p>🌟🌟🌟🌟</p>
          <p className={style.para}>
            The store's clean interface and frequent discounts are attractive to
            gamers. The exclusivity of some high-profile games and the weekly
            free games keep users engaged.
          </p>
        </div>
        <div className={style.box}>
          <h1>zaij</h1>
          <p>🌟🌟🌟🌟🌟</p>
          <p className={style.para}>
            The user interface is straightforward, and the store often offers
            great deals on both new and old games. GOG also provides a seamless
            experience with its Galaxy client.
          </p>
        </div>
        <div className={style.box}>
          <h1>param</h1>
          <p>🌟🌟🌟🌟🌟</p>
          <p className={style.para}>
            The platform's interface is functional but can be clunky, and its
            library is limited to Ubisoft titles. The need to have yet another
            launcher for your games can be a drawback for some users.
          </p>
        </div>
      </div>
        
    </div>
  )
}

export default Review
