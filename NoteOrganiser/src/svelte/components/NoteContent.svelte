<script>
    export let selectedHeader = null;
    export let selectedSection = null;
    export let searchQuery = '';
  
    function getFilteredSections() {
      if (!searchQuery) return selectedHeader?.sections || [];
      return selectedHeader?.sections.filter((section) =>
        section.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  </script>
  
  <div>
    {#if selectedHeader}
      <h2>{selectedHeader.header}</h2>
      <div>
        {#each getFilteredSections() as section}
          <div>
            <strong on:click={() => (selectedSection = section)}>{section.title}</strong>
            {#if selectedSection === section}
              <p>{section.content}</p>
            {/if}
          </div>
        {/each}
      </div>
    {:else}
      <p>Select a header to view its content.</p>
    {/if}
  </div>
  