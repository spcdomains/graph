import React, { useState } from 'react';
import styles from './index.module.scss'; // Import CSS module for styling

const Modal = ({ show, onClose, castle, handleInputChange, handleSave }: any) => {
  const [newCastle, setNewCastle] = useState('');
  const [newBuffName, setNewBuffName] = useState('');
  const [newBuffValue, setNewBuffValue] = useState('');

  if (!show || !castle) return null;

  const addCastle = () => {
    if (newCastle.trim()) {
      handleInputChange('castles', [...castle.castles, newCastle.trim()]);
      setNewCastle('');
    }
  };

  const addBuff = () => {
    if (newBuffName.trim() && newBuffValue.trim()) {
      const newBuff = { [newBuffName.trim()]: newBuffValue.trim() };
      handleInputChange('buff', [...castle.buff, newBuff]);
      setNewBuffName('');
      setNewBuffValue('');
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Edit Castle</h2>
        <form>
          {/* Skin Type */}
          <div className={styles.inputContainer}>
            <label>Skin Type</label>
            <input
              type="text"
              value={castle.skintype || ''}
              onChange={(e) => handleInputChange('skintype', e.target.value)}
            />
          </div>

          {/* Photo URL */}
          <div className={styles.inputContainer}>
            <label>Photo URL</label>
            <input
              type="text"
              value={castle.photo ? castle.photo[0] : ''} // Assuming photo is an array, take the first element
              onChange={(e) => handleInputChange('photo', [e.target.value])} // Convert value to array
            />
          </div>

          {/* Castles (multiple values) */}
          <div className={styles.inputContainer}>
            <label>Castles</label>
            <input
              type="text"
              value={castle.castles ? castle.castles.join(', ') : ''} // Join array elements with a comma and space
              onChange={(e) => handleInputChange('castles', e.target.value.split(',').map(item => item.trim()))} // Split by comma and trim whitespace
            />
            <input
              type="text"
              value={newCastle}
              onChange={(e) => setNewCastle(e.target.value)}
              placeholder="Add new castle"
            />
            <button type="button" onClick={addCastle}>Add Castle</button>
          </div>

          {/* Quantity */}
          <div className={styles.inputContainer}>
            <label>Quantity</label>
            <input
              type="number"
              value={castle.quantity || ''}
              onChange={(e) => handleInputChange('quantity', e.target.value)}
            />
          </div>

          {/* Permalink */}
          <div className={styles.inputContainer}>
            <label>Permalink</label>
            <input
              type="text"
              value={castle.permalink || ''}
              onChange={(e) => handleInputChange('permalink', e.target.value)}
            />
          </div>

          {/* Buff (multiple values) */}
          <div className={styles.inputContainer}>
            <label>Buff</label>
            <div>
              {castle.buff && castle.buff.map((buffObject: any, index: number) => (
                <div key={index}>
                  {Object.entries(buffObject).map(([buffName, buffValue]: [string, any], idx: number) => (
                    <div key={idx}>
                      <strong>{buffName}:</strong> {buffValue}%
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <input
              type="text"
              value={newBuffName}
              onChange={(e) => setNewBuffName(e.target.value)}
              placeholder="Buff Name"
            />
            <input
              type="text"
              value={newBuffValue}
              onChange={(e) => setNewBuffValue(e.target.value)}
              placeholder="Buff Value (%)"
            />
            <button type="button" onClick={addBuff}>Add Buff</button>
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

export default Modal;
