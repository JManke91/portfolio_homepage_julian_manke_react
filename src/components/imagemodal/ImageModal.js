import React from 'react';
import PropTypes from 'prop-types';
import './ImageModal.css'; // Adjust the path based on your project structure

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content">
        <img className="enlarged-image" src={imageUrl} alt="Enlarged" />
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
      </div>
    </div>
  );
};

ImageModal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
