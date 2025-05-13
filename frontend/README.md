# Plant Disease Prediction Frontend

A modern web application for predicting plant diseases using machine learning. Built with React, TypeScript, and shadcn/ui.

## Features

- 🖼️ Image upload for plant disease analysis
- 📊 Real-time prediction results
- 📝 Run any single prediction (disease, variety, age) or all at once with the 'All' option
- 📱 Responsive design for all devices
- 🎨 Modern UI with shadcn/ui components
- 🌙 Dark mode support
- 🗂️ View full prediction history in a beautiful dialog, with each result shown in a card and clear prediction type headers
- 🧩 When running 'All', see all results grouped together in the UI and in history

## Tech Stack

- [React](https://react.dev/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Radix UI](https://www.radix-ui.com/) - Headless UI Components

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── ui/              # shadcn/ui components
│   │   └── prediction-card.tsx  # Card for displaying a prediction
│   │   └── history-dialog.tsx   # Dialog for full history
│   ├── lib/
│   │   └── api.ts           # API utility for backend calls
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the blazing fast build tool
