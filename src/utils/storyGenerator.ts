

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

    // Call backend API
    const res = await fetch('http://localhost:3001/api/generate-story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, model: 'mistralai/mistral-7b-instruct' }),
    });
    if (!res.ok) throw new Error('Failed to generate story segment');
    const completion = await res.json();
    const response = completion.choices?.[0]?.message?.content;

    // Parse the response (expecting JSON)
    let parsed;
    try {
      parsed = JSON.parse(response);
    } catch (e) {
      // If the response is an error object from backend, show its message
      if (typeof response === 'object' && response && response.error) {
        throw new Error(response.error.message || JSON.stringify(response.error));
      }
      throw new Error('Invalid response format');
    }

    // Optionally extract background from the response
    let background = parsed.background;
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
    // Use type guards to safely access error properties
    if (typeof error === 'object' && error !== null && 'response' in error) {

      console.error('Backend error response:', error.response);
    }

    // Fallback response in case of error
    let errorMsg = 'Xin lỗi, đã có lỗi xảy ra trong quá trình tạo câu chuyện. Vui lòng thử lại sau.';
    if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string') {
      errorMsg = `Xin lỗi, đã có lỗi: ${(error as any).message}`;
    }
    return {
      id: `response-${Date.now()}`,
      text: errorMsg,
      choices: [
        { id: 'retry', text: 'Thử lại' },
        { id: 'new', text: 'Bắt đầu câu chuyện mới' }
      ],
      role: 'assistant'
    };
  }
};