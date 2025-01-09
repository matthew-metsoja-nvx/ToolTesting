// Import necessary modules from Electron
import { app, BrowserWindow } from 'electron';
// Import utilities to handle file paths and URLs
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to create the main application window
function createWindow() {
  const win = new BrowserWindow({
    width: 800, // Set the width of the window
    height: 600, // Set the height of the window
    webPreferences: {
      preload: join(__dirname, 'preload.js'), // Preload script
      contextIsolation: true // Enable context isolation for security
    }
  });

  // Load the index.html file into the window
  win.loadFile(join(__dirname, '../public/index.html'));
}

// When Electron has finished initialization, create the window
app.whenReady().then(() => {
  createWindow();

  // On macOS, recreate a window when the dock icon is clicked and there are no other windows open
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit the application when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});