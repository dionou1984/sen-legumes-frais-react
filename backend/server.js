require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

app.get("/", (req, res) => {
  res.send("🟢 Backend SEN LÉGUMES en ligne");
});

app.post("/api/send-message", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await client.messages.create({
      body: `📦 Commande de ${name} (${email}):\n${message}`,
      from: `whatsapp:${process.env.TWILIO_PHONE}`,
      to: `whatsapp:${process.env.WHATSAPP_TO}`
    });
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Twilio error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend SEN LÉGUMES running on port ${PORT}`);
});
