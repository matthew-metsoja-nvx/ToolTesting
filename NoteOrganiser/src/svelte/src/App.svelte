<script>
	import { notes } from '../data/notes.js';
	import Sidebar from '../components/Sidebar.svelte';
	import NoteContent from '../components/NoteContent.svelte';
	import SearchBar from '../components/SearchBar.svelte';
  
	let selectedHeader = null;
	let selectedSection = null;
	let searchQuery = '';
  
	function handleHeaderClick(header) {
	  selectedHeader = header;
	  selectedSection = null; // Reset the section view
	}
  
	function handleSectionClick(section) {
	  selectedSection = section;
	}
  </script>
  
  <div class="app">
	<Sidebar {notes} on:headerClick={handleHeaderClick} />
	<main>
	  <SearchBar bind:searchQuery />
	  <NoteContent {selectedHeader} {selectedSection} {searchQuery} />
	</main>
  </div>
  
  <style>
	.app {
	  display: flex;
	  height: 100vh;
	}
	main {
	  flex: 1;
	  padding: 1em;
	}
  </style>
  