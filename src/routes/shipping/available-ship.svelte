<script>
	import { onMount, onDestroy } from 'svelte';

	let loading = true;
	let reloadInterval;
	let availableLots = [];
	let time;

	let currentPage = 1;
	let pageCount;
	let pageNumber = 0;

	async function getData() {
		const [availableLotsData, pageCountData] = await Promise.all(
			[
				fetch(
					`http://imaginetics193.imagineticsinc.local:4004/api/inv/available?page=${pageNumber}`
				),
				fetch('/api/stats/availablePageCount')
			],
			{
				method: 'GET',
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				}
			}
		);

		if (availableLotsData.ok && pageCountData.ok) {
			availableLots = await availableLotsData.json();
			pageCount = await pageCountData.json();
			loading = false;
			time = new Date(Date.now()).toLocaleString();
		}
	}

	onMount(() => {
		getData();
		reloadInterval = setInterval(() => {
			getData();
		}, 60000);
	});

	onDestroy(() => clearInterval(reloadInterval));
</script>

<div class="container">
	{#if loading}
		<h1>Loading</h1>
	{:else}
		<h2>Updated: {time}</h2>
		<div class="pagination">
			<button>&le</button>
		</div>
		<table>
			<thead>
				<th>Location</th>
				<th>Part Number</th>
				<th>Lot</th>
				<th>Customer</th>
				<th>Sales Order</th>
				<th>Quantity</th>
				<th>QOH</th>
				<th>Ship Date</th>
			</thead>
			<tbody>
				{#each availableLots as lot}
					<tr>
						<td>{lot.Loc}</td>
						<td>{lot.Part_Number}</td>
						<td>{lot.Lot}</td>
						<td>{lot.Cust}</td>
						<td>{lot.SO}-{lot.Item}</td>
						<td>{lot.Int}</td>
						<td>{lot.On_Hand}</td>
						<td>{new Date(lot.Sched_Date).toLocaleDateString()}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
</style>
