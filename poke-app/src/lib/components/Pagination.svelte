<script lang="ts">
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    import { Pagination } from '@skeletonlabs/skeleton-svelte';

    let { pokemonsCount } = $props();

    let url = $derived(new URL($page.url));

    let currentPage = $state(Number(url.searchParams.get('page')) || 1);

    const pageSize = 9;

    function handlePageChange(newPage: any) {
        url.searchParams.set('page', newPage.page);
        currentPage = newPage.page;
        return goto(url.toString());
    }

    const sourceData = [1]

    $effect(() => {
		  const url = new URL($page.url);
      const currentPage = Number(url.searchParams.get('page'));
      if(currentPage === 1) {
          handlePageChange({page: currentPage})
      }
    })

</script>

<div class="text-center mb-[50px]">
    <Pagination onPageChange={handlePageChange} count={pokemonsCount} data={sourceData} page={currentPage} pageSize={pageSize} />
</div>
