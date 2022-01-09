<script>
	import { page } from '$app/stores';

	import { onMount } from 'svelte';

	let loading = true;
	let slug = $page.params.slug;
	let locations;

	const handleLots = () => {
		fetch(`http://imaginetics193.imagineticsinc.local:8008/api/testing/lots?loc=${slug}`, {
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
		<table>
			<thead>
				<tr>
					<th>Part Number</th>
					<th>Lot Number</th>
					<th>Remaining Qty</th>
					<th>Location</th>
				</tr>
			</thead>
		</table>
		<tbody>
			{#each locations as loc}
				<tr>
					<td>{loc.Part_Num}</td>
					<td>{loc.Lot_ID}</td>
					<td>{loc.Qty}</td>
					<td>{loc.Location}</td>
				</tr>
			{/each}
		</tbody>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	table {
		text-align: left;
	}

	th {
		border-bottom: 1px solid black;
		text-align: center;
	}

	th,
	td {
		padding: 5px;
	}
</style>
