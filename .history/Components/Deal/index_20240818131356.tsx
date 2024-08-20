import React, { useEffect, useState } from "react";
import Image from "next/image";
import style from "./index.module.scss";
import Link from "next/link";
import popup from "@/public/popup.png";
import Modal from "../Modal";
import Sell from "../Sell";
const Index = () => {
  const [deals, setDeals] = useState<any>([]);

  useEffect(() => {
    // Fetch deals from API
    const fetchDeals = async () => {
      try {
        const response = await fetch("http://localhost:3000/deals/all-deal");
        const data = await response.json();
        setDeals(data);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };

    fetchDeals();

    // Intersection Observer setup for animation
    const observerOptions = {
      root: null,
      rootMargin: "0px",
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
      <h1>TODAY'S DEALS</h1>
      <div className={style.cardContainer}>
        <div className={style.heartbeatWrapper}>
          <img src={popup.src} alt="Sale" className={style.heartbeat} />
        </div>
        {deals.map((deal: any) => (
          <div className={style.card} key={deal._id}>
            <Link href={`/deals/${deal._id}`} className={style.links}>
              <div className={style.imageWrapper}>
                <Image
                  className={style.img}
                  src={deal.photo}
                  width={250}
                  height={280}
                  alt={deal.name}
                />
              </div>
              <h1>{deal.name}</h1>
              <p>Discount: {deal.discount}</p>
              <p>Final Price: {deal.price}</p>
            </Link>
          </div>
        ))}
      </div>
    
       {/* <Sell */}
        // show={showSell}
        // onClose={() => setShowSell(false)}
        // castle={currentCastle}
        // handleInputChange={handleInputChange}
        // handleSave={handleSellSave}
      // />
    </div>
  );
};

export default Index;
