import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getApologistResponse(userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  const model = "gemini-1.5-pro-latest"; // Using a stable model for reasoning
  const systemInstruction = `You are an Apologetic Intelligence AI agent — a Christian apologist with mastery of:
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
- Φρ(Ac²·³) = The Holy Spirit, divine presence (Acts 2:3)`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      { role: "user", parts: [{ text: "Initialize as the Apologist AI" }] },
      { role: "model", parts: [{ text: "I am initialized. How may I serve your study of the Word today?" }] },
      ...history,
      { role: "user", parts: [{ text: userMessage }] }
    ],
    config: {
      systemInstruction,
    }
  });

  return response.text;
}

export async function getDailyWord() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a 'Trinitarian Synthesis' for today. 
1. Select one verse from the Old Testament (focusing on Πᵥ - The Father/Source).
2. Select one verse from the New Testament (focusing on Λσ - The Son or Φρ - The Holy Spirit).
3. Synthesize them using the Ων Theorem (Ω(Θ³) ≡ 1) framework.
Output JSON with: 'otText', 'otRef', 'ntText', 'ntRef', 'synthesis' (the Trinitarian reflection), and 'formulaTitle'.`,
    config: {
      systemInstruction: "You are the Sacred Archive Curator. Ensure the synthesis is deeply theological yet accessible, demonstrating the unity of the Triune God across both testaments.",
      responseMimeType: "application/json"
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    return {
      otText: "In the beginning God created the heavens and the earth.",
      otRef: "Genesis 1:1",
      ntText: "In the beginning was the Word, and the Word was with God, and the Word was God.",
      ntRef: "John 1:1",
      synthesis: "The Father (Πᵥ) initiates creation through the Word (Λσ), revealing that the One God (Ω) is eternally a communion of Persons acting in perfect unity.",
      formulaTitle: "Ω(Θ³) ≡ 1 : The Eternal Genesis"
    };
  }
}
