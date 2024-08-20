import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";
import Filterpop from '@/Components/Filterpop'
import { useRouter } from "next/router";

const Index = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
//   const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSkin, setSelectedSkin] = useState<string>('');
  const [selectedBuff, setSelectedBuff] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(false);
const router=useRouter()
const {query}=router;
const {skintype,name}=query;
console.log(query)
  useEffect(() => {
    const setInitialFilterVisibility = () => {
      if (window.innerWidth <= 768) {
        setFilterVisible(false);
      } else {
        setFilterVisible(true);
      }
    };

    setInitialFilterVisibility();

    window.addEventListener("resize", setInitialFilterVisibility);

    return () => {
      window.removeEventListener("resize", setInitialFilterVisibility);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.referback.trollsufficient.com/data/sort?permalink=${skintype}&skintype=${name}`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible);
  };

  const closeFilter = () => {
    setFilterVisible(false);
  };
  const handleGoClick = () => {
    // Navigate to the /Fetched page with query parameters
    router.push({
      pathname: '/Fetched',
      query: {
        skintype: selectedCategory,
        name: selectedBuff,
        // skin: selectedSkin,
      },
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    // On large screens, set filterVisible to true
    if (!isMobile) {
      setFilterVisible(true);
    }
  }, [isMobile]);
  return (
    <div className={styles.cardContainer}>
    <Filterpop
        filterVisible={filterVisible}
        toggleFilterVisibility={toggleFilterVisibility}
        selectedSkin={selectedSkin}
        setSelectedSkin={setSelectedSkin}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedBuff={selectedBuff}
        setSelectedBuff={setSelectedBuff}
        handleGoClick={handleGoClick}
      />
      {isMobile && (
        <button className={styles.filterButton} onClick={toggleFilterVisibility}>
          {filterVisible ? 'Hide Filters' : 'Show Filters'}
        </button>
      )}
      <div className={styles.cards}>
        {categories.map((category: any) => (
          <Link
            key={category._id}
            href={`/Skintypes/${category.skintype}`}
            style={{ textDecoration: "none" }}
          >
            <div className={styles.card}>
              {category.photo && category.photo.length > 0 && (
                <Image
                  src={category.photo[0]} // Assuming you want to show the first photo
                  alt={category.skintype || "Category Image"}
                  className={styles.cardImage}
                  width={500} // Adjust width as needed
                  height={300} // Adjust height as needed
                />
              )}
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{category.skintype}</h2>
                <p>Quantity: {category.quantity}</p>
                <p>Selling Amount: {category.sellingAmount}</p>
                <p>Buffs: {category.buff.map((b: any, index: number) => (
                  <span key={index}>
                    {Object.entries(b).map(([key, value]:any) => (
                      <span key={key}>{key}: {value}; </span>
                    ))}
                  </span>
                ))}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
