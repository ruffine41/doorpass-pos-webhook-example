const express = require('express');
const router = express.Router();

router.get('/:ticketId', (req, res) => {
  const { ticketId } = req.params;

  return res.json({
    ticketId,
    valid: true,
    message: 'Mock verification success',
  });
});

module.exports = router;
