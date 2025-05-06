import OpenAI from 'openai';
import { storyTemplates } from '../data/storyTemplates';

interface StorySegment {
  id: string;
  text: string;
  choices?: {
    id: string;
    text: string;
  }[];
  background?: string;
  role?: 'user' | 'assistant';
}

const openai = new OpenAI({
  apiKey: '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',
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'https://thegioimotan.vn',
    'X-Title': 'Thế Giới Vô Tận'
  }
});

const systemPrompt = `Bạn là một người kể chuyện tương tác cho ứng dụng "Thế Giới Vô Tận". 
Nhiệm vụ của bạn là tạo ra những câu chuyện hấp dẫn, sống động và phù hợp với văn hóa Việt Nam.

Khi tạo nội dung:
- Viết bằng tiếng Việt
- Tạo ra 2-3 lựa chọn cho người dùng sau mỗi đoạn
- Đảm bảo câu chuyện mạch lạc và hợp lý
- Tập trung vào yếu tố văn hóa và bối cảnh Việt Nam
- Giữ giọng văn phù hợp với thể loại của câu chuyện

Luôn trả về nội dung theo định dạng JSON:
{
  "text": "Nội dung câu chuyện...",
  "choices": [
    {"id": "choice-1", "text": "Lựa chọn 1"},
    {"id": "choice-2", "text": "Lựa chọn 2"},
    {"id": "choice-3", "text": "Lựa chọn 3"}
  ]
}`;

export const generateStorySegment = async (
  userInput: string,
  currentStory: StorySegment[]
): Promise<StorySegment> => {
  try {
    // Build the conversation history
    const messages = [
      { role: 'system', content: systemPrompt },
      ...currentStory.map(segment => ({
        role: segment.role === 'user' ? 'user' : 'assistant',
        content: segment.text
      })),
      { role: 'user', content: userInput }
    ];

    // Make the API call
    const completion = await openai.chat.completions.create({
      messages,
      model: 'mistralai/mistral-7b-instruct',
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: 'json_object' }
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenRouter');
    }

    const parsed = JSON.parse(response);
    
    // Determine background based on story context
    let background = undefined;
    if (currentStory.length > 0) {
      const lastSegment = currentStory[currentStory.length - 1];
      if (lastSegment.id.startsWith('kd-')) {
        background = 'bg-fantasy-bg';
      } else if (lastSegment.id.startsWith('vn-')) {
        background = 'bg-history-bg';
      } else if (lastSegment.id.startsWith('na-')) {
        background = 'bg-adventure-bg';
      } else if (lastSegment.id.startsWith('hn-')) {
        background = 'bg-history-bg';
      } else if (lastSegment.id.startsWith('mk-')) {
        background = 'bg-adventure-bg';
      }
    }

    return {
      id: `response-${Date.now()}`,
      text: parsed.text,
      choices: parsed.choices,
      background,
      role: 'assistant'
    };
  } catch (error) {
    console.error('Error generating story segment:', error);
    
    // Fallback response in case of error
    return {
      id: `response-${Date.now()}`,
      text: 'Xin lỗi, đã có lỗi xảy ra trong quá trình tạo câu chuyện. Vui lòng thử lại sau.',
      choices: [
        { id: 'retry', text: 'Thử lại' },
        { id: 'new', text: 'Bắt đầu câu chuyện mới' }
      ],
      role: 'assistant'
    };
  }
};