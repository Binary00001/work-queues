<script>
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import DeptCard from '$lib/components/DeptCard.svelte';
	import Loader from '$lib/components/Loader.svelte';

	import { convertTime } from '$lib/utils';

	let { dept1, dept2 } = $page.params;
	const api = 'http://imaginetics193.imagineticsinc.local:4004/api';

	let dept1Parts;
	let dept1Burndown;
	let dept2Parts;
	let dept2Burndown;
	let loading = true;
	let burndown = [];
	let myInterval;

	async function getData() {
		try {
			const [
				dept1PartsData,
				dept1BurndownData,
				dept2PartsData,
				dept2BurndownData
			] = await Promise.all(
				[
					fetch(`${api}/dept/num/${dept1}`),
					fetch(`${api}/dept/burndown/${dept1}`),
					fetch(`${api}/dept/num/${dept2}`),
					fetch(`${api}/dept/burndown/${dept2}`)
				],
				{
					method: 'GET',
					mode: 'cors',
					headers: {
						'content-type': 'application/json'
					}
				}
			);

			if (dept1PartsData.ok && dept1BurndownData.ok && dept2PartsData.ok && dept2BurndownData.ok) {
				dept1Parts = await dept1PartsData.json();
				dept1Burndown = await dept1BurndownData.json();
				dept2Parts = await dept2PartsData.json();
				dept2Burndown = await dept2BurndownData.json();
				burndown = [...dept1Burndown, ...dept2Burndown];
				console.log(dept1PartsData);
			}
		} catch (err) {
			throw new Error(err.message);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		getData();
		myInterval = setInterval(() => {
			getData();
		}, 120000);
	});

	onDestroy(() => {
		clearInterval(myInterval);
	});
</script>

{#if loading}
	<div class="loader">
		<!-- <h1>{dept1Parts[0].WC_Name} | {dept2Parts[0].WC_Name}</h1> -->
		<Loader />
	</div>
{:else}
	<div class="finish-container">
		<h1>
			{#if dept1Parts.length > 0 && dept2Parts.length > 0}
				{dept1Parts[0].WC_Name} | {dept2Parts[0].WC_Name}
			{:else if dept1Parts.length > 0}
				{dept1Parts[0].WC_Name}
			{:else if dept2Parts.length > 0}
				{dept2Parts[0].WC_Name}
			{/if}
		</h1>
		<!-- burndown table -->
		<div class="burndown-table">
			{#if burndown.length == 0}
				<p />
			{:else}
				<h2>BURNDOWN</h2>
				<table>
					<thead>
						<th>Part Number</th>
						<th>Run</th>
						<th>Days In Queue</th>
						<th>Work Center</th>
					</thead>
					<tbody>
						{#each burndown as { Part_Num, Run, Queue_Diff, WC_Name, PO, Item }}
							<tr>
								<td
									><a
										href={`/part?po=${PO}&line=${Item}&Run=${Run}&part=${Part_Num}`}
										target="_blank">{Part_Num}</a
									></td
								>
								<td>{Run}</td>
								<td>{convertTime(Queue_Diff)}</td>
								<td>{WC_Name.toUpperCase()}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</div>

		<!-- Department tables -->
		<div class="card-view">
			{#if dept1Parts.length > 0}
				<DeptCard parts={dept1Parts} dept={dept1Parts[0].WC_Name} />
			{/if}
			{#if dept2Parts.length > 0}
				<DeptCard parts={dept2Parts} dept={dept2Parts[0].WC_Name} />
			{/if}
		</div>
	</div>
{/if}

<style>
	:root {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		font-weight: 200;
	}

	.loader {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.finish-container {
		text-align: center;
	}

	h1 {
		width: 100%;
		background-color: rgba(0, 128, 128, 0.5);
		font-weight: 200;
		text-align: center;
		padding: 5px;
	}

	h2 {
		font-weight: 400;
		margin: 5px;
	}

	.burndown-table {
		margin: 10px;
	}

	a {
		text-decoration: none;
		color: black;
	}
	table {
		width: 100%;
	}

	table,
	th,
	td {
		border: 1px solid black;
		border-collapse: collapse;
		font-weight: 400;
	}

	thead {
		background-color: rgba(0, 128, 128, 0.5);
	}

	.card-view {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: flex-start;
	}
</style>
