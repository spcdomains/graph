import React, { useState, useEffect } from 'react';
import styles from './index.module.scss'; // Import CSS module for styling

// Define TypeScript types for the props
interface Castle {
  customerName?: string;
  skintype?: string;
  quantitySold?: number;
  castles?: string[]; // Add castles property
}

interface SellProps {
  show: boolean;
  onClose: () => void;
  castle: Castle | null;
  handleInputChange: (field: keyof Castle, value: any) => void;
  handleSave: () => void;
}

const Sell: React.FC<SellProps> = ({ show, onClose, castle, handleInputChange, handleSave }) => {
  const [selectedCastle, setSelectedCastle] = useState<string | null>(null);

  useEffect(() => {
    if (castle && castle.castles && castle.castles.length > 0) {
      setSelectedCastle(castle.castles[0]); // Initialize with the first castle or null
    }
  }, [castle]);

  if (!show || !castle) return null;

  const handleCastleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCastle(event.target.value);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Sell Castle</h2>
        <form>
          {/* Customer Name */}
          <div className={styles.inputContainer}>
            <label>Customer Name</label>
            <input
              type="text"
              value={castle.customerName || ''}
              onChange={(e) => handleInputChange('customerName', e.target.value)}
            />
          </div>

          {/* Castle Dropdown */}
          {castle.castles && (
            <div className={styles.inputContainer}>
              <label>Castle</label>
              <select
                value={selectedCastle || ''}
                onChange={handleCastleChange}
              >
                <option value="" disabled>Select a castle</option>
                {castle.castles.map((castleName, index) => (
                  <option key={index} value={castleName}>{castleName}</option>
                ))}
              </select>
            </div>
          )}

          {/* Skin Type */}
          <div className={styles.inputContainer}>
            <label>Skin Type</label>
            <input
              type="text"
              value={castle.skintype || ''}
              onChange={(e) => handleInputChange('skintype', e.target.value)}
            />
          </div>

          {/* Quantity of Skins Sold */}
          <div className={styles.inputContainer}>
            <label>Quantity of Skins Sold</label>
            <input
              type="number"
              value={castle.quantitySold || ''}
              onChange={(e) => handleInputChange('quantitySold', e.target.value)}
            />
          </div>

          {/* Save and Cancel buttons */}
          <div className={styles.buttonContainer}>
            <button type="button" onClick={handleSave}>Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sell;
