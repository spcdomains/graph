import React, { useEffect, useState, useRef } from "react";
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
  const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);
  const router = useRouter();
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setInitialFilterVisibility = () => {
      if (window.innerWidth <= 768) {
        setFilterVisible(false);
      } else {
        setFilterVisible(true);
      }
    };

    setInitialFilterVisibility();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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

  const handleGoClick = () => {
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

  const handleClickOutside = (e: MouseEvent) => {
    if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
      setFilterVisible(false);
    }
  };

  const handleResize = () => {
    // Detect keyboard visibility by comparing window inner height
    const isKeyboardOpen = window.innerHeight < document.documentElement.clientHeight;
    setKeyboardOpen(isKeyboardOpen);

    // Adjust filter visibility based on keyboard status
    if (isKeyboardOpen) {
      setFilterVisible(true); // Keep filter visible if keyboard is open
    } else if (window.innerWidth <= 768) {
      setFilterVisible(false); // Hide filter on mobile if keyboard is not open
    } else {
      setFilterVisible(true); // Always show filter on larger screens
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.cardContainer}>
      {filterVisible && (
        <div
          ref={filterRef}
          className={`${styles.filter} ${filterVisible ? styles.filterVisible : ''}`}
        >
          <button className={styles.closeButton} onClick={toggleFilterVisibility}>
            &times;
          </button>
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
            <button onClick={handleGoClick} style={{ width: "100px", height: "30px", marginTop: "30px", cursor: "pointer" }}>GO</button>
          </div>
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
