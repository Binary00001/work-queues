<script>
	//FOR USE WITH DOUBLE VIEW
	import { convertTime } from '$lib/utils';
	export let tableData;
</script>

<div class="table-container">
	<table>
		<thead>
			<th>Part Number</th>
			<th>Run</th>
			<th>Quantity</th>
			<th>Op Schedule Date</th>
			<th>Comments</th>
		</thead>

		<tbody>
			{#each tableData as part}
				<!-- {#if } -->
				<tr>
					<td>{part.Part_Num}</td>
					<td>{part.Run}</td>
					<td>{parseInt(part.Qty)}</td>
					<td>{new Date(part.Cust_Date).toLocaleDateString()}</td>
					<td>{part.Comments}</td>
				</tr>
				<!-- {/if} -->
			{/each}
		</tbody>
	</table>
</div>

<style>
	table {
		margin: 10px;
		width: 99%;
	}

	table,
	th,
	td {
		border: 1px solid black;
		border-collapse: collapse;
		padding: 0 2px;
	}

	th {
		font-weight: 500;
	}

	td {
		text-align: center;
		padding: 5px;
	}

	thead {
		background-color: rgba(0, 128, 128, 0.5);
	}
</style>
