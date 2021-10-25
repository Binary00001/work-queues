<script>
	import Nav from '$lib/components/Nav.svelte';
</script>

<svelte:head>
	<title>Imaginetics - WC Queue Lists</title>
</svelte:head>

<div class="navigation">
	<Nav />
</div>

<main>
	<slot />
</main>

<style>
	* {
		margin: 0;
	}

	@media print {
		.navigation {
			display: none;
		}
	}
</style>
