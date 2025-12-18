import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "euryst backend alive" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Euryst backend running on port", PORT);
});
app.post("/webhook/whatsapp", async (req, res) => {
  console.log("📩 WhatsApp webhook ricevuto");
  console.log(JSON.stringify(req.body, null, 2));

  // Per ora: rispondiamo sempre OK
  res.sendStatus(200);
});
