<script>
    export let notes;
    export let selectedHeader;
    export let selectedSection;
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
  
    function selectHeader(header) {
      dispatch('headerClick', header);
    }
  </script>
  
  <aside class="sidebar">
    <h3>Headers</h3>
    <ul>
      {#each notes as note}
        <li on:click={() => selectHeader(note)}>{note.header}</li>
      {/each}
    </ul>
  </aside>
  
  <style>
    .sidebar {
      width: 25%;
      background: #f4f4f4;
      padding: 1em;
      border-right: 1px solid #ddd;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      cursor: pointer;
      padding: 0.5em;
    }
    li:hover {
      background-color: #ddd;
    }
  </style>