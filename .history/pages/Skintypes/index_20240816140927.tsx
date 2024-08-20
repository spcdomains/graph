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
  
  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from propagating to parent elements
  };

  return (
    <div className={styles.cardContainer}>
      {filterVisible && (
        <div className={`${styles.filter} ${filterVisible ? styles.filterVisible : ''}`} onClick={stopPropagation}>
          <button className={styles.closeButton} onClick={toggleFilterVisibility}>
            &times;
          </button>
          <div className={styles.search_box}>
            <label>Search Box</label>
            <input 
              placeholder="Search Here" 
              type="text" 
              value={selectedSkin}
              onClick={stopPropagation} // Prevent click from closing filter
              onChange={(e) => setSelectedSkin(e.target.value)}
            />
          </div>
          <div className={styles.search_box}>
            <label>Select Category</label>
            <input 
              placeholder="Category" 
              type="text" 
              value={selectedCategory}
              onClick={stopPropagation} // Prevent click from closing filter
              onChange={(e) => setSelectedCategory(e.target.value)}
            />
          </div>
          <div className={styles.search_box}>
            <label>Select Buff</label>
            <input 
              placeholder="Buff" 
              type="text" 
              value={selectedBuff}
              onClick={stopPropagation} // Prevent click from closing filter
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













// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./index.module.scss";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from "next/router";

// const Index = () => {
//   const [categories, setCategories] = useState<any>([]);
//   const [filterVisible, setFilterVisible] = useState<boolean>(false);
//   const [selectedCategory, setSelectedCategory] = useState<string>('');
//   const [selectedSkin, setSelectedSkin] = useState<string>('');
//   const [selectedBuff, setSelectedBuff] = useState<string>('');
//   const router = useRouter();

//   useEffect(() => {
//     const setInitialFilterVisibility = () => {
//       if (window.innerWidth <= 768) {
//         setFilterVisible(false);
//       } else {
//         setFilterVisible(true);
//       }
//     };

//     setInitialFilterVisibility();

//     window.addEventListener("resize", setInitialFilterVisibility);

//     return () => {
//       window.removeEventListener("resize", setInitialFilterVisibility);
//     };
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "https://www.referback.trollsufficient.com/data/all-category"
//         );
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleGoClick = () => {
//     // Navigate to the /Fetched page with query parameters
//     router.push({
//       pathname: '/Fetched',
//       query: {
//         skintype: selectedCategory,
//         name: selectedBuff,
//         // skin: selectedSkin,
//       },
//     });
//   };

//   const toggleFilterVisibility = () => {
//     setFilterVisible(!filterVisible);
//   };

//   const stopPropagation = (e: React.MouseEvent) => {
//     e.stopPropagation(); // Prevent click from propagating to parent elements
//   };

//   const closeFilterOnOutsideClick = (e: React.MouseEvent) => {
//     if (window.innerWidth <= 768) {
//       setFilterVisible(false);
//     }
//   };

//   return (
//     <div className={styles.cardContainer} onClick={closeFilterOnOutsideClick}>
//       {filterVisible && (
//         <div
//           className={`${styles.filter} ${
//             filterVisible ? styles.filterVisible : ""
//           }`}
//           onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the filter
//         >
//           <button className={styles.closeButton} onClick={toggleFilterVisibility}>
//             &times;
//           </button>
//           <div className={styles.search_box}>
//             <label>Search Box</label>
//             <input
//               placeholder="Search Here"
//               type="text"
//               value={selectedSkin}
//               onClick={stopPropagation} // Prevent click from closing filter on mobile
//               onChange={(e) => setSelectedSkin(e.target.value)}
//             />
//           </div>
//           <div className={styles.search_box}>
//             <label>Select Category</label>
//             <input
//               placeholder="Category"
//               type="text"
//               value={selectedCategory}
//               onClick={stopPropagation} // Prevent click from closing filter on mobile
//               onChange={(e) => setSelectedCategory(e.target.value)}
//             />
//           </div>
//           <div className={styles.search_box}>
//             <label>Select Buff</label>
//             <input
//               placeholder="Buff"
//               type="text"
//               value={selectedBuff}
//               onClick={stopPropagation} // Prevent click from closing filter on mobile
//               onChange={(e) => setSelectedBuff(e.target.value)}
//             />
//           </div>
//           <div className={styles.btn}>
//             <button
//               onClick={handleGoClick}
//               style={{
//                 width: "100px",
//                 height: "30px",
//                 marginTop: "30px",
//                 cursor: "pointer",
//               }}
//             >
//               GO
//             </button>
//           </div>
//         </div>
//       )}
//       <button className={styles.filterButton} onClick={toggleFilterVisibility}>
//         {filterVisible ? "Hide Filters" : "Show Filters"}
//       </button>
//       <div className={styles.cards}>
//         {categories.map((category: any) => (
//           <Link
//             key={category._id}
//             href={`/Skintypes/${category.name}`}
//             style={{ textDecoration: "none" }}
//           >
//             <div className={styles.card}>
//               <Image
//                 src={category.photo}
//                 alt={category.name || "Category Image"}
//                 className={styles.cardImage}
//                 width={500}
//                 height={300}
//               />
//               <div className={styles.cardContent}>
//                 <h2 className={styles.cardTitle}>
//                   {category.name.toUpperCase()}
//                 </h2>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Index;
