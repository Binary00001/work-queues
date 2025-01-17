<script>
	import { onMount, onDestroy } from 'svelte';
	import DeptCard from '$lib/components/DeptCard.svelte';
	import Loader from '$lib/components/Loader.svelte';

	let primerParts;
	let primerBurndown;
	let topCoatParts;
	let topCoatBurndown;
	let loading = true;
	let burndown = [];
	let myInterval;

	async function getData() {
		try {
			const [
				primerPartsData,
				primerBurndownData,
				topCoatPartsData,
				topCoatBurndownData
			] = await Promise.all(
				[
					fetch('/dept/5030.json'),
					fetch('/dept/burndown/5030.json'),
					fetch('/dept/5035.json'),
					fetch('/dept/burndown/5035.json')
				],
				{
					method: 'GET',
					mode: 'cors',
					headers: {
						'content-type': 'application/json'
					}
				}
			);

			if (
				primerPartsData.ok &&
				primerBurndownData.ok &&
				topCoatPartsData.ok &&
				topCoatBurndownData.ok
			) {
				primerParts = await primerPartsData.json();
				primerBurndown = await primerBurndownData.json();
				topCoatParts = await topCoatPartsData.json();
				topCoatBurndown = await topCoatBurndownData.json();
				burndown = [...primerBurndown, ...topCoatBurndown];
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
		<h1>FINISH INSPECTION</h1>
		<Loader />
	</div>
{:else}
	<div class="finish-container">
		<h1>FINISH INSPECTION</h1>
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
								<td>{Queue_Diff}</td>
								<td>{WC_Name.toUpperCase()}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</div>

		<!-- Department tables -->
		<div class="card-view">
			<DeptCard parts={primerParts} dept={'primer inspection'} />
			<DeptCard parts={topCoatParts} dept={'topcoat inspection'} />
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
	}

	h2 {
		font-weight: 400;
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
