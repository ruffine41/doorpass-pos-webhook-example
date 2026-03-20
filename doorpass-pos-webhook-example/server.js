const express = require('express');
const webhookRoutes = require('./routes/webhook');
const verifyRoutes = require('./routes/verify');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/webhook', webhookRoutes);
app.use('/verify', verifyRoutes);

app.get('/', (req, res) => {
  res.json({
    service: 'DoorPass POS Webhook Example',
    version: '1.0.0',
    endpoints: {
      webhook: 'POST /webhook/order',
      verify: 'GET /verify/:ticketId',
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
