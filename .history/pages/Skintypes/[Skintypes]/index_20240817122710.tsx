import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import Modal from "../../../Components/Modal";
import Sell from "../../../Components/Sell";
import Link from "next/link";

interface Castle {
  _id: string;
  photo: string[];
  skintype: string;
  quantity: any;
  castles: any;
  buff?: any;
  customerName?: string;
  quantitySold?: number;
}

// Function to transform text to "Title Case" format
const toTitleCase = (text: string) => {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const Index = () => {
  const [castlesData, setCastlesData] = useState<Castle[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSell, setShowSell] = useState<boolean>(false);
  const [currentCastle, setCurrentCastle] = useState<Castle | null>(null);
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem("role");
    if (admin === "admin") {
      setAllow(true);
    }
  }, []);
  
  const router = useRouter();
  const { Skintypes } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Skintypes) {
          const response = await axios.get(
            `https://www.referback.trollsufficient.com/data/permalink/${Skintypes}`
          );
          setCastlesData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [Skintypes]);

  const handleEdit = (castle: Castle) => {
    setCurrentCastle(castle);
    setShowModal(true);
  };

  const handleSell = (castle: Castle) => {
    setCurrentCastle(castle);
    setShowSell(true);
  };

  const handleInputChange = (field: keyof Castle, value: any) => {
    setCurrentCastle((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSave = async () => {
    if (!currentCastle) return;

    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `https://www.referback.trollsufficient.com/data/castles/${currentCastle._id}`,
        {
          ...currentCastle,
          quantity: Number(currentCastle.quantity),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCastlesData((prev) =>
        prev.map((castle) =>
          castle._id === currentCastle._id ? currentCastle : castle
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleSellSave = async () => {
    if (!currentCastle) return;

    try {
      const token = localStorage.getItem("accessToken");

      await axios.post(
        "https://www.referback.trollsufficient.com/customer/details",
        {
          name: currentCastle.customerName,
          skintype: currentCastle.skintype,
          quantity: Number(currentCastle.quantitySold),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedCastle = {
        ...currentCastle,
        quantity:
          Number(currentCastle.quantity) - Number(currentCastle.quantitySold),
      };

      await axios.put(
        `https://www.referback.trollsufficient.com/data/castles/${currentCastle._id}`,
        updatedCastle,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCastlesData((prev) =>
        prev.map((castle) =>
          castle._id === currentCastle._id ? updatedCastle : castle
        )
      );
      setShowSell(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className={styles.cardContainer}>
          {castlesData.map((castle) => (
            <Link key={castle._id} href={"https://wa.me/919599728762"} style={{ textDecoration: "none" }}>
              <div key={castle._id} className={styles.card}>
                <Image
                  src={castle.photo[0]}
                  alt={castle.skintype || "Castle Image"}
                  className={styles.cardImage}
                  width={500}
                  height={300}
                />
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>
                    {toTitleCase(castle.skintype)}
                  </h2>
                  <h2 className={styles.cardTitle}>
                    {castle.sellingAmount}
                  </h2>
                  {allow && ( <p className={styles.cardText}>
                    <strong>Quantity:</strong> {castle.quantity}
                  </p>
                     )}
                  {allow && ( <p className={styles.cardText}>
                    <strong>Castles:</strong>  {castle.castles.join(", ")}
                  </p>
                    )}
                  {castle.buff && castle.buff.length > 0 && (
                    <p className={styles.cardText}>
                      <strong>Buff:</strong>
                      {castle.buff.map((buffObject: any, index: number) => (
                        <div key={index}>
                          {Object.entries(buffObject).map(
                            ([buffName, buffValue]: any, idx: number) => (
                              <div key={idx}>
                                <strong>{buffName}:</strong> {buffValue}%
                              </div>
                            )
                          )}
                        </div>
                      ))}
                    </p>
                  )}
                  <div className={styles.btn}>
                    <div className={styles.left}>
                      {allow && (
                        <button onClick={() => handleEdit(castle)}>Edit</button>
                      )}
                    </div>
                    <div>
                      {allow && (
                        <button onClick={() => handleSell(castle)}>Sell</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        castle={currentCastle}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
      />
      <Sell
        show={showSell}
        onClose={() => setShowSell(false)}
        castle={currentCastle}
        handleInputChange={handleInputChange}
        handleSave={handleSellSave}
      />
    </>
  );
};

export default Index;
