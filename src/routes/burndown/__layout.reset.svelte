<script>
	import Nav from '$lib/components/Nav.svelte';
</script>

<svelte:head>
	<!-- <meta http-equiv="refresh" content="60" /> -->
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
		@page {
			size: landscape;
		}
	}
</style>
