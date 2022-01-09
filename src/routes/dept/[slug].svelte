<script>
	//COMMENTING OUT ALL BURNDOWN REFERENCES UNTIL FURTHER NOTICE
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';

	import { api } from '$lib/db';
	import Loader from '$lib/components/Loader.svelte';
	import DailyChart from '$lib/components/DailyChart.svelte';
	import DeptTable from '$lib/components/DeptTable.svelte';
	// import Burndown from '$lib/components/Burndown.svelte';
	import SmallTable from '$lib/components/SmallTable.svelte';

	let dept;
	let deptList;
	// let burndown;
	let chartStats;
	let stats;
	let goal;
	let width;

	let myInterval;
	let loading = true;

	let dates;
	let dailyParts;

	async function getData() {
		dept = $page.params.slug;
		try {
			const [
				deptData,
				// burndownData,
				chartData,
				statsData
			] = await Promise.all(
				[
					fetch(`${api}/testing/dept/${dept}`),
					// fetch(`${api}/dept/burndown/${dept}`),
					fetch(`${api}/testing/stats/dept/weekly/${dept}`),
					fetch(`${api}/testing/dept/stats/${dept}`)
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
				deptData.ok &&
				// burndownData.ok &&
				chartData.ok &&
				statsData.ok
			) {
				deptList = await deptData.json();
				// burndown = await burndownData.json();
				chartStats = await chartData.json();
				stats = await statsData.json();

				dates = chartStats.map((day) =>
					new Date(day.Date.replace(/-/g, '/').replace(/T.+/, '')).toLocaleDateString()
				);
				dailyParts = chartStats.map((parts) => parts.Job_Count);
				goal = parseInt(stats.Goal / 34);
				console.log(deptList);
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
			// location.reload();
			getData();
		}, 300000);
	});

	onDestroy(() => {
		clearInterval(myInterval);
	});
</script>

<svelte:window bind:innerWidth={width} />

<main>
	{#if loading}
		<Loader />
	{:else}
		{#if deptList === null}
			<h1>No Jobs In Queue</h1>
		{:else}
			<h1 class="dept">
				{deptList[0].WC_Name}
			</h1>
			<div class="daily no-print">
				<table>
					<thead>
						<th>DAILY GOAL</th>
						<th>JOBS COMPLETED</th>
						<th>PARTS COMPLETED</th>
					</thead>
					<tbody>
						<tr>
							<td>{goal}</td>
							<td>
								{stats.Job_Count}
							</td>
							<td>{stats.Part_Count}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- {#if burndown}
				<div class="table no-print">
					<Burndown data={burndown} />
				</div>
			{/if} -->

			{#if width < 740}
				<div class="table">
					<SmallTable data={deptList} />
				</div>
			{:else}
				<div class="table">
					<DeptTable parts={deptList} />
				</div>
			{/if}
		{/if}
		<div class="chart no-print">
			<DailyChart
				labels={dates}
				data={dailyParts}
				dailyGoal={[goal, goal, goal, goal, goal, goal, goal, goal]}
			/>
		</div>
	{/if}
</main>

<style>
	main {
		margin: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		font-weight: 200;
		width: 100%;
	}

	.dept {
		text-transform: uppercase;
		font-weight: 100;
		margin-top: 10px;
	}

	table,
	th,
	td {
		border: 1px solid black;
		border-collapse: collapse;
		padding: 5px;
	}

	td {
		text-align: center;
	}

	thead {
		background-color: rgba(0, 128, 128, 0.5);
	}

	.table {
		width: 95vw;
		/* margin: auto 15px; */
		margin: 15px auto;
	}

	table {
		margin-top: 10px;
		width: 100%;
	}

	.daily thead {
		padding: 0;
		margin: 0;
		background-color: rgba(112, 128, 144, 0.5);
	}

	.daily thead,
	.daily th,
	.daily td {
		border: none;
	}

	.chart {
		width: 95%;
	}

	@media screen and (max-width: 640px) {
		.table {
			width: 100%;
		}
	}

	@media print {
		.no-print {
			display: none;
		}
		main {
			width: 100vw;
			font-size: 0.75em;
		}
	}
</style>
