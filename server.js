import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// POST /api/generate-story
app.post('/api/generate-story', async (req, res) => {
  const { messages, model } = req.body;
  console.log('Loaded API Key:', process.env.OPENAI_API_KEY);
  const apiKey = process.env.OPENAI_API_KEY;
  try {
    // Append strict instruction to last user message
    const strictInstruction = "Chỉ trả về đoạn truyện cuối cùng. Không giải thích, không lập kế hoạch, không trả lời bằng tiếng Anh.";
    let modifiedMessages = messages;
    if (Array.isArray(messages) && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      modifiedMessages = [
        ...messages.slice(0, -1),
        { ...lastMsg, content: lastMsg.content + "\n" + strictInstruction }
      ];
    }
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://thegioivotan.vn',
        'X-Title': 'The Gioi Vo Tan',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1:free',
        messages: modifiedMessages,
      }),
    });

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      const raw = await response.text();
      console.error('OpenRouter API returned non-JSON:', raw);
      return res.status(502).json({ error: 'Invalid response from OpenRouter', raw });
    }
    if (!response.ok) {
      console.error('OpenRouter API error:', data);
      return res.status(response.status).json({ error: data });
    }
    // Log raw OpenRouter response
    console.log('OpenRouter API raw response:', JSON.stringify(data, null, 2));
    // Transform to frontend format
    const messageContent = data.choices?.[0]?.message?.content || '';
    let parsedContent = {};
    let text = messageContent;
    let choices = [];
    
    try {
      // Remove markdown code block if present
      let cleaned = messageContent.trim();
      if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```[a-zA-Z]*\n?/, '').replace(/```$/, '').trim();
      }
      
      // Parse the JSON content from the message
      parsedContent = JSON.parse(cleaned);
      
      if (typeof parsedContent === 'object' && parsedContent !== null) {
        text = parsedContent.text || messageContent;
        choices = Array.isArray(parsedContent.choices) ? parsedContent.choices : [];
      }
    } catch (e) {
      // If parsing fails, fallback to raw text and empty choices
      console.warn('Failed to parse message.content as JSON:', e);
    }
    
    // Create the frontend response object
    const frontendResponse = {
      id: data.id,
      text,
      choices,
      role: data.choices?.[0]?.message?.role || 'assistant',
      // Include reasoning if available (for debugging)
      reasoning: data.choices?.[0]?.message?.reasoning || null
    };
    console.log('Transformed response to frontend:', frontendResponse);
    res.json(frontendResponse);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate story segment.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
