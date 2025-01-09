// Import necessary plugins
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-css-only';

// Check if we are in production mode
const production = !process.env.ROLLUP_WATCH;

export default {
    // Entry point for the application
    input: 'src/svelte/src/main.js',
    // Output configuration
    output: {
        sourcemap: true, // Generate source maps
        format: 'iife', // Immediately Invoked Function Expression format
        name: 'app', // Global variable name for the bundle
        file: 'public/build/bundle.js' // Output file
    },
    plugins: [
        // Svelte plugin to compile Svelte components
        svelte({
            compilerOptions: {
                dev: !production // Enable run-time checks in development
            }
        }),
        // Extract CSS into a separate file
        css({ output: 'bundle.css' }),
        // Resolve node_modules dependencies
        resolve({
            browser: true, // Use browser-compatible versions of modules
            dedupe: ['svelte'] // Avoid duplicate Svelte instances
        }),
        // Convert CommonJS modules to ES6
        commonjs(),
        // Minify the code in production
        production && terser()
    ],
    // Watch configuration
    watch: {
        clearScreen: false // Do not clear the screen when rebuilding
    }
};