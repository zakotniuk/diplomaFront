import React from 'react';


function QrCodeImage({ qrCodeBase64 }) {
  // Использование строки Base64 в качестве источника для изображения
  const src = `data:image/png;base64,${qrCodeBase64}`;

  return (
    <img src={src} alt="QR Code" />
  );
}

export default QrCodeImage;
