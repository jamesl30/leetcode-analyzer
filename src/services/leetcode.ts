import axios from 'axios';

export class LeetCodeService {
  private readonly alfaApiBase = 'https://alfa-leetcode-api.onrender.com';
  
  async fetchUserProfile(username: string): Promise<any> {
    try {
      return await this.fetchFromAlfaAPI(username);
    } catch (error) {
      console.error(`Failed to fetch profile for ${username}:`, error);
      return null;
    }
  }
  
  private async fetchFromAlfaAPI(username: string): Promise<any> {
    try {
      // Fetch basic profile data
      const profileResponse = await axios.get(
        `${this.alfaApiBase}/${username}`,
        { timeout: 10000 }
      );
      
      // Fetch contest data
      const contestResponse = await axios.get(
        `${this.alfaApiBase}/${username}/contest`,
        { timeout: 10000 }
      );
      
      // Fetch solved problems data
      const solvedResponse = await axios.get(
        `${this.alfaApiBase}/${username}/solved`,
        { timeout: 10000 }
      );
      
      // Return raw API responses
      return {
        source: 'alfa-leetcode-api',
        profile: profileResponse.data,
        contest: contestResponse.data,
        solved: solvedResponse.data
      };
    } catch (error) {
      console.error('Alfa API failed:', error);
      return null;
    }
  }
  
  
  validateLeetCodeUrl(url: string): boolean {
    const leetcodeRegex = /^https?:\/\/(www\.)?leetcode\.com\/([a-zA-Z0-9_-]+)\/?$/;
    return leetcodeRegex.test(url);
  }
  
  extractUsernameFromUrl(url: string): string | null {
    const match = url.match(/leetcode\.com\/([a-zA-Z0-9_-]+)\/?$/);
    return match ? match[1] : null;
  }
}