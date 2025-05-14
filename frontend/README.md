# Plant Prediction Frontend

A modern, beautiful, and responsive React + TypeScript frontend for Paddy Plant Prediction, featuring image upload, multi-prediction, and rich result/history display.

## Features

- **React + TypeScript** with Vite for fast development
- **Tailwind CSS** and **shadcn/ui** for modern, accessible UI
- **Image upload**: Select or drag-and-drop multiple images
- **Prediction types**: Disease, Variety, Age, or All (runs all at once)
- **Batch prediction**: Analyze multiple images in parallel
- **Beautiful results grid**: Responsive, 2-column layout, each card shows image, health badge, and predictions
- **Click-to-expand**: Click any result card to view a large image and full prediction details in a dialog
- **Prediction history**: View previous batches, with image previews and all predictions, both inline and in a modal
- **Consistent, modern design**: Soft shadows, rounded corners, notification badges, and clear info blocks
- **Accessible and responsive**: Works great on desktop and mobile

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build tool)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first CSS)
- [shadcn/ui](https://ui.shadcn.com/) (accessible UI components)

## Setup

1. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   # or
   yarn install
   ```

2. **Start the dev server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Configure API endpoint:**
   - By default, the frontend expects the backend API at `/predict/...`.
   - If your backend runs elsewhere, update the API base URL in `src/lib/api.ts`.

## Usage

1. **Select prediction type** (Disease, Variety, Age, or All).
2. **Upload one or more images** (drag-and-drop or file picker).
3. **Click "Analyze"** to run predictions. Results appear in a responsive grid.
4. **Click any result card** to view a large image and detailed predictions in a dialog.
5. **View previous predictions** in the "Previous Predictions" section or open the full history modal.

## UI/UX Highlights

- **Results grid**: 2 columns, each card with image, health badge, and predictions
- **Dialog**: Full image on the right, all predictions on the left
- **History**: Modern, compact, and visually grouped by batch and image
- **Accessible**: Keyboard navigation, focus rings, and responsive design

## Project Structure

- `src/components/PredictionFlow/` — Main workflow and UI components
- `src/components/prediction-card.tsx` — Card UI for history and modular prediction display
- `src/components/history-dialog.tsx` — Full history modal
- `src/lib/api.ts` — API utility for backend communication
- `src/types/` — Shared TypeScript types

## Customization

- **Styling**: Tweak Tailwind classes in components for your brand/colors
- **API**: Update `src/lib/api.ts` for custom endpoints or auth
- **UI**: Add more info, actions, or polish as needed

---

**Built with ❤️ by your team and shadcn/ui.**
