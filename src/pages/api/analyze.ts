import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { LeetCodeService } from '@/services/leetcode';

const analyzeSchema = z.object({
  leetcodeUrl: z.string().url('Please provide a valid LeetCode profile URL')
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Validate input
    const { leetcodeUrl } = analyzeSchema.parse(req.body);
    
    const leetcodeService = new LeetCodeService();
    
    // Validate LeetCode URL format
    if (!leetcodeService.validateLeetCodeUrl(leetcodeUrl)) {
      return res.status(400).json({ 
        error: 'Invalid LeetCode URL format. Expected: https://leetcode.com/username' 
      });
    }
    
    // Extract username from URL
    const username = leetcodeService.extractUsernameFromUrl(leetcodeUrl);
    if (!username) {
      return res.status(400).json({ error: 'Could not extract username from URL' });
    }
    
    // Fetch data from LeetCode APIs and return raw information
    const profileData = await leetcodeService.fetchUserProfile(username);
    if (!profileData) {
      return res.status(404).json({ 
        error: 'User not found or LeetCode APIs are unavailable' 
      });
    }
    
    // Return the raw API data
    return res.status(200).json({
      message: 'LeetCode Profile Data Retrieved Successfully',
      username: username,
      profileUrl: leetcodeUrl,
      rawData: profileData,
      cached: false
    });
    
  } catch (error) {
    console.error('Analysis error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Invalid input', 
        details: error.errors 
      });
    }
    
    return res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
}