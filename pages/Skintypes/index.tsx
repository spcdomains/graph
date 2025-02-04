import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './index.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import FilterPopup from '@/Components/Filterpop';

const Index = () => {
  const [categories, setCategories] = useState<any>([]);
  const [filterVisible, setFilterVisible] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSkin, setSelectedSkin] = useState<string>('');
  const [selectedBuff, setSelectedBuff] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://www.referback.trollsufficient.com/data/all-category'
        );
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    // Define a function to handle resize
    const handleResize = () => {
      setFilterVisible(window.innerWidth >= 1024);
    };

    // Set initial state
    handleResize();

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 768);
  //   };

  //   handleResize(); // Initial check
  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  // useEffect(() => {

  //   if (!isMobile) {
  //     setFilterVisible(true);
  //   }
  // }, [isMobile]);

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
    setFilterVisible(prev => !prev);
  };

  // const handleCardClick = (e: React.MouseEvent) => {
  //   e.stopPropagation(); // Prevent event from bubbling up
  // };

  return (
    <div className={styles.cardContainer}>
      <FilterPopup
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
            href={`/Skintypes/${category.name}`}
            style={{ textDecoration: 'none' }}
          >
            <div className={styles.card} >
              <Image
                src={category.photo}
                alt={category.name || 'Category Image'}
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
