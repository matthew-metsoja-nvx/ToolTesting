<script>
    export let searchQuery = '';
  </script>
  
  <input
    type="text"
    placeholder="Search notes..."
    bind:value={searchQuery}
  />
  