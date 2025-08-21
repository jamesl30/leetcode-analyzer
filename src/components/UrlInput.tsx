import { useState } from 'react';

interface UrlInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export default function UrlInput({ onAnalyze, isLoading }: UrlInputProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const baseUrl = 'https://leetcode.com/';

  const validateUrl = (inputUrl: string): boolean => {
    const leetcodeRegex = /^https?:\/\/(www\.)?leetcode\.com\/([a-zA-Z0-9_-]+)\/?$/;
    return leetcodeRegex.test(inputUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter a LeetCode username');
      return;
    }

    const fullUrl = baseUrl + username.trim();
    if (!validateUrl(fullUrl)) {
      setError('Please enter a valid LeetCode username (letters, numbers, underscore, hyphen only)');
      return;
    }

    onAnalyze(fullUrl);
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="leetcode-username" className="block text-sm font-medium text-gray-700 mb-2">
            LeetCode Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              https://leetcode.com/
            </div>
            <input
              id="leetcode-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="thehunterjames"
              className="input-field pl-40 placeholder:text-gray-300"
              disabled={isLoading}
            />
          </div>
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Enter a LeetCode username to analyze their profile and performance
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading || !username.trim()}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Profile...
            </span>
          ) : (
            'Analyze Profile'
          )}
        </button>
      </form>

      <div className="mt-6 border-t pt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Example URLs:</h3>
        <div className="space-y-1 text-sm text-gray-500">
          <button
            type="button"
            onClick={() => setUsername('thehunterjames')}
            className="block hover:text-blue-600 transition-colors"
            disabled={isLoading}
          >
            https://leetcode.com/thehunterjames
          </button>
        </div>
      </div>
    </div>
  );
}