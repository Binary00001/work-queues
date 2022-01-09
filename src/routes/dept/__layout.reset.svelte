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
	<div class="container">
		<slot />
	</div>
</main>

<style>
	* {
		margin: 0;
	}

	.container {
		display: grid;
	}

	@media print {
		.navigation {
			display: none;
		}
	}
</style>
