const express = require('express');
const router = express.Router();
const { generateTicket } = require('../utils/generateTicket');

router.post('/order', async (req, res) => {
  try {
    const orderData = req.body;

    if (!orderData || !orderData.orderId) {
      return res.status(400).json({
        error: 'Invalid payload. "orderId" is required.',
      });
    }

    const ticket = await generateTicket(orderData);

    return res.status(201).json({
      success: true,
      ticket,
      originalOrder: orderData,
    });
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
