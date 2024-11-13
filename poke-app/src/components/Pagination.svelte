<script lang="ts">
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    import { Pagination } from '@skeletonlabs/skeleton-svelte';

    const pokemonsCount = $props();

    const currentPage = Number($page.url.searchParams.get('page')) || 1;

    const pageSize = 9;

    function handlePageChange(newPage: any) {
        goto(`?page=${newPage.page}`);
    }

    const sourceData = [1]
</script>

<div class="pagination">
    <Pagination onPageChange={handlePageChange} count={1302} data={sourceData} page={currentPage} pageSize={pageSize} />
</div>
