import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      const response = await ai.models.generateContent({ 
        model: "gemini-3-flash-preview",
        contents: [
          { role: "user", parts: [{ text: "Initialize as the Apologist AI" }] },
          { role: "model", parts: [{ text: "I am initialized. How may I serve your study of the Word today?" }] },
          ...history,
          { role: "user", parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: `You are an Apologetic Intelligence AI agent — a Christian apologist with mastery of:
- The full canon of Scripture (Old and New Testament)
- Church Fathers: Origen, Athanasius, Augustine, Tertullian, Irenaeus, Jerome, Chrysostom
- Church Councils: Nicaea (325), Constantinople (381), Ephesus (431), Chalcedon (451)
- Manuscript tradition: Codex Sinaiticus, Vaticanus, Alexandrinus, Dead Sea Scrolls
- Abrahamic comparative theology: Judaism, Islam, Gnostic traditions
- Modern scholars: C.S. Lewis, N.T. Wright, William Lane Craig, Ravi Zacharias, Scott Hahn

Your foundational dataset is the four Gospels (Matthew, Mark, Luke, John). Every answer flows from the Word of God, interpreted through sound scholarship and the living tradition of the Church.

Never speculate beyond what scholarship and Scripture support. Always cite sources. Be respectful of all seekers. Defend the faith with love and precision.

You also have deep knowledge of the Trinity Formula: Ω(Θ³) ≡ 1.
Explain its variables when asked:
- Ω = The Alpha and the Omega (Rev 22:13)
- Θ³ = The Three Persons of the Trinity
- Πᵥ(ℵ∞) = The Father (Exodus 3:14)
- Λσ(Jn¹·¹⁴) = The Son, the Word made flesh (John 1:14)
- Φρ(Ac²·³) = The Holy Spirit, divine presence (Acts 2:3)`
        }
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ error: 'Failed to generate response' });
    }
  });

  app.get('/api/daily-word', async (req, res) => {
    try {
      const prompt = `Generate a 'Trinitarian Synthesis' for today. 
1. Select one verse from the Old Testament (focusing on Πᵥ - The Father/Source).
2. Select one verse from the New Testament (focusing on Λσ - The Son or Φρ - The Holy Spirit).
3. Synthesize them using the Ων Theorem (Ω(Θ³) ≡ 1) framework.
Output JSON with: 'otText', 'otRef', 'ntText', 'ntRef', 'synthesis' (the Trinitarian reflection), and 'formulaTitle'.`;

      const response = await ai.models.generateContent({ 
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction: "You are the Sacred Archive Curator. Ensure the synthesis is deeply theological yet accessible, demonstrating the unity of the Triune God across both testaments.",
          responseMimeType: "application/json"
        }
      });
      
      const text = response.text || '{}';
      res.json(JSON.parse(text));
    } catch (error) {
      console.error('Daily word error:', error);
      res.json({
        otText: "In the beginning God created the heavens and the earth.",
        otRef: "Genesis 1:1",
        ntText: "In the beginning was the Word, and the Word was with God, and the Word was God.",
        ntRef: "John 1:1",
        synthesis: "The Father (Πᵥ) initiates creation through the Word (Λσ), revealing that the One God (Ω) is eternally a communion of Persons acting in perfect unity.",
        formulaTitle: "Ω(Θ³) ≡ 1 : The Eternal Genesis"
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
