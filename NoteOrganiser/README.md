
# Documentation Assistant: Electron + Svelte App

This project is a stand-alone Electron application integrated with Svelte to manage and organize documentation. The app provides a modern, user-friendly interface to organize and search notes, with the potential for future expansion.

---

## **Project Overview**

- **Frameworks**: Electron and Svelte
- **Purpose**: Build a desktop application for documentation management and global search.
- **Core Features**:
  - Modern UI with Svelte components.
  - Integration with Electron for cross-platform desktop functionality.

---

## **Prerequisites**

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## **Project Structure**

Ensure your project structure looks like this:

```
noteorganiser/
├── node_modules/
├── public/
│   ├── build/
│   │   ├── bundle.js
│   │   ├── bundle.css
│   ├── favicon.ico
│   ├── global.css
│   ├── index.html
├── src/
│   ├── App.svelte
│   ├── main.js
│   ├── preload.js
├── package.json
├── package-lock.json
├── rollup.config.js
```

---

## **Setup Instructions**

### Step 1: Install Dependencies

Navigate to the root of your project directory and install the necessary dependencies:

```bash
npm install
```

### Step 2: Build the Svelte App

Svelte components need to be compiled into JavaScript before they can be loaded by Electron. Build the app with the following command:

```bash
npm run build
```

This will generate the `build/` folder inside the `public/` directory.

### Step 3: Start the Electron App

Run the following command to start the Electron app:

```bash
npm start
```

---

## **Detailed Steps**

### Step 4: Create `rollup.config.js`

Set up the Rollup configuration file to bundle your Svelte components:

```javascript
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/App.svelte',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    svelte({
      emitCss: true,
      compilerOptions: {
        dev: !production
      }
    }),
    css({ output: 'bundle.css' }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs()
  ],
};
```

---

### Step 5: Create `main.js`

Set up the Electron main process:

```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  win.loadFile(path.join(__dirname, '../public/index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
```

---

### Step 6: Create `preload.js`

Set up a preload script (optional):

```javascript
// This file can be used to preload scripts or set up context isolation
```

---

### Step 7: Create `App.svelte`

Set up the main Svelte component:

```svelte
<script>
  let name = "Note Organiser";
</script>

<main>
  <h1>Welcome to {name}!</h1>
  <p>Start creating your notes here.</p>
</main>

<style>
  h1 {
    color: #ff3e00;
  }
</style>
```

---

### Step 8: Create `index.html`

Set up the main HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Note Organiser</title>
  <link rel="stylesheet" href="/global.css">
  <script defer src="/build/bundle.js"></script>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

---

## **Running the Project**

### Step 9: Start the Application

To start the app:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the Svelte app:
   ```bash
   npm run build
   ```

3. Start the Electron app:
   ```bash
   npm start
   ```

---