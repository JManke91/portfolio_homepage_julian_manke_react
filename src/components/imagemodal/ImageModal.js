import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ImageModal.css';

const ImageModal = ({ imageUrl, onClose }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(true);
  }, []);

  const handleClose = () => {
    setIsActive(false);
  };

  const handleTransitionEnd = () => {
    if (!isActive) {
      onClose();
    }
  };

  return (
    <div
      className={`image-modal-overlay ${isActive ? 'active' : ''}`}
      onClick={handleClose}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className={`image-modal-content ${isActive ? 'active' : ''}`}>
        <div className="enlarged-image-container">
          <img className="enlarged-image" src={imageUrl} alt="Enlarged" />
          <span className="close-button" onClick={handleClose}>
            &times;
          </span>
        </div>
      </div>
    </div>
  );
};

ImageModal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
