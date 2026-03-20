# doorpass-pos-webhook-example

A simplified webhook-driven ticket generation system inspired by **DoorPass Pro** infrastructure. This project demonstrates how a POS terminal can trigger ticket creation via a webhook, generating unique IDs and QR codes on the fly.

---

## How It Works

1. A **POS system** sends an order payload to `POST /webhook/order`
2. The server generates a **UUID ticket ID** and a **QR code** (base64)
3. The response includes the complete ticket object
4. Staff can verify tickets via `GET /verify/:ticketId`

---

## Quick Start

```bash
git clone https://github.com/your-org/doorpass-pos-webhook-example.git
cd doorpass-pos-webhook-example
npm install
npm start
```

The server starts on `http://localhost:3001` by default.

---

## Endpoints

### `POST /webhook/order`

Accepts a POS order payload and returns a generated ticket.

**Request:**
```json
{
  "orderId": "ORD-20260320-001",
  "eventName": "DevConf 2026 — General Admission",
  "customer": {
    "name": "Mariana Alvarez",
    "email": "mariana@example.com"
  },
  "items": [
    { "name": "General Admission Ticket", "quantity": 1, "price": 75.00 }
  ],
  "total": 75.00,
  "currency": "USD",
  "posTerminal": "T-04",
  "timestamp": "2026-03-20T14:30:00Z"
}
```

**Response (201):**
```json
{
  "success": true,
  "ticket": {
    "ticketId": "a1b2c3d4-...",
    "qrCode": "data:image/png;base64,...",
    "eventName": "DevConf 2026 — General Admission",
    "createdAt": "2026-03-20T14:30:05Z"
  },
  "originalOrder": { ... }
}
```

### `GET /verify/:ticketId`

Returns mock verification for a given ticket.

**Response:**
```json
{
  "ticketId": "a1b2c3d4-...",
  "valid": true,
  "message": "Mock verification success"
}
```

---

## Project Structure

```
doorpass-pos-webhook-example/
├── server.js               # Express entry point
├── package.json
├── .env.example
├── routes/
│   ├── webhook.js          # POST /webhook/order
│   └── verify.js           # GET /verify/:ticketId
├── utils/
│   ├── generateTicket.js   # UUID + ticket object
│   └── qr.js               # QR code generation
├── examples/
│   └── sample-payload.json # Test payload
└── docs/
    └── flow.md             # System flow diagram
```

---

## Example Payload

See [`examples/sample-payload.json`](examples/sample-payload.json) for a complete test payload.

```bash
curl -X POST http://localhost:3001/webhook/order \
  -H "Content-Type: application/json" \
  -d @examples/sample-payload.json
```

---

## About

This is a **simplified example** inspired by DoorPass Pro infrastructure. It demonstrates the core webhook-to-ticket flow without authentication, persistence, or multi-venue support.

In production, **DoorPass Pro** provides:

- 🔐 Authenticated webhook endpoints with HMAC signing
- 🗄️ Persistent ticket storage with real-time sync
- 📱 Mobile scanning and verification
- 🏟️ Multi-venue and multi-event management
- 📊 Analytics and reporting dashboard

---

> **Upgrade to [DoorPass Pro](https://doorpass.pro) for full ticketing infrastructure.**

---

## License

MIT
