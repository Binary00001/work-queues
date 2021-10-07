<script>
    import Nav from '$lib/components/Nav.svelte'
</script>

<svelte:head>
    <!-- <meta http-equiv="refresh" content="60" /> -->
    <title>Imaginetics - WC Queue Lists</title>
</svelte:head>

<Nav />

<main>
    <slot />
</main>

<style>
    * {
        margin: 0;
    }
</style>