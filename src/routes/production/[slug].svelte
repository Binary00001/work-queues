<!-- <script context="module">
	export async function load({ page, fetch }) {
		let dept = page.params.slug;

		const [deptData, goalData, burndownData, chartData] = await Promise.all(
			[
				fetch(`/production/${dept}.json`),
				fetch(`/api/stats/${dept}`),
				fetch(`/production/burndown/${dept}.json`),
				fetch(`/api/wc/stats/linedata/${dept}`)
			],
			{
				method: 'GET',
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				}
			}
		);

		if (deptData.ok && goalData.ok && burndownData.ok && chartData.ok) {
			const deptList = await deptData.json();
			const deptGoal = await goalData.json();
			const burndownList = await burndownData.json();
			const chartStats = await chartData.json();
			return {
				props: {
					dept,
					deptList,
					deptGoal,
					burndownList,
					chartStats
				}
			};
		}

		console.log('nothing');
	}
</script> -->
<script>
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';

	import Loader from '$lib/components/Loader.svelte';
	import DailyChart from '$lib/components/DailyChart.svelte';

	let dept;
	let deptList;
	let deptGoal;
	let burndownList;
	let chartStats;
	let goal;

	let myInterval;
	let loading = true;

	let dates;
	let dailyParts;
	//do something with this to get the goal line
	// let dailyGoal = deptGoal.map(i => i.daily_goal)
	// let lineData = [...dailyParts, ...dailyGoal]

	async function getData() {
		dept = $page.params.slug;

		const [deptData, goalData, burndownData, chartData] = await Promise.all(
			[
				fetch(`/production/${dept}.json`),
				fetch(`/api/stats/${dept}`),
				fetch(`/production/burndown/${dept}.json`),
				fetch(`/api/wc/stats/linedata/${dept}`)
			],
			{
				method: 'GET',
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				}
			}
		);

		if (deptData.ok && goalData.ok && burndownData.ok && chartData.ok) {
			deptList = await deptData.json();
			deptGoal = await goalData.json();
			burndownList = await burndownData.json();
			chartStats = await chartData.json();

			dates = chartStats.map((day) =>
				new Date(day.DAY.replace(/-/g, '/').replace(/T.+/, '')).toLocaleDateString()
			);
			dailyParts = chartStats.map((parts) => parts.DAILY_JOBS);
			goal = parseInt(deptGoal[0].daily_goal / 34);
			loading = false;
		}
	}

	onMount(() => {
		getData();
		myInterval = setInterval(() => {
			// location.reload();
			getData();
		}, 60000);
	});

	onDestroy(() => {
		clearInterval(myInterval);
	});

	// console.log(lineData)
</script>

<!-- <svelte:head>
	{#if deptList.length === 0}
		<title>IMAGINETICS</title>
	{:else}
		<title>IMAGINETICS - {deptList[0].WORK_CENTER.toUpperCase()}</title>
	{/if}
</svelte:head> -->

<main>
	{#if loading}
		<Loader />
	{:else}
		<!-- <a href={`/burndown/${dept}`}><p>Burndown list</p></a> -->
		{#if deptList.length === 0}
			<h1 class="loading">No Jobs In Queue</h1>
		{:else}
			<h1 class="dept">
				{deptList[0].WCNDESC}
			</h1>
			<div class="daily">
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
								{#if deptGoal[0].completed_jobs == null}
									0
								{:else}
									{deptGoal[0].completed_jobs}
								{/if}
							</td>
							<td>{deptGoal[0].daily_parts}</td>
						</tr>
					</tbody>
				</table>
				<!-- <h2>DAILY GOAL: {goal} - 
            JOBS COMPLETED: 
            {#if deptGoal[0].completed_jobs == null}
                0 -
            {:else}
                {deptGoal[0].completed_jobs} -
            {/if}
            PARTS COMPLETED:  {deptGoal[0].daily_parts}
        </h2> -->
			</div>

			<div class="table" style="margin-top: 5px;">
				{#if burndownList.length > 0}
					<h3 style="text-align: center;">Burndown Jobs</h3>
					<table>
						<thead>
							<tr>
								<th>PART NUMBER</th>
								<th>RUN</th>
							</tr>
						</thead>
						<tbody>
							{#each burndownList as { PART_NUMBER, RUN }}
								<tr>
									<td>{PART_NUMBER}</td>
									<td>{RUN}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{:else}
					<p />
				{/if}
			</div>

			<div class="table">
				<table class="parts">
					<thead>
						<th>Part Number</th>
						<th>Run</th>
						<th>Days in Queue</th>
						<th>Quantity</th>
						<th>Customer</th>
						<th>Due Date</th>
						<th>Priority</th>
						<th>Comments</th>
					</thead>
					<tbody>
						{#each deptList as { RUNRTNUM, RUNNO, RUNQTY, SOCUST, ITCUSTREQ, COMMENTS, QUEUEDIFF, SOPO, ITNUMBER, RUNPRIORITY }}
							<tr class:hot={RUNPRIORITY <= 5}>
								<td
									><a
										href={`/part?po=${SOPO}&line=${ITNUMBER}&run=${RUNNO}&part=${RUNRTNUM}`}
										target="_blank">{RUNRTNUM}</a
									></td
								>
								<td>{RUNNO}</td>
								<td class:stagnant={QUEUEDIFF > 3}>{QUEUEDIFF}</td>
								<td>{RUNQTY}</td>
								<td>{SOCUST}</td>
								<td
									>{new Date(
										ITCUSTREQ.replace(/-/g, '/').replace(/T.+/, '')
									).toLocaleDateString()}</td
								>
								<td>{RUNPRIORITY}</td>
								{#if COMMENTS == null}
									<td>{''}</td>
								{:else}
									<td class="comment">{COMMENTS}</td>
								{/if}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
		<DailyChart
			labels={dates}
			data={dailyParts}
			dailyGoal={[goal, goal, goal, goal, goal, goal, goal, goal]}
		/>
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		font-weight: 200;
	}

	.loading {
		font-weight: 300;
		margin: 50px;
	}

	.loading:after {
		content: '.';
		animation: dots 2s steps(4, end) infinite;
	}

	@keyframes dots {
		0%,
		20% {
			color: rgba(0, 0, 0, 0);
			text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
		}
		40% {
			color: black;
			text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
		}
		60% {
			text-shadow: 0.25em 0 0 black, 0.5em 0 0 rgba(0, 0, 0, 0);
		}
		80%,
		100% {
			text-shadow: 0.25em 0 0 black, 0.5em 0 0 black;
		}
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
		background-color: skyblue;
	}

	.table tr:hover {
		background-color: yellow;
	}

	.table {
		width: 90%;
		margin-bottom: 15px;
	}

	table {
		margin-top: 10px;
		width: 100%;
	}

	a {
		text-decoration: none;
		color: black;
	}

	.comment {
		font-weight: bold;
	}

	.hot {
		background-color: yellow;
	}

	.stagnant {
		color: red;
		font-weight: bold;
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
</style>
