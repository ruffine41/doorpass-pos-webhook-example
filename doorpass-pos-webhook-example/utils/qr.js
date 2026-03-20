const QRCode = require('qrcode');

async function generateQR(data) {
  const base64 = await QRCode.toDataURL(data, {
    width: 300,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  });
  return base64;
}

module.exports = { generateQR };
