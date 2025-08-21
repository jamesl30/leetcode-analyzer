import { useState } from 'react';
import Head from 'next/head';
import UrlInput from '@/components/UrlInput';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface AnalysisResponse {
  message: string;
  username: string;
  profileUrl: string;
  rawData: any;
  cached: boolean;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResponse | null>(null);

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leetcodeUrl: url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze profile');
      }

      const data: AnalysisResponse = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>LeetCode Profile Analyzer</title>
        <meta name="description" content="Analyze your LeetCode profile to discover strengths, weaknesses, and get personalized recommendations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              LeetCode Profile Analyzer
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Analyze your LeetCode profile to discover your strengths, identify areas for improvement, 
              and get personalized recommendations to level up your coding skills.
            </p>
          </div>

          {/* URL Input Section */}
          <div className="max-w-2xl mx-auto mb-8">
            <UrlInput onAnalyze={handleAnalyze} isLoading={isLoading} />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center">
              <LoadingSpinner message="Analyzing your LeetCode profile..." />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                <h3 className="font-medium">Analysis Failed</h3>
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="max-w-4xl mx-auto">
              {/* Profile Header */}
              <div className="card mb-6">
                <div className="flex items-center space-x-6">
                  {result.rawData?.profile?.avatar && (
                    <img 
                      src={result.rawData.profile.avatar} 
                      alt={`${result.username} avatar`}
                      className="w-20 h-20 rounded-full"
                    />
                  )}
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {result.rawData?.profile?.name || result.username}
                    </h2>
                    <p className="text-gray-600">@{result.username}</p>
                    <a 
                      href={result.profileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View LeetCode Profile →
                    </a>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Contest Performance */}
                <div className="card">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Contest Performance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Rating:</span>
                      <span className="font-semibold text-lg text-blue-600">
                        {result.rawData?.contest?.contestRating ? Math.round(result.rawData.contest.contestRating) : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Global Ranking:</span>
                      <span className="font-medium">
                        {result.rawData?.contest?.contestGlobalRanking ? `#${result.rawData.contest.contestGlobalRanking.toLocaleString()}` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Top Percentile:</span>
                      <span className="font-medium text-green-600">
                        {result.rawData?.contest?.contestTopPercentage ? `${result.rawData.contest.contestTopPercentage}%` : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contests Attended:</span>
                      <span className="font-medium">
                        {result.rawData?.contest?.contestAttend || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Solved Problems */}
                <div className="card">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Problems Solved</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Solved:</span>
                      <span className="font-semibold text-lg text-blue-600">
                        {result.rawData?.solved?.solvedProblem || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Easy:</span>
                      <span className="font-medium text-green-600">
                        {result.rawData?.solved?.easySolved || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Medium:</span>
                      <span className="font-medium text-yellow-600">
                        {result.rawData?.solved?.mediumSolved || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hard:</span>
                      <span className="font-medium text-red-600">
                        {result.rawData?.solved?.hardSolved || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Highest Contest Rank */}
              {result.rawData?.contest?.contestParticipation?.length > 0 && (
                <div className="card">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Best Contest Performance</h3>
                  {(() => {
                    const contests = result.rawData.contest.contestParticipation;
                    const bestRank = Math.min(...contests.map((c: any) => c.ranking));
                    const bestContest = contests.find((c: any) => c.ranking === bestRank);
                    const highestRating = Math.max(...contests.map((c: any) => c.rating));
                    const bestRatingContest = contests.find((c: any) => c.rating === highestRating);
                    
                    return (
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Highest Rank</h4>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">#{bestRank}</p>
                            <p className="text-sm text-gray-600">{bestContest?.contest?.title}</p>
                            <p className="text-xs text-gray-500">
                              {bestContest?.problemsSolved || 0}/{bestContest?.totalProblems || 4} problems solved
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Peak Rating</h4>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">{Math.round(highestRating)}</p>
                            <p className="text-sm text-gray-600">{bestRatingContest?.contest?.title}</p>
                            <p className="text-xs text-gray-500">
                              Rank #{bestRatingContest?.ranking}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}