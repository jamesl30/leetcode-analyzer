# LeetCode Profile Analyzer

A simple web application that displays organized LeetCode profile statistics including contest performance, problems solved, and achievements.

🚀 **Live Demo**: [https://leetcode-analyzer.vercel.app](https://leetcode-analyzer.vercel.app)

## Features

- 🎯 **Profile Display**: Clean visualization of LeetCode profile data
- 📊 **Contest Performance**: Current rating, global ranking, percentile, contest history
- 🔢 **Problem Statistics**: Total solved with easy/medium/hard breakdown
- 🏆 **Best Performance**: Highest contest rank and peak rating
- 🚀 **Real-time Data**: Fetches latest data from LeetCode APIs

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **APIs**: Alfa LeetCode API

## Getting Started

The easiest way to use this app is through the live deployment at [leetcode-analyzer.vercel.app](https://leetcode-analyzer.vercel.app).

### Local Development

If you want to run locally:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd leetcode-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

1. Enter a LeetCode username (e.g., "thehunterjames")
2. Click "Analyze Profile"
3. View organized profile statistics

## API

The app fetches data from:
- `/{username}` - Basic profile data
- `/{username}/contest` - Contest performance
- `/{username}/solved` - Problems solved

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
