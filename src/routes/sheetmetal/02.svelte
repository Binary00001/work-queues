<script>
	import { onMount, onDestroy } from 'svelte';
	import Loader from '$lib/components/Loader.svelte';
	import DeptCard from '$lib/components/DeptCard.svelte';
	import Dept from '$lib/components/Dept.svelte';

	let dept1;
	// let issueBD;
	let dept2;
	// let sawBD;
	let loading = true;

	// let burndown = [...issueBD, ...sawBD];
	let myInterval;

	async function getParts() {
		const [
			data1,
			// issueBurndown,
			data2
			// sawBurndown
		] = await Promise.all(
			[
				fetch('http://imaginetics193.imagineticsinc.local:4004/api/testing/dept/num/0700'),
				// fetch('/production/burndown/0300.json'),
				fetch('http://imaginetics193.imagineticsinc.local:4004/api/testing/dept/num/0750')
				// fetch('/production/burndown/0500.json')
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
			data1.ok &&
			// && issueBurndown.ok
			data2.ok
			// && sawBurndown.ok
		) {
			dept1 = await data1.json();
			// issueBD = await issueBurndown.json();
			dept2 = await data2.json();
			// sawBD = await sawBurndown.json();
			loading = false;
		}
	}

	onMount(() => {
		getParts();
		myInterval = setInterval(() => {
			getParts();
		}, 60000);
	});

	onDestroy(() => {
		clearInterval(myInterval);
	});
</script>

<div class="finish-container">
	{#if loading}
		<div
			style={'display: flex; justify-content: center; align-items: center; width: 100%; height: 500px;'}
		>
			<Loader />
		</div>
	{:else}
		<h1>CNC Punch</h1>

		<!-- burndown table -->
		<!-- <div class="burndown-table">
			{#if burndown}
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
						{#each burndown as { PART_NUMBER, RUN, DAYS_IN_QUEUE, WORK_CENTER, PO, ITEM }}
							<tr>
								<td
									><a
										href={`/part?po=${PO}&line=${ITEM}&run=${RUN}&part=${PART_NUMBER}`}
										target="_blank">{PART_NUMBER}</a
									></td
								>
								<td>{RUN}</td>
								<td>{DAYS_IN_QUEUE}</td>
								<td>{WORK_CENTER.toUpperCase()}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</div> -->

		<!-- Department tables -->
		<div class="card-view">
			<Dept parts={dept1} />
			<Dept parts={dept2} />
		</div>
	{/if}
</div>

<style>
	:root {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

	.finish-container {
		text-align: center;
	}

	h1 {
		background-color: #008080;
	}

	/* .burndown-table {
		margin: 10px;
	}

	table {
		width: 100%;
	}

	table,
	th,
	td {
		border: 1px solid black;
		border-collapse: collapse;
	}

	thead {
		background-color: skyblue;
	} */

	.card-view {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: flex-start;
	}
</style>
