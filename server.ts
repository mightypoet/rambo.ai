import express from 'express';
import path from 'path';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // --- API Routes ---

  app.post('/api/generate-copy', async (req, res) => {
    try {
      const { prompt, geminiKey, brandContext } = req.body;
      if (!geminiKey) {
        return res.status(401).json({ error: 'Gemini API Key is required' });
      }

      const ai = new GoogleGenAI({ apiKey: geminiKey });

      const systemPrompt = `You are a world-class digital marketing strategist, copywriter, media buyer, and creative director.
      
Generate:
- Ad headline
- Primary ad copy
- Social caption
- CTA
- Hashtags
- Creative concept
- Detailed image prompt

Brand Context:
${brandContext || 'None provided'}

Output strictly in structured JSON matching this format:
{
  "headline": "string",
  "body_copy": "string",
  "social_caption": "string",
  "cta": "string",
  "hashtags": "string",
  "creative_concept": "string",
  "image_prompt": "string",
  "strategy_notes": "string"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
        }
      });

      if (!response.text) {
        throw new Error("No response from Gemini");
      }

      const result = JSON.parse(response.text);
      res.json(result);
    } catch (error: any) {
      console.error('Gemini Error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate copy' });
    }
  });

  app.post('/api/generate-image', async (req, res) => {
    try {
      const { prompt, hfKey } = req.body;
      if (!hfKey) {
        return res.status(401).json({ error: 'Hugging Face API Key is required' });
      }

      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          headers: {
            Authorization: `Bearer ${hfKey}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs: prompt }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HF API Error: ${response.status} ${errorText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = buffer.toString('base64');
      
      res.json({ imageUrl: `data:image/jpeg;base64,${base64Image}` });
    } catch (error: any) {
      console.error('HF Error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate image' });
    }
  });

  app.post('/api/publish-post', async (req, res) => {
    try {
      // Mock publish endpoint for prototype
      const { platform, imageUrl, caption } = req.body;
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      res.json({ success: true, message: `Successfully published to ${platform}` });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // --- Vite Middleware for Development ---
  if (process.env.NODE_ENV !== 'production') {
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
