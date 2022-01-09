<script>
	import { page } from '$app/stores';

	import { onMount } from 'svelte';

	let loading = true;
	let slug = $page.params.slug;
	let locations;

	const handleLots = () => {
		fetch(`${slug}.json`, {
			method: 'GET',
			mode: 'cors',
			headers: { 'content-type': 'application/json' }
		})
			.then((res) => res.json())
			.then((json) => {
				locations = json;
				loading = false;
			})
			.catch((err) => console.error(err));
	};

	onMount(() => {
		handleLots();
	});
</script>

<div class="container">
	{#if loading}
		<p>loading</p>
	{:else if !locations}
		<p>No Lots in Location</p>
	{:else}
		<ul>
			{#each locations as loc}
				<li><a href={`/inv/loc/lots/${loc.LOTLOCATION}`}>{loc.LOTLOCATION}</a></li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}
</style>
