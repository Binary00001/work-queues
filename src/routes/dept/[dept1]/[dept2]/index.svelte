<script>
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';

	import SmallTable from '$lib/components/SmallTable.svelte';
	import DeptCard from '$lib/components/DeptCard.svelte';
	import DeptTable2 from '$lib/components/DeptTable2.svelte';
	import Loader from '$lib/components/Loader.svelte';

	let { dept1, dept2 } = $page.params;
	const api = 'http://imaginetics243.imagineticsinc.local:4004/api';

	let dept1Parts;
	let dept1Stats;
	let dept2Parts;
	let dept2Stats;
	let loading = true;
	let myInterval;
	let width;

	async function getData() {
		try {
			const [dept1PartsData, dept1StatsData, dept2PartsData, dept2StatsData] = await Promise.all(
				[
					fetch(`${api}/testing/dept/${dept1}`),
					fetch(`${api}/testing/dept/stats/${dept1}`),
					fetch(`${api}/testing/dept/${dept2}`),
					fetch(`${api}/testing/dept/stats/${dept2}`)
				],
				{
					method: 'GET',
					mode: 'cors',
					headers: {
						'content-type': 'application/json'
					}
				}
			);

			if (dept1PartsData.ok && dept1StatsData.ok && dept2PartsData.ok && dept2StatsData.ok) {
				dept1Parts = await dept1PartsData.json();
				dept1Stats = await dept1StatsData.json();
				dept2Parts = await dept2PartsData.json();
				dept2Stats = await dept2StatsData.json();
				// burndown = [...dept1Burndown, ...dept2Burndown];
				// console.log(dept1PartsData);
			}
		} catch (err) {
			throw new Error(err.message);
		} finally {
			loading = false;
		}
	}

	async function getThirdPartyData() {
		try {
			const [dept1InHouse, dept1ThirdParty, dept2InHouse, dept2ThirdParty] = await Promise.all(
				[
					fetch(`${api}/dept/num/${dept1}`),
					fetch(`${api}/testing/f/${dept1}`),
					fetch(`${api}/dept/num/${dept2}`),
					fetch(`${api}/testing/f/${dept2}`)
				],
				{
					method: 'GET',
					mode: 'cors',
					headers: {
						'content-type': 'application/json'
					}
				}
			);

			if (dept1InHouse.ok && dept1ThirdParty.ok && dept2InHouse.ok && dept2ThirdParty.ok) {
				dept1Parts = await dept1InHouse.json();
				dept1Stats = await dept1ThirdParty.json();
				dept2Parts = await dept2InHouse.json();
				dept2Stats = await dept2ThirdParty.json();
			}
		} catch (err) {
			throw new Error(err.message);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		const data = dept1 === '5030' ? getThirdPartyData() : getData();

		myInterval = setInterval(() => {
			data();
		}, 300000);
	});

	onDestroy(() => {
		clearInterval(myInterval);
	});
</script>

<svelte:window bind:innerWidth={width} />

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
		<!-- <div class="burndown-table">
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
		</div> -->

		<!-- Department tables -->
		{#if dept1Parts.length > 0}{#if width < 740}
				<div class="table">
					<SmallTable data={dept1Parts} />
					<SmallTable data={dept2Parts} />
				</div>
			{:else}
				<div class="card-view">
					{#if dept1Parts.length > 0}
						{#if dept1 === '5030'}
							<div class="double">
								<DeptTable2 tableData={dept1Parts} />
								{#if dept1Stats === null}
									<div />
								{:else}
									<span>THIRD PARTY</span>
									<DeptTable2 tableData={dept1Stats} />
								{/if}
							</div>
						{:else}
							<DeptCard parts={dept1Parts} dept={dept1Parts[0].WC_Name} stats={dept1Stats} />
						{/if}
					{/if}
					{#if dept2Parts.length > 0}
						{#if dept2 === '5035'}
							<div class="double">
								<DeptTable2 tableData={dept2Parts} />
								{#if dept2Stats === null}
									<div />
								{:else}
									<span>THIRD PARTY</span>
									<DeptTable2 tableData={dept2Stats} />
								{/if}
							</div>
						{:else}
							<DeptCard parts={dept2Parts} dept={dept2Parts[0].WC_Name} stats={dept2Stats} />
						{/if}
					{/if}
				</div>
			{/if}
		{/if}
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
		margin: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		font-weight: 200;
		width: 100%;
		text-align: center;
	}

	h1 {
		width: 100%;
		background-color: rgba(0, 128, 128, 0.5);
		font-weight: 200;
		text-align: center;
		padding: 5px;
	}

	/* h2 {
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
	} */

	.card-view {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: flex-start;
	}

	.double {
		width: 50%;
	}

	@media screen and (max-width: 700px) {
		.card-view {
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.table {
			width: 100%;
		}
	}
</style>
