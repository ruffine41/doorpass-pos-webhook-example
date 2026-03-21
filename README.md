# DoorPass POS Webhook Example

Webhook-driven ticket generation powered by DoorPass Pro infrastructure.

## Overview

This project demonstrates how a point-of-sale (POS) system can automatically generate event tickets after a purchase using a webhook-based architecture.

> This is a simplified example inspired by DoorPass Pro infrastructure.

## Flow

POS → Webhook → Ticket Generator → QR → Verification

## Features

- Express webhook listener
- Ticket ID generation with UUID
- QR code creation
- Mock verification endpoint

## Setup

```bash
npm install
node server.js

## Endpoints

POST /webhook/order

Accepts a POS order payload and returns generated ticket data.

GET /verify/:ticketId

Returns a mock verification response for a ticket.

Example Payload

See examples/sample-payload.json
