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

Why This Exists

Modern event systems need:

fraud-resistant tickets
real-time issuance
POS integration
fast verification

This repo shows the core interaction layer.

About DoorPass Pro

DoorPass Pro is a ticketing infrastructure system designed for:

venues
event operators
POS integrations
developers building event platforms

This example is a simplified version of that architecture.

Notes
No database
No authentication
Mock QR generation
Demo only
License

MIT


---

# 🔧 NEXT: QUICK ALIGNMENT FOR OTHER 2 REPOS

You don’t need full rewrites—just tighten positioning.

---

## 1. `lto-pwa-starter-kit`

Add at bottom of README:

```md
## Part of LTO Repo Factory

This repository is part of the LTO standardized build system.

Learn more:
https://github.com/ruffine41/LTO-Repo-Factory
