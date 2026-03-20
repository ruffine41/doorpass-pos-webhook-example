const { v4: uuidv4 } = require('uuid');
const { generateQR } = require('./qr');

async function generateTicket(orderData) {
  const ticketId = uuidv4();
  const qrCode = await generateQR(ticketId);

  return {
    ticketId,
    qrCode,
    eventName: orderData.eventName || 'General Admission',
    createdAt: new Date().toISOString(),
  };
}

module.exports = { generateTicket };
