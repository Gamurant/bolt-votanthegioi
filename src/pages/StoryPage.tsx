import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, ArrowLeft, BookOpen, Home, Save, Sparkles } from 'lucide-react';
import { storyTemplates } from '../data/storyTemplates';
import { generateStorySegment } from '../utils/storyGenerator';

interface StorySegment {
  id: string;
  text: string;
  choices?: {
    id: string;
    text: string;
  }[];
  background?: string;
}

const StoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [story, setStory] = useState<StorySegment[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isNewStory, setIsNewStory] = useState(id === 'new');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [currentBackground, setCurrentBackground] = useState('bg-fantasy-bg');
  const storyContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id === 'new') {
      setIsNewStory(true);
      return;
    }

    // If not a new story, find the template
    const template = storyTemplates.find((t) => t.id === id);
    if (template) {
      setIsNewStory(false);
      setSelectedTemplate(template.id);
      setCurrentBackground(template.backgroundClass || 'bg-fantasy-bg');
      
      // Initialize with the first segment of the selected template
      const initialSegment: StorySegment = {
        id: '1',
        text: template.initialText,
        choices: template.initialChoices,
        background: template.backgroundClass,
      };
      
      setStory([initialSegment]);
    } else {
      // If no template found, redirect to new story page
      navigate('/story/new');
    }
  }, [id, navigate]);

  useEffect(() => {
    // Scroll to bottom when story updates
    if (storyContainerRef.current && !isNewStory) {
      storyContainerRef.current.scrollTop = storyContainerRef.current.scrollHeight;
    }
  }, [story, isNewStory]);

  const handleTemplateSelect = (templateId: string) => {
    const template = storyTemplates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setCurrentBackground(template.backgroundClass || 'bg-fantasy-bg');
      
      const initialSegment: StorySegment = {
        id: '1',
        text: template.initialText,
        choices: template.initialChoices,
        background: template.backgroundClass,
      };
      
      setStory([initialSegment]);
      setIsNewStory(false);
    }
  };

  const handleChoice = async (choiceId: string, choiceText: string) => {
    setLoading(true);
    
    // Add user's choice as part of the story
    const userChoice = {
      id: `choice-${Date.now()}`,
      text: `Bạn chọn: ${choiceText}`,
    };
    
    setStory((prev) => [...prev, userChoice]);
    
    try {
      // Generate the next segment based on the choice
      const nextSegment = await generateStorySegment(choiceText, story);
      
      // Check if we need to update the background
      if (nextSegment.background && nextSegment.background !== currentBackground) {
        setCurrentBackground(nextSegment.background);
      }
      
      setStory((prev) => [...prev, nextSegment]);
    } catch (error) {
      console.error('Error generating story segment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserInput = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || loading) return;
    
    setLoading(true);
    
    // Add user's input as part of the story
    const userInputSegment = {
      id: `input-${Date.now()}`,
      text: `Bạn: ${userInput}`,
    };
    
    setStory((prev) => [...prev, userInputSegment]);
    setUserInput('');
    
    try {
      // Generate the next segment based on user input
      const nextSegment = await generateStorySegment(userInput, story);
      
      // Check if we need to update the background
      if (nextSegment.background && nextSegment.background !== currentBackground) {
        setCurrentBackground(nextSegment.background);
      }
      
      setStory((prev) => [...prev, nextSegment]);
    } catch (error) {
      console.error('Error generating story segment:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderChoices = (choices?: { id: string; text: string }[]) => {
    if (!choices || choices.length === 0) return null;
    
    return (
      <div className="mt-6 space-y-3">
        {choices.map((choice, index) => (
          <button
            key={choice.id}
            className="w-full text-left p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors choice-appear"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handleChoice(choice.id, choice.text)}
            disabled={loading}
          >
            {choice.text}
          </button>
        ))}
      </div>
    );
  };

  const renderTemplateSelection = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-hero-pattern bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-6 text-center">Chọn Mẫu Truyện</h1>
              <p className="text-gray-600 mb-8 text-center">
                Hãy chọn một trong những mẫu truyện dưới đây để bắt đầu cuộc phiêu lưu của bạn
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {storyTemplates.map((template) => (
                  <button
                    key={template.id}
                    className="card group hover:shadow-lg overflow-hidden"
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <div 
                      className="h-36 bg-cover bg-center"
                      style={{ backgroundImage: `url(${template.imageUrl})` }}
                    >
                      <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-30">
                        <h3 className="text-xl font-bold text-white">{template.title}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600">{template.shortDescription}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {template.tags.slice(0, 3).map((tag, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <button
                  className="flex items-center justify-center mx-auto space-x-2 btn btn-outline"
                  onClick={() => navigate('/')}
                >
                  <Home size={18} />
                  <span>Quay Về Trang Chủ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isNewStory) {
    return renderTemplateSelection();
  }

  return (
    <div className={`min-h-screen flex flex-col ${currentBackground} bg-cover bg-center text-white pt-16 story-background-transition`}>
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      
      {/* Header */}
      <div className="relative z-10 container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <button
            className="flex items-center space-x-2 text-white hover:bg-white/10 px-3 py-2 rounded-lg transition"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={20} />
            <span>Trang Chủ</span>
          </button>
          
          <div className="flex space-x-3">
            <button
              className="flex items-center space-x-2 text-white hover:bg-white/10 px-3 py-2 rounded-lg transition"
              onClick={() => {}} // Save functionality would go here
            >
              <Save size={20} />
              <span className="hidden sm:inline">Lưu Truyện</span>
            </button>
            
            <button
              className="flex items-center space-x-2 text-white hover:bg-white/10 px-3 py-2 rounded-lg transition"
              onClick={() => {}} // Reset functionality would go here
            >
              <Sparkles size={20} />
              <span className="hidden sm:inline">Truyện Mới</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Story Content */}
      <div className="relative z-10 flex-1 container mx-auto px-4 py-4 flex flex-col">
        <div 
          ref={storyContainerRef}
          className="flex-1 overflow-y-auto story-container bg-black/30 backdrop-blur-sm rounded-lg p-6"
        >
          {story.map((segment, index) => (
            <div key={segment.id} className="mb-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* User input or choice */}
              {segment.id.startsWith('input-') || segment.id.startsWith('choice-') ? (
                <div className="bg-primary-600/80 text-white p-3 rounded-lg inline-block max-w-[80%] ml-auto">
                  {segment.text}
                </div>
              ) : (
                /* Story segment */
                <div className="story-text bg-white/10 backdrop-blur-md p-4 rounded-lg text-white">
                  <p>{segment.text}</p>
                  {renderChoices(segment.choices)}
                </div>
              )}
            </div>
          ))}
          
          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-center items-center py-4">
              <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        {/* User Input */}
        <div className="mt-4">
          <form onSubmit={handleUserInput} className="flex gap-2">
            <input
              type="text"
              className="input-field flex-1 bg-white/10 backdrop-blur-sm text-white border-gray-600 placeholder-gray-300"
              placeholder="Nhập diễn biến tiếp theo của câu chuyện..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !userInput.trim()}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;