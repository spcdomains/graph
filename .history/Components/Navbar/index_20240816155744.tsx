import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [coins, setCoins] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [allData, setAllData] = useState<any[]>([]);
  const router = useRouter();

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Close menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Check authentication status and fetch user data
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");
    setIsAuthenticated(!!token);
    setUserRole(role);

    const fetchCoins = async () => {
      if (token) {
        try {
          const userId = localStorage.getItem("userId");
          if (userId) {
            const coinsResponse = await axios.get(
              `https://www.referback.trollsufficient.com/admin/coins/${userId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            setCoins(coinsResponse.data.coins);
          }
        } catch (error) {
          console.error("Error fetching coins:", error);
        }
      }
    };

    fetchCoins();
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.referback.trollsufficient.com/data/sort');
        setAllData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredSuggestions = allData.filter(item =>
        item.skintype.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, allData]);

  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userCoins");
    localStorage.removeItem("role");

    setCoins(0);
    setIsAuthenticated(false);
    setUserRole(null);

    router.push("/").then(() => {
      window.location.reload();
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (skintype: string) => {
    setSearchTerm(skintype);
    router.push(`/details/${skintype}`); // Navigate to the detailed page
  };

  return (
    <div className={style.navbar_cain}>
      <div className={style.hamburger} onClick={toggleMenu}>
        {isMenuOpen ? "X" : "☰"}
      </div>
      <div className={style.image}></div>
      <div className={style.search_box}>
        <input
          className={style.input}
          placeholder="Enter Favorite Skins"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {suggestions.length > 0 && (
          <div className={style.suggestions}>
            {suggestions.map((item) => (
              <div
                key={item._id}
                className={style.suggestionItem}
                onClick={() => handleSuggestionClick(item.skintype)}
              >
                <img src={item.photo[0]} alt={item.skintype} className={style.suggestionImage} />
                <div className={style.suggestionText}>
                  {item.skintype}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ul className={`${style.caintainer} ${isMenuOpen ? style.showMenu : ""}`}>
        <li className={style.items} onClick={closeMenu}>
          <div className={style.name}>
            <Link href="/" style={{ textDecoration: "none", color: "white" }}>
              <p>Home</p>
            </Link>
            <hr className={style.line} />
          </div>
        </li>
        <li className={style.items} onClick={closeMenu}>
          <div className={style.name}>
            <Link href="/Tree" style={{ textDecoration: "none", color: "white" }}>
              <p>Alluser</p>
            </Link>
            <hr className={style.line} />
          </div>
        </li>
        <li className={style.items} onClick={closeMenu}>
          <div className={style.name}>
            <Link href="/Skintypes" style={{ textDecoration: "none", color: "white" }}>
              <p>Skins</p>
            </Link>
            <hr className={style.line} />
          </div>
        </li>
        <li className={style.items} onClick={closeMenu}>
          <div className={style.name}>
            <Link href="/contact" style={{ textDecoration: "none", color: "white" }}>
              <p>Contact</p>
            </Link>
            <hr className={style.line} />
          </div>
        </li>
        <li className={style.items} onClick={closeMenu}>
          <div className={style.name}>
            {!isAuthenticated ? (
              <Link href="/Login" style={{ textDecoration: "none", color: "white" }}>
                <p>Login</p>
              </Link>
            ) : (
              <button className={style.links} onClick={handleLogout}>
                Logout
              </button>
            )}
            <hr className={style.line} />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
