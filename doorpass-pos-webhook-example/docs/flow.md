# System Flow

## Webhook-Driven Ticket Generation

```
┌─────────┐     POST /webhook/order     ┌──────────────┐
│   POS   │ ──────────────────────────►  │   Express    │
│ Terminal │    (order JSON payload)      │   Server     │
└─────────┘                              └──────┬───────┘
                                                │
                                                ▼
                                       ┌────────────────┐
                                       │  generateTicket │
                                       │  • UUID v4      │
                                       │  • QR Code      │
                                       └────────┬───────┘
                                                │
                                                ▼
                                       ┌────────────────┐
                                       │   Response      │
                                       │  • ticketId     │
                                       │  • qrCode (b64) │
                                       │  • orderData    │
                                       └────────────────┘
```

## Verification Flow

```
┌──────────┐    GET /verify/:ticketId    ┌──────────────┐
│  Scanner  │ ────────────────────────►  │   Express    │
│  / Staff  │                            │   Server     │
└──────────┘                             └──────┬───────┘
                                                │
                                                ▼
                                        ┌───────────────┐
                                        │  { valid: true,│
                                        │    ticketId,   │
                                        │    message }   │
                                        └───────────────┘
```

## Summary

1. **POS terminal** sends order data to the webhook endpoint
2. **Server** generates a unique ticket ID and QR code
3. **Response** returns the ticket with QR for printing or display
4. **Verification** endpoint allows staff to validate tickets at the door

---

*This is a simplified demo. In production, DoorPass Pro handles persistence, authentication, real-time sync, and multi-venue management.*
