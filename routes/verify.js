const express = require('express');
const router = express.Router();

router.get('/:ticketId', async (req, res) => {
  const { ticketId } = req.params;

  res.status(200).json({
    ticketId,
    valid: true,
    message: 'Mock verification success'
  });
});

module.exports = router;
