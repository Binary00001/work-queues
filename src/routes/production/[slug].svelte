<script>
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';

	import { convertTime } from '$lib/utils';
	import Loader from '$lib/components/Loader.svelte';
	import DailyChart from '$lib/components/DailyChart.svelte';
	import { goto } from '$app/navigation';

	const api = import.meta.env.VITE_API_URL;
	let dept;
	let deptList;
	let burndownList;
	let chartStats;
	let goal;
	let dailyGoal;
	let completedJobs;
	let completedParts;

	let myInterval;
	let loading = true;

	let dates;
	let dailyParts;

	async function getData() {
		dept = $page.params.slug;
		try {
			const [
				deptData,
				burndownData,
				chartData,
				dailyGoalData,
				completedJobsData,
				completedPartsData
			] = await Promise.all(
				[
					fetch(`/api/dept/${dept}`),
					fetch(`/api/dept/burndown/${dept}`),
					fetch(`/api/wc/stats/linedata/${dept}`),
					fetch(`/api/dept/stats/dailyGoal/${dept}`),
					fetch(`/api/dept/stats/completedJobs/${dept}`),
					fetch(`/api/dept/stats/completedParts/${dept}`)
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
				burndownData.ok &&
				chartData.ok &&
				dailyGoalData.ok &&
				completedJobsData.ok &&
				completedPartsData.ok
			) {
				deptList = await deptData.json();
				burndownList = await burndownData.json();
				chartStats = await chartData.json();
				dailyGoal = await dailyGoalData.json();
				completedJobs = await completedJobsData.json();
				completedParts = await completedPartsData.json();

				dates = chartStats.map((day) =>
					new Date(day.DAY.replace(/-/g, '/').replace(/T.+/, '')).toLocaleDateString()
				);
				dailyParts = chartStats.map((parts) => parts.DAILY_JOBS);
				goal = parseInt(dailyGoal[0].daily_goal / 34);
			}
		} catch (err) {
			throw new Error(err.message);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		console.log(`redirected ${$page.params.slug}`);
		goto(`/dept/${$page.params.slug}`);
	});
</script>

<main>
	{#if loading}
		<Loader />
	{:else}
		{#if deptList === null}
			<h1 class="loading">No Jobs In Queue</h1>
		{:else}
			<h1 class="dept">
				{deptList[0].WC_Name}
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
								{#if completedJobs[0].completed_jobs == null}
									0
								{:else}
									{completedJobs[0].completed_jobs}
								{/if}
							</td>
							<td>{completedParts[0].daily_parts}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="table" style="margin-top: 5px;">
				{#if burndownList.length > 0}
					<h3 style="text-align: center;">Burndown Jobs</h3>
					<table>
						<thead>
							<tr>
								<th>PART NUMBER</th>
								<th>RUN</th>
								<th>QUANTITY</th>
							</tr>
						</thead>
						<tbody>
							{#each burndownList as { Part_Num, Run, Qty }}
								<tr>
									<td>{Part_Num}</td>
									<td>{Run}</td>
									<td>{Qty}</td>
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
						<th>Time in Queue</th>
						<th>Quantity</th>
						<th>Customer</th>
						<th>Due Date</th>
						<th>Priority</th>
						<th>Comments</th>
					</thead>
					<tbody>
						{#each deptList as part}
							<tr class:hot={part.Priority <= 5}>
								<td
									><a
										href={`/part?po=${part.PO}&line=${part.Item}&run=${part.Run}&part=${part.Part_Num}`}
										target="_blank">{part.Part_Num}</a
									></td
								>
								<td>{part.Run}</td>
								<td>{convertTime(part.Queue_Diff)}</td>
								<td>{parseInt(part.Qty)}</td>
								<td>{part.Customer}</td>
								<td>{new Date(part.Cust_Date).toLocaleDateString()}</td>
								<td>{part.Priority}</td>
								{#if part.Comments === null}
									<td />
								{:else}
									<td class="comment">{part.Comments}</td>
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
