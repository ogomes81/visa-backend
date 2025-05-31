import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import OpenAI from 'openai';

const app = express();
app.use(cors());
app.use(cors({ origin: '*' }));
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/chat', async (req, res) => {
  console.log("Received request:", req.body);
  const { nationality, destination, purpose } = req.body;
  const prompt = `A ${nationality} citizen wants to travel to ${destination} for ${purpose}. What visa do they need and what documents are required?`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
