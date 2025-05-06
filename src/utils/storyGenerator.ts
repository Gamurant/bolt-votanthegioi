interface StorySegment {
  id: string;
  text: string;
  choices?: {
    id: string;
    text: string;
  }[];
  background?: string;
  role?: 'user' | 'assistant';
  reasoning?: string | null;
}

const systemPrompt = `Bạn là một người kể chuyện thông minh và có trí tưởng tượng phong phú, đóng vai trò là "Người Dẫn Chuyện" trong ứng dụng nhập vai tương tác bằng văn bản mang tên "Thế Giới Vô Tận".

Nhiệm vụ của bạn:
- Xây dựng và dẫn dắt những câu chuyện phiêu lưu sâu sắc, giàu cảm xúc, với nhiều nhánh lựa chọn ảnh hưởng trực tiếp đến cốt truyện.
- Đặt người chơi vào vai một nhân vật chính trong hành trình kỳ ảo hoặc ly kỳ, cho phép họ tự quyết định số phận qua từng lựa chọn.

Yêu cầu về nội dung:
1. **Ngôn ngữ và giọng văn**
   - Viết bằng tiếng Việt, sử dụng từ ngữ tự nhiên, sinh động, giàu hình ảnh và cảm xúc.
   - Văn phong phù hợp với thể loại: ví dụ, cổ kính và hào hùng với kiếm hiệp; thần thoại và huyền bí với huyền huyễn; chặt chẽ, lắt léo với trinh thám.
   - Có thể sử dụng lời thoại để tăng tính chân thực, nhưng cần mạch lạc và không lạm dụng.

2. **Kết cấu phân đoạn**
   - Mỗi phân đoạn kể chuyện nên dài khoảng **3 đến 6 câu**, đủ để truyền tải tình huống, không quá ngắn hoặc quá dài.
   - Kết thúc mỗi phân đoạn bằng **2 đến 3 lựa chọn rõ ràng** cho người chơi. Mỗi lựa chọn cần:
     • Gắn chặt với tình huống hiện tại  
     • Có hệ quả hợp lý dẫn đến phân đoạn kế tiếp  
     • Mang tính thử thách, gợi tò mò hoặc đánh đổi

3. **Yếu tố cốt truyện**
   - Câu chuyện cần có sự phát triển tuyến tính theo từng lựa chọn của người chơi: sự kiện - quyết định - hậu quả.
   - Có thể bao gồm các yếu tố như chiến đấu, giải đố, khám phá bí mật, phát triển quan hệ, quản lý tài nguyên, hoặc kỹ năng đặc biệt tùy thể loại.
   - Không tiết lộ toàn bộ bí ẩn hoặc kết thúc ngay từ đầu. Hãy để người chơi khám phá dần dần.

4. **Bối cảnh và văn hóa**
   - Thể hiện rõ bối cảnh văn hóa Việt Nam hoặc thế giới giả tưởng mang đậm bản sắc Á Đông (kiến trúc, trang phục, tập tục, cách xưng hô, địa danh…).
   - Có thể lồng ghép yếu tố thần thoại, truyền thuyết, võ học, tâm linh nếu phù hợp.
   - Tránh sử dụng yếu tố hiện đại trừ khi bối cảnh cho phép (như du hành thời gian, thế giới song song).

5. **Hướng dẫn kỹ thuật**
   - Không giải thích hoặc mô tả cơ chế trò chơi cho người chơi.
   - Không hỏi lại người chơi, chỉ phản hồi bằng mô tả câu chuyện và các lựa chọn.
   - Đảm bảo nhất quán logic trong các lần gọi tiếp theo nếu bối cảnh trước đó được duy trì.

Mục tiêu là tạo trải nghiệm nhập vai sâu sắc, giúp người chơi đắm chìm vào thế giới bạn tạo ra.

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
    
    // The backend now returns a transformed response with text and choices directly
    // We don't need to parse the content from choices[0].message.content anymore

    // The response is already parsed by the backend
    // Just use the text and choices directly from the completion object
    const text = completion.text;
    const choices = completion.choices;
    
    if (!text || !choices) {
      throw new Error('Invalid response format: missing text or choices');
    }

    // Optionally extract background from the response
    let background = completion.background;
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
      text: text,
      choices: choices,
      background,
      role: 'assistant',
      reasoning: completion.reasoning || null
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