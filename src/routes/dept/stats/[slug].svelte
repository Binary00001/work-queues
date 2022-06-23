<script>
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { api } from '$lib/db';
	// import SmallChart from '$lib/components/SmallChart.svelte';
	import PartTable from '$lib/components/PartTable.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import { convertTime } from '$lib/utils';

	let dept = $page.params.slug;

	let deptList;
	let deptGoal;
	let employeeList;
	// let burndown;
	let chartStats;
	let loading = true;
	let goal;
	let date;
	let dates;
	let dailyParts;
	let current;

	// let dailyGoal;
	// let completedParts;
	// let completedJobs;

	let reloadInterval;

	async function loadData() {
		try {
			const [
				deptData,
				goalData,
				employeeData,
				// burndownData,
				// chartData,
				currentData
			] = await Promise.all(
				[
					fetch(`${api}/testing/dept/${dept}`),
					fetch(`${api}/testing/dept/stats/${dept}`),
					fetch(`${api}/stats/employees/${dept}`),
					// fetch(`/dept/burndown/${dept}.json`),
					// fetch(`${api}/testing/stats/dept/weekly/${dept}`),
					fetch(`${api}/testing/current?dept=${dept}`)
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
				goalData.ok &&
				employeeData.ok &&
				// burndownData.ok &&
				// chartData.ok &&
				currentData.ok
				// dailyGoalData.ok &&
				// completedPartsData.ok &&
				// completedJobsData.ok
			) {
				deptList = await deptData.json();
				deptGoal = await goalData.json();
				employeeList = await employeeData.json();
				// burndown = await burndownData.json();
				// chartStats = await chartData.json();
				current = await currentData.json();
				console.log(deptGoal);
				// dailyGoal = await dailyGoalData.json();
				// completedParts = await completedPartsData.json();
				// completedJobs = await completedJobsData.json();

				goal = parseInt(deptGoal.Goal / 34);
				date = new Date(Date.now()).toDateString();
				// dates = chartStats.map((day) =>
				// 	new Date(day.Date.replace(/-/g, '/').replace(/T.+/, '')).toLocaleDateString()
				// );
				// dailyParts = chartStats.map((parts) => parts.Job_Count);
			}
		} catch (error) {
			throw error;
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		loadData();
		reloadInterval = setInterval(() => {
			loadData();
		}, 60000);
	});

	onDestroy(() => {
		clearInterval(reloadInterval);
	});
</script>

{#if loading}
	<div
		style={'display: flex; justify-content: center; align-items: center; width: 100%; height: 500px;'}
	>
		<Loader />
	</div>
{:else}
	<div class="grid-container">
		{#if deptList.length > 0}
			<h1>{deptList[0].WC_Name}</h1>
		{/if}
		<table class="goals-table">
			<thead>
				<th>DAILY GOAL</th>
				<th>TOTAL COMPLETED JOBS</th>
				<th>TOTAL COMPLETED PARTS</th>
				<!-- th NEGATIVE JOBS FOR THE WEEK PER PAT -->
			</thead>
			<tbody>
				<tr>
					<td>{goal}</td>
					<td>
						{deptGoal.Job_Count}
					</td>
					<td>{deptGoal.Part_Count}</td>
				</tr>
			</tbody>
		</table>
		<div class="data">
			<div class="sidebar">
				<h3>{date}</h3>
				<table>
					<thead>
						<th>EMPLOYEE</th>
						<th>COMPLETED JOBS</th>
					</thead>
					<tbody>
						{#each employeeList as { employee, jobsCompleted }}
							<tr>
								<td>{employee}</td>
								<td>{jobsCompleted}</td>
							</tr>
						{/each}
					</tbody>
				</table>

				<!-- BURNDOWN DATA -->
				<!-- {#if burndown.length > 0}
					<h4>BURNDOWN JOBS</h4>
					<table>
						<thead>
							<th>PART NUMBER</th>
							<th>RUN</th>
						</thead>
						<tbody>
							{#each burndown as { Part_Num, Run }}
								<tr>
									<td>{Part_Num}</td>
									<td>{Run}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{/if} -->

				<!-- <SmallChart
					labels={dates}
					data={dailyParts}
					dailyGoal={[goal, goal, goal, goal, goal, goal, goal, goal]}
				/> -->
			</div>

			{#if deptList.length == 0}
				<div class="empty">
					<p>Queue Empty</p>
				</div>
			{:else}
				<PartTable parts={deptList} />
			{/if}
		</div>
		{#if current}
			<h4>Current Logins</h4>
			{#each current as login}
				<div class="current" style={'display: flex; flex-direction: row; '}>
					<div class="employee" style={'flex:1;'}>
						<span><strong>Employee: </strong>{login.Last_Name + ' ' + login.First_Name}</span>
					</div>
					<div class="part-info" style={'flex: 1;'}>
						<span
							><strong>Part Number:</strong>
							{login.Part_Num}
							{' '}<strong>Run:</strong>
							{login.Run}</span
						>
					</div>
					<div class="login-info" style={'flex: 1;'}>
						<span><strong>Time On Job:</strong> {convertTime(login.Time_On)}</span>
					</div>
				</div>
			{/each}
		{/if}
	</div>
{/if}

<style>
	.grid-container {
		display: grid;
		text-align: center;
		height: 100%;
		background-color: lightgray;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

	h1 {
		background-color: tomato;
	}

	h3 {
		margin: 10px;
	}

	.goals-table {
		background-color: tomato;
		text-align: center;
		border-bottom: 1px solid black;
	}

	.data {
		display: grid;
		grid-template-columns: 1fr 5fr;
	}

	.sidebar {
		background-color: lightgray;
	}

	.sidebar table {
		margin-bottom: 15px;
		width: 100%;
		text-align: center;
	}

	@media print {
		@page {
			size: landscape;
		}
	}
</style>
