const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000; // Different port from backend

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// All routes serve the index.html file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Frontend server running on http://localhost:${PORT}`);
}); 