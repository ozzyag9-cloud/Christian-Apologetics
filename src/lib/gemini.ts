export async function getApologistResponse(userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, history })
    });
    
    if (!response.ok) throw new Error('API request failed');
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error('Error fetching chat response:', error);
    throw error;
  }
}

export async function getDailyWord() {
  try {
    const response = await fetch('/api/daily-word');
    if (!response.ok) throw new Error('API request failed');
    return await response.json();
  } catch (error) {
    console.error('Error fetching daily word:', error);
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
