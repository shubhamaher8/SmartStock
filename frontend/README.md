# SmartStock Frontend

A modern HTML-based frontend for the SmartStock inventory management system. The frontend runs on a separate server and port (5000) from the backend.

## Features

- Modern UI with light green and light blue color scheme
- Dashboard with key metrics
- Product management
- Inventory management
- Order tracking
- Supplier management
- Sales tracking
- Report generation

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the frontend server:
   ```
   npm start
   ```

3. The frontend will be available at http://localhost:5000

## Backend Connection

The frontend connects to the backend API running on http://localhost:3000. Make sure the backend server is running before using the frontend.

## File Structure

- `public/` - Contains static files served by the frontend server
  - `index.html` - Main HTML file
  - `css/style.css` - CSS styles
  - `js/main.js` - JavaScript for handling navigation and API interactions
- `server.js` - Express server for serving the frontend
- `package.json` - Node.js dependencies and scripts

## Technology

- Pure HTML/CSS/JavaScript
- Express.js for serving static files 