import express from "express";

const app = express();
app.use(express.json());

// Healthcheck
app.get("/", (req, res) => {
  res.json({ status: "euryst backend alive" });
});

// WhatsApp webhook - GET (Meta verification)
app.get("/webhook/whatsapp", (req, res) => {
  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "euryst_verify";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log("🔎 verify attempt:", { mode, token, expected: VERIFY_TOKEN });

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verificato da Meta");
    return res.status(200).send(challenge);
  }

  console.log("❌ Verifica webhook fallita");
  return res.sendStatus(403);
});

// WhatsApp webhook - POST (messages)
app.post("/webhook/whatsapp", async (req, res) => {
  console.log("📩 WhatsApp webhook ricevuto");
  console.log(JSON.stringify(req.body, null, 2));

  // Per ora: rispondiamo sempre OK
  return res.sendStatus(200);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Euryst backend running on port", PORT);
});
