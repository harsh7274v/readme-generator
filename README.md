# AI README Generator

A web application that generates professional README files for GitHub repositories using Google's Gemini AI.

## Features

- Generate professional README files from GitHub repository URLs
- Preview generated README with markdown support
- Copy to clipboard functionality
- Download as README.md file
- Beautiful, modern UI with Tailwind CSS

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Google Gemini AI
- React Markdown
- Heroicons

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd readme-generator
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Google AI API key:
```
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
```

To get a Google AI API key:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and paste it in your `.env.local` file

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a GitHub repository URL in the input field
2. Click "Generate Now"
3. Preview the generated README
4. Use the "Copy" or "Download" buttons to save the README

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
