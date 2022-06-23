<script>
	import { convertTime } from '$lib/utils';

	export let parts;
</script>

<div class="container">
	<table>
		<thead>
			<th>Work Center</th>
			<th>Part Number</th>
			<th>Run</th>
			<th>Time In Queue</th>
			<th>Quantity</th>
			<th>Customer</th>
			<th>Cust Date</th>
			<th>Priority</th>
			<th>Comments</th>
		</thead>

		<tbody>
			{#each parts as { WC_Name, Part_Num, Run, Queue_Diff, Qty, Customer, Cust_Date, Priority, Comments}}
				<tr>
					<td>{WC_Name}</td>
					<td>{Part_Num}</td>
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
		display: flex;
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

	table tbody tr:hover {
		background-color: yellow;
	}

	table {
		width: 100%;
		/* margin: 10px auto; */
	}
	/*  */

	.stagnant {
		color: red;
	}
</style>
