<script>
    import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
    import "../app.css"
    const queryClient = new QueryClient()
</script>

<div>
    <QueryClientProvider client={queryClient}>
        <slot />
    </QueryClientProvider>
</div>