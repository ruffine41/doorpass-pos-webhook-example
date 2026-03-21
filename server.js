require('dotenv').config();
const express = require('express');

const webhookRoutes = require('./routes/webhook');
const verifyRoutes = require('./routes/verify');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    name: 'doorpass-pos-webhook-example',
    status: 'ok',
    message: 'DoorPass POS Webhook Example is running'
  });
});

app.use('/webhook', webhookRoutes);
app.use('/verify', verifyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
