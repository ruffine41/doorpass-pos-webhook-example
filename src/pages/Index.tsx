import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CheckCircle2, QrCode, Send, ShieldCheck, Terminal, Ticket } from "lucide-react";

const SAMPLE_PAYLOAD = {
  orderId: "ORD-20260320-001",
  eventName: "DevConf 2026 — General Admission",
  customer: { name: "Mariana Alvarez", email: "mariana@example.com" },
  items: [{ name: "General Admission Ticket", quantity: 1, price: 75.0 }],
  total: 75.0,
  currency: "USD",
  posTerminal: "T-04",
  timestamp: new Date().toISOString(),
};

function generateQRUrl(text: string): string {
  const encoded = encodeURIComponent(text);
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}`;
}

interface TicketResult {
  ticketId: string;
  qrCode: string;
  eventName: string;
  createdAt: string;
}

type Step = "idle" | "sending" | "generated" | "verifying" | "verified";

const Index = () => {
  const [step, setStep] = useState<Step>("idle");
  const [ticket, setTicket] = useState<TicketResult | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.2 }
    );
    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const handleSendWebhook = async () => {
    setStep("sending");
    await new Promise((r) => setTimeout(r, 1200));
    const ticketId = uuidv4();
    setTicket({
      ticketId,
      qrCode: generateQRUrl(ticketId),
      eventName: SAMPLE_PAYLOAD.eventName,
      createdAt: new Date().toISOString(),
    });
    setStep("generated");
  };

  const handleVerify = async () => {
    if (!ticket) return;
    setStep("verifying");
    await new Promise((r) => setTimeout(r, 800));
    setStep("verified");
  };

  const handleReset = () => {
    setStep("idle");
    setTicket(null);
  };

  const setSectionRef = (index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <header
        className={`relative border-b border-border transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
          <Badge variant="secondary" className="mb-4 font-mono text-xs tracking-wider uppercase">
            Open-Source Demo
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl" style={{ lineHeight: 1.08 }}>
            doorpass-pos-webhook-example
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground" style={{ textWrap: "pretty" }}>
            Webhook-driven ticket generation for event systems. Send a POS order, get a QR-coded ticket back instantly.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={handleSendWebhook} disabled={step !== "idle"} className="active:scale-[0.97] transition-transform">
              <Send className="mr-2 h-4 w-4" />
              Send Webhook
            </Button>
            <Button size="lg" variant="outline" asChild className="active:scale-[0.97] transition-transform">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Flow Diagram */}
      <section ref={setSectionRef(0)} className="scroll-section mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">
          System Flow
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { icon: Terminal, label: "POS Terminal", desc: "Sends order payload" },
            { icon: Send, label: "Webhook", desc: "POST /webhook/order" },
            { icon: QrCode, label: "Ticket Gen", desc: "UUID + QR code" },
            { icon: ShieldCheck, label: "Verify", desc: "GET /verify/:id" },
          ].map((item, i) => (
            <div key={i} className="relative">
              <Card className="border border-border bg-card hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-5 text-center">
                  <item.icon className="mx-auto h-7 w-7 text-primary mb-3" />
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </CardContent>
              </Card>
              {i < 3 && (
                <ArrowRight className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 z-10" />
              )}
            </div>
          ))}
        </div>
      </section>

      <Separator className="mx-auto max-w-4xl" />

      {/* Interactive Demo */}
      <section ref={setSectionRef(1)} className="scroll-section mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">
          Interactive Demo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Terminal className="h-4 w-4" /> Request Payload
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="rounded-lg bg-muted p-4 text-xs font-mono overflow-auto max-h-64 text-muted-foreground">
                {JSON.stringify(SAMPLE_PAYLOAD, null, 2)}
              </pre>
              <p className="mt-3 text-xs text-muted-foreground">POST /webhook/order</p>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Ticket className="h-4 w-4" /> Response
              </CardTitle>
            </CardHeader>
            <CardContent>
              {step === "idle" && (
                <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
                  Click "Send Webhook" to generate a ticket
                </div>
              )}
              {step === "sending" && (
                <div className="flex flex-col items-center justify-center h-48 gap-3">
                  <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  <span className="text-sm text-muted-foreground">Processing order…</span>
                </div>
              )}
              {(step === "generated" || step === "verifying" || step === "verified") && ticket && (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <img src={ticket.qrCode} alt={`QR code for ticket ${ticket.ticketId}`} className="h-36 w-36 rounded-lg border border-border" />
                  </div>
                  <div className="space-y-1 text-xs font-mono">
                    <p><span className="text-muted-foreground">ticketId:</span> {ticket.ticketId.slice(0, 18)}…</p>
                    <p><span className="text-muted-foreground">event:</span> {ticket.eventName}</p>
                    <p><span className="text-muted-foreground">created:</span> {new Date(ticket.createdAt).toLocaleTimeString()}</p>
                  </div>
                  {step === "generated" && (
                    <Button size="sm" variant="outline" onClick={handleVerify} className="w-full active:scale-[0.97] transition-transform">
                      <ShieldCheck className="mr-2 h-3.5 w-3.5" /> Verify Ticket
                    </Button>
                  )}
                  {step === "verifying" && (
                    <div className="flex items-center justify-center gap-2 py-2">
                      <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                      <span className="text-xs text-muted-foreground">Verifying…</span>
                    </div>
                  )}
                  {step === "verified" && (
                    <div className="flex items-center gap-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <div className="text-xs">
                        <p className="font-medium text-emerald-800 dark:text-emerald-300">Valid ticket</p>
                        <p className="text-emerald-600 dark:text-emerald-500">Mock verification success</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {step === "verified" && (
                <Button size="sm" variant="ghost" onClick={handleReset} className="w-full mt-3 text-muted-foreground active:scale-[0.97] transition-transform">
                  Reset Demo
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="mx-auto max-w-4xl" />

      {/* Endpoints Reference */}
      <section ref={setSectionRef(2)} className="scroll-section mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">
          API Endpoints
        </h2>
        <div className="space-y-4">
          <Card className="border border-border">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 font-mono text-xs">POST</Badge>
                <code className="text-sm font-mono">/webhook/order</code>
              </div>
              <p className="text-sm text-muted-foreground">
                Accepts a POS order JSON payload. Returns a generated ticket with UUID and base64 QR code.
              </p>
            </CardContent>
          </Card>
          <Card className="border border-border">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 font-mono text-xs">GET</Badge>
                <code className="text-sm font-mono">/verify/:ticketId</code>
              </div>
              <p className="text-sm text-muted-foreground">
                Returns mock verification response for a given ticket ID.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-4xl px-6 py-12 text-center">
          <p className="text-sm text-muted-foreground mb-1">
            This is a simplified example inspired by DoorPass Pro infrastructure.
          </p>
          <p className="text-base font-semibold">
            Upgrade to{" "}
            <a href="https://doorpass.pro" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
              DoorPass Pro
            </a>{" "}
            for full ticketing infrastructure.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
