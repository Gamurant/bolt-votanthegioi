import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { storyTemplates } from '../data/storyTemplates';

const TemplatesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract all unique tags from templates
  const allTags = Array.from(
    new Set(storyTemplates.flatMap((template) => template.tags))
  );

  // Filter templates based on search term and selected tags
  const filteredTemplates = storyTemplates.filter((template) => {
    const matchesSearch = 
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = 
      selectedTags.length === 0 || 
      selectedTags.some((tag) => template.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  return (
    <div className="pt-20 pb-16">
      {/* Header */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Mẫu Truyện</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Khám phá các mẫu truyện đa dạng và bắt đầu cuộc phiêu lưu của riêng bạn
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white shadow-md sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search box */}
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="input-field pl-10"
                placeholder="Tìm kiếm mẫu truyện..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Tag filter dropdown */}
            <div className="relative">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2"
                onClick={() => document.getElementById('tagDropdown')?.classList.toggle('hidden')}
              >
                <Filter className="w-5 h-5" />
                <span>Thể loại</span>
                {selectedTags.length > 0 && (
                  <span className="bg-primary-100 text-primary-700 text-sm rounded-full px-2">
                    {selectedTags.length}
                  </span>
                )}
              </button>

              <div 
                id="tagDropdown"
                className="absolute hidden right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-30"
              >
                <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-medium">Lọc theo thể loại</h3>
                  {selectedTags.length > 0 && (
                    <button 
                      className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                      onClick={clearFilters}
                    >
                      <X size={14} />
                      <span>Xóa bộ lọc</span>
                    </button>
                  )}
                </div>
                <div className="p-3 max-h-60 overflow-y-auto">
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedTags.includes(tag)
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Selected filters */}
          {selectedTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  <span>{tag}</span>
                  <button onClick={() => toggleTag(tag)}>
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                onClick={clearFilters}
              >
                <X size={14} />
                <span>Xóa tất cả</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <div 
                  key={template.id}
                  className="card group h-full transition-transform hover:-translate-y-1"
                >
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${template.imageUrl})` }}
                  >
                    <div className="w-full h-full bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link 
                        to={`/story/${template.id}`}
                        className="btn btn-primary"
                      >
                        Bắt Đầu Ngay
                      </Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{template.title}</h3>
                    <p className="text-gray-600 mb-4">{template.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {template.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-500 mb-4">Không tìm thấy mẫu truyện phù hợp</p>
              <p className="text-gray-600">
                Vui lòng thử các từ khóa khác hoặc xóa bộ lọc hiện tại
              </p>
              <button
                className="mt-4 btn btn-outline"
                onClick={clearFilters}
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TemplatesPage;