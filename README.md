# DoorPass POS Webhook Example

Minimal example of how a Point-of-Sale (POS) system can trigger ticket generation using a webhook.

---

## What This Demonstrates

- POS system sends an order event
- Webhook processes the order
- Ticket is generated instantly
- QR code is issued
- Ticket can be verified

---

## Example Flow

1. POS completes a sale  
2. Sends POST request to `/webhook/order`  
3. Server generates ticket + QR  
4. Client receives ticket response  
5. Ticket verified via `/verify/:ticketId`  

---

## Endpoints

### POST /webhook/order

**Payload:**
```json
{
  "orderId": "123",
  "items": [{ "name": "Event Ticket", "quantity": 1 }],
  "customer": { "email": "user@example.com" }
}
Response:
{
  "success": true,

  "ticketId": "uuid",
  "qrCode": "QR-uuid"
}
GET /verify/:ticketId

Returns:
{
  "valid": true,
  "ticketId": "uuid"
}
Run Locally:
npm install
npm start

Server runs on:

http://localhost:3000
