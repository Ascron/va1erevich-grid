# Hex Grid Game

A hex grid game built with PixiJS and pixi-viewport for smooth panning and zooming.

## Features

- Interactive hex grid with clickable hexagons
- Smooth panning and zooming with mouse/touch
- Responsive design that adapts to window resizing
- Modern ES modules with Vite build system

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:3000`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

- `src/main.js` - Main application code
- `public/` - Static assets (hex.png, grid.json)
- `index.html` - Main HTML file
- `vite.config.js` - Vite configuration

## Dependencies

- **pixi.js** - 2D WebGL renderer
- **pixi-viewport** - Viewport plugin for panning/zooming
- **vite** - Build tool and dev server

## Controls

- **Drag** - Pan around the grid
- **Scroll** - Zoom in/out
- **Click** - Interact with hexagons
