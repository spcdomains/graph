import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const Index = () => {
  const [categories, setCategories] = useState<any>([]);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSkin, setSelectedSkin] = useState<string>('');
  const [selectedBuff, setSelectedBuff] = useState<string>('');
  const router = useRouter();

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
          "https://www.referback.trollsufficient.com/data/all-category"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleGoClick = (e: React.FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: '/Fetched',
      query: {
        skintype: selectedCategory,
        name: selectedBuff,
      },
    });
  };

  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible);
  };

  const closeFilter = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from propagating to the background
    setFilterVisible(false);
  };

  return (
    <div className={styles.cardContainer}>
      {filterVisible && (
        <div className={`${styles.filter} ${filterVisible ? styles.filterVisible : ''}`}>
          <button className={styles.closeButton} onClick={closeFilter}>
            &times;
          </button>
          <form onSubmit={handleGoClick}>
            <div className={styles.search_box}>
              <label>Search Box</label>
              <input 
                placeholder="Search Here" 
                type="text" 
                value={selectedSkin}
                onChange={(e) => setSelectedSkin(e.target.value)}
              />
            </div>
            <div className={styles.search_box}>
              <label>Select Category</label>
              <input 
                placeholder="Category" 
                type="text" 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />
            </div>
            <div className={styles.search_box}>
              <label>Select Buff</label>
              <input 
                placeholder="Buff" 
                type="text" 
                value={selectedBuff}
                onChange={(e) => setSelectedBuff(e.target.value)}
              />
            </div>
            <div className={styles.btn}>
              <button type="submit" style={{ width: "100px", height: "30px", marginTop: "30px", cursor: "pointer" }}>GO</button>
            </div>
          </form>
        </div>
      )}
      <button className={styles.filterButton} onClick={toggleFilterVisibility}>
        {filterVisible ? "Hide Filters" : "Show Filters"}
      </button>
      <div className={styles.cards}>
        {categories.map((category: any) => (
          <Link
            key={category._id}
            href={`/Skintypes/${category.name}`}
            style={{ textDecoration: "none" }}
          >
            <div className={styles.card}>
              <Image
                src={category.photo}
                alt={category.name || "Category Image"}
                className={styles.cardImage}
                width={500}
                height={300}
              />
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{category.name.toUpperCase()}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>  
    </div>
  );
};

export default Index;
