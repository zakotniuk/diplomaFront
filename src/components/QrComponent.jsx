import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';


function QrCodeImage({ qrCodeBase64 }) {
  // Использование строки Base64 в качестве источника для изображения
  const src = `data:image/png;base64,${qrCodeBase64}`;
  
  Modal.setAppElement("#root"); // Это нужно для доступности, замените "#root" на id вашего root элемента
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
      setModalIsOpen(true);
  }

  function closeModal() {
      setModalIsOpen(false);
  }
  
  return (
    <div>
      
    
      <img src={src} alt="QR Code" max-width='300px'/>
      <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  contentLabel="QR Code"
              >
                  <img src={`data:image/png;base64,${qrCodeBase64}`} alt="QR Code" />
                  <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default QrCodeImage;
