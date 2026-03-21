const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');

async function generateTicket(order) {
  const ticketId = uuidv4();
  const qrCodeBase64 = await QRCode.toDataURL(ticketId);

  return {
    ticketId,
    qrCodeBase64,
    order
  };
}

module.exports = { generateTicket };
