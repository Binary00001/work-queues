<script>
	import { onMount, onDestroy } from 'svelte';
	import Loader from '$lib/components/Loader.svelte';
	import DeptCard from '$lib/components/DeptCard.svelte';

	let issueJobs;
	// let issueBD;
	let sawJobs;
	// let sawBD;
	let loading = true;

	// let burndown = [...issueBD, ...sawBD];
	let myInterval;

	async function getParts() {
		const [
			issueData,
			// issueBurndown,
			sawData
			// sawBurndown
		] = await Promise.all(
			[
				fetch('/production/0300.json'),
				// fetch('/production/burndown/0300.json'),
				fetch('/production/0500.json')
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
			issueData.ok &&
			// && issueBurndown.ok
			sawData.ok
			// && sawBurndown.ok
		) {
			issueJobs = await issueData.json();
			// issueBD = await issueBurndown.json();
			sawJobs = await sawData.json();
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
		<Loader />
	{:else}
		<h1>Material Issue | Saw</h1>

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
			<DeptCard parts={issueJobs} dept={'Material Issue & ID'} />
			<DeptCard parts={sawJobs} dept={'Saw'} />
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

	.burndown-table {
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
	}

	.card-view {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: flex-start;
	}
</style>
