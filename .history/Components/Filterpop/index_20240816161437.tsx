import React, { useRef, useEffect, useState } from 'react';
import styles from './index.module.scss';

interface FilterPopupProps {
  filterVisible: boolean;
  toggleFilterVisibility: () => void;
  selectedSkin: string;
  setSelectedSkin: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedBuff: string;
  setSelectedBuff: (value: string) => void;
  handleGoClick: () => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({
  filterVisible,
  toggleFilterVisibility,
  selectedSkin,
  setSelectedSkin,
  selectedCategory,
  setSelectedCategory,
  selectedBuff,
  setSelectedBuff,
  handleGoClick,
}) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    
    const handleResize = () => {
      // Check if the virtual keyboard is open by comparing inner height
      setKeyboardVisible(window.innerHeight < document.documentElement.clientHeight);
    };

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Ensure filter visibility based on keyboard status
    if (keyboardVisible) {
      filterRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [keyboardVisible]);

  // Handle clicks outside of the popup
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        toggleFilterVisibility();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleFilterVisibility]);

  return (
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
        <button onClick={handleGoClick} style={{ width: "100px", height: "30px", marginTop: "30px", cursor: "pointer" }}>
          GO
        </button>
      </div>
    </div>
  );
  
};

export default FilterPopup;
