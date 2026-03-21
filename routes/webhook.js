const express = require('express');
const { generateTicket } = require('../utils/generateTicket');

const router = express.Router();

router.post('/order', async (req, res) => {
  try {
    const order = req.body;
    const ticket = await generateTicket(order);

    res.status(200).json({
      success: true,
      ticket
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Ticket generation failed'
    });
  }
});

module.exports = router;
