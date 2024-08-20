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
      role="dialog" // Accessibility improvement
      aria-labelledby="filter-dialog-title"
    >
      <button
        className={styles.closeButton}
        onClick={toggleFilterVisibility}
        aria-label="Close Filter" // Accessibility improvement
      >
        &times;
      </button>
      <div className={styles.search_box}>
        <label htmlFor="search-skin">Search Box</label>
        <input 
          id="search-skin"
          placeholder="Search Here" 
          type="text" 
          value={selectedSkin}
          onChange={(e) => setSelectedSkin(e.target.value)}
        />
      </div>
      <div className={styles.search_box}>
        <label htmlFor="select-category">Select Category</label>
        <input 
          id="select-category"
          placeholder="Category" 
          type="text" 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        />
      </div>
      <div className={styles.search_box}>
        <label htmlFor="select-buff">Select Buff</label>
        <input 
          id="select-buff"
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
