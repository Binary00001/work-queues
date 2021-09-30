<script>
    import Nav from '$lib/components/Nav.svelte'
</script>

<svelte:head>
    <title>Employee Stats</title>
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