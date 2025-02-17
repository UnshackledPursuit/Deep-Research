'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [markdown, setMarkdown] = useState('');
  const [sections, setSections] = useState<{ heading: string; content: string; }[]>([]);

  const handlePaste = (text: string) => {
    setMarkdown(text);
    // Parse headings and content
    const lines = text.split('\n');
    const newSections = [];
    let currentHeading = '';
    let currentContent: string[] = [];

    for (const line of lines) {
      if (line.startsWith('#')) {
        if (currentHeading) {
          newSections.push({
            heading: currentHeading,
            content: currentContent.join('\n')
          });
          currentContent = [];
        }
        currentHeading = line.replace(/^#+\s/, '');
      } else if (currentHeading) {
        currentContent.push(line);
      }
    }

    if (currentHeading) {
      newSections.push({
        heading: currentHeading,
        content: currentContent.join('\n')
      });
    }

    setSections(newSections);
  };

  return (
    <main className="container mx-auto p-4">
      <div className="mb-8">
        <textarea
          className="w-full h-64 p-4 border rounded-lg"
          placeholder="Paste your markdown content here..."
          onChange={(e) => handlePaste(e.target.value)}
          value={markdown}
        />
      </div>

      <div className="space-y-8">
        {sections.map((section, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
            <div className="bg-gray-800 aspect-video mb-4 rounded-lg flex items-center justify-center text-white cursor-pointer hover:bg-gray-700 transition-colors">
              Click to add animation code
            </div>
            <ReactMarkdown>{section.content}</ReactMarkdown>
          </div>
        ))}
      </div>
    </main>
  );
}
