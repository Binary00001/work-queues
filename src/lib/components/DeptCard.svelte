<script>
	import { convertTime } from '$lib/utils';

	export let dept;
	export let parts;
	export let stats;

	if (dept.trim() === 'SAW') {
		console.log('this is the saw dept');
	}
</script>

<div class="container">
	<h2>{dept.toUpperCase()}</h2>
	<table class="daily-table">
		<thead>
			<tr>
				<th>Daily Job Goal</th>
				<th>Jobs Completed</th>
				<th>Parts Completed</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>{parseInt(stats.Goal / 25)}</td>
				<td>{stats.Job_Count}</td>
				<td>{stats.Part_Count}</td>
			</tr>
		</tbody>
	</table>
	<table>
		<thead>
			<th>Part Number</th>
			<th>Run</th>
			<th>Time In Queue</th>
			<th>Quantity</th>
			<th>Customer</th>
			<th>Schedule Date</th>
			<th>Priority</th>
			<th>Comments</th>
		</thead>

		<tbody>
			{#each parts as { Part_Num, Run, Queue_Diff, Qty, Customer, Cust_Date, Priority, Comments }}
				<tr>
					<td>
						<!-- <a href={`/part?po=${PO}&line=${Item}&run=${Run}&part=${Part_Num}`} target="_blank"> -->
						{Part_Num}
						<!-- </a> -->
					</td>
					<td>{Run}</td>
					<td class:stagnant={Queue_Diff >= 4320}>{convertTime(Queue_Diff)}</td>
					<td>{parseInt(Qty)}</td>
					<td>{Customer}</td>
					<td>{new Date(Cust_Date).toLocaleDateString()}</td>
					<td>{Priority}</td>
					<td>{Comments}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.container {
		font-weight: 400;
		width: 45%;
	}

	h2 {
		font-weight: 400;
		margin: 5px;
	}

	.daily-table th,
	.daily-table td {
		border: none;
	}

	/*  */
	table,
	th,
	td {
		border: 1px solid black;
		border-collapse: collapse;
		padding: 5px;
	}

	th {
		font-weight: 500;
	}

	td {
		text-align: center;
	}

	thead {
		background-color: rgba(0, 128, 128, 0.5);
	}

	table tr:hover {
		background-color: yellow;
	}

	table {
		width: 100%;
		margin: 10px;
	}
	/*  */

	a {
		text-decoration: none;
		color: black;
	}

	.stagnant {
		color: red;
	}
</style>
