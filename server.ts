import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini if key is provided, set required custom User-Agent headers
let aiClient: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('Gemini client initialized successfully server-side.');
  } catch (e) {
    console.error('Error initializing Gemini client:', e);
  }
} else {
  console.log('No valid GEMINI_API_KEY found. Operating in custom fallback mode.');
}

// REST endpoint for DM simulations
app.post('/api/chat', async (req, res) => {
  const { messages, selectedProject } = req.body;
  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ error: 'Messages array is required' });
    return;
  }

  const userMessage = messages[messages.length - 1]?.text || 'Hello!';

  // Fallback preset responses if Gemini is not available
  const getFallbackReply = (msg: string, project: string) => {
    const text = msg.toLowerCase();
    if (project === 'web') {
      return "That sounds like a great web project! We build fast, modern websites with custom design systems. Let us know if you want to include custom features like an ordering menu or payment proxy! What industry is your business in?";
    }
    if (project === 'invite') {
      return "We would love to design an invitation suite for you! We handle wedding invites, birthdays, and anniversaries — with both offline print-ready PDFs and elegant animated RSVP web pages. What theme are you thinking of?";
    }
    if (project === 'fitness') {
      return "Let's crush that fitness program! We design customized challenges, custom workout plans, and branded nutrition pages that look sleek and keep your community accountable. Are you looking for a personal dashboard or group launch material?";
    }
    if (project === 'project') {
      return "We've got you covered on final-year IEEE and research projects! From Deep Learning traffic flow detection to custom Full Stack systems, we provide documented reports, readable code files, and video viva support. When is your final submission deadline?";
    }
    if (text.includes('price') || text.includes('cost') || text.includes('how much')) {
      return "Pricing depends entirely on scope! For example, custom animated invitations start at $49, while full high-speed business sites range between $350-$800. DMs on Instagram are the absolute fastest way to get an exact custom quote!";
    }
    return "Hey there! Thanks for reaching out. We are NexYuva, a creative + tech studio specializing in high-speed premium builds. Tell us more about what you have in mind — whether it is a website, a custom invite suite, a marketing poster, or an IEEE project!";
  };

  if (!aiClient) {
    // Return mock response quickly
    setTimeout(() => {
      res.json({ text: getFallbackReply(userMessage, selectedProject || 'all') });
    }, 800);
    return;
  }

  try {
    const systemPrompt = `You are a warm, stylish, and highly professional representative of "NexYuva", an elite creative & tech studio. 
NexYuva builds gorgeous, super-fast websites, custom animated invitation cards, brand identity posters, fitness challenge kits, and guides academic students in shipping final-year IEEE/technical projects with code, reports, and viva preparation.
Respond to the user as if you are sending a direct message (DM) on Instagram. 
- Keep the response ultra-sleek, stylish, concise, and scannable.
- Avoid formal corporate jargon; sound energetic, premium, creative, and confident.
- Do NOT use bulleted lists or dashes for list items. Instead, use standard paragraphs or short sentences separated by line breaks.
- If they ask about a specific project scope (e.g. websites, invites, or student projects), give them a confident, exciting description of what NexYuva can build for them.
- Direct them towards sending a formal DM or sharing their email, explaining that NexYuva turns concepts into polished products at high speed.
- The user is inquiring about: ${selectedProject || 'General Studio Services'}.`;

    const chatInput = [
      { text: systemPrompt },
      ...messages.map((m: any) => ({
        text: `${m.sender === 'user' ? 'User' : 'NexYuva'}: ${m.text}`,
      })),
      { text: `User: ${userMessage}` },
    ];

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: chatInput.map(item => item.text).join('\n'),
    });

    const replyText = response.text || "That sounds fascinating! Let's build it together. Hit us up on Instagram DM so we can chat further!";
    res.json({ text: replyText });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.json({ text: getFallbackReply(userMessage, selectedProject || 'all') });
  }
});

async function startServer() {
  // Vite dev middleware for Hot Module Replacement in dev environment
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve built static assets from dist
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NexYuva server running at http://localhost:${PORT}`);
  });
}

startServer();
