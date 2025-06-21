'use client';

import { useState } from 'react';
import { ClipboardIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import ReadmePreview from './components/ReadmePreview';

export default function Home() {
  const [githubUrl, setGithubUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedReadme, setGeneratedReadme] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setGeneratedReadme('');
    
    try {
      if (!githubUrl.startsWith('https://github.com/')) {
        throw new Error('Please enter a valid GitHub repository URL');
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ githubUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate README');
      }

      if (!data.readme) {
        throw new Error('No README content was generated');
      }

      setGeneratedReadme(data.readme);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the README');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedReadme);
      alert('README copied to clipboard!');
    } catch {
      alert('Failed to copy to clipboard');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedReadme], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-b from-gray-800 to-gray-900 py-16 border-b border-gray-700">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h1 className="text-5xl font-bold mb-4 text-blue-400 leading-tight">Turn your code into captivating documentation</h1>
          <p className="text-xl text-gray-300 mb-6">Generate professional README files for your GitHub projects in seconds using AI.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg text-lg shadow transition-colors">Generate README</button>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Generate Your README Panel */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-700 mb-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Generate Your README</h2>
          <div className="flex gap-2 mb-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-blue-700 transition-colors">GitHub Repo</button>
            <button className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg font-medium border border-gray-600">Manual Input</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="github-url" className="block text-sm font-medium text-gray-300 mb-2">GitHub Repository URL</label>
              <input
                type="url"
                id="github-url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username/repository"
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
              >
                {isLoading ? (
                  'Generating...'
                ) : (
                  <>Generate README</>
                )}
              </button>
              <button
                type="button"
                className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-700 border border-blue-600 text-blue-400 font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                onClick={() => setGithubUrl('')}
              >
                Generate Project Description
              </button>
            </div>
          </form>
        </div>
        {/* README Preview Panel */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-0 border border-gray-700 min-h-[400px] flex flex-col w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 px-8 pt-8 text-gray-100">README Preview</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded text-red-300 mx-8">
              <p className="font-medium">Error:</p>
              <p>{error}</p>
            </div>
          )}
          {generatedReadme ? (
            <>
              <div className="flex justify-end gap-4 mb-4 px-8">
                <button
                  onClick={handleCopy}
                  className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md border border-gray-600 text-gray-300"
                >
                  <ClipboardIcon className="w-5 h-5 mr-2" />
                  Copy
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md border border-gray-600 text-gray-300"
                >
                  <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                  Download
                </button>
              </div>
              <div className="flex-1 px-8 pb-8">
                <ReadmePreview content={generatedReadme} />
              </div>
            </>
          ) : (
            <div className="text-gray-500 text-center py-20">Your README preview will appear here<br/>Generate a README to see the preview</div>
          )}
        </div>
      </div>
    </main>
  );
}
