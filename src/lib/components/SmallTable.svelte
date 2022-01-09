<script>
	import { convertTime } from '$lib/utils';
	export let data;
</script>

<div class="table-container">
	<table>
		<thead>
			<th>Part Number</th>
			<th>Run</th>
			<th>Quantity</th>
			<th>Cust Date</th>
			<!-- <th>Time In Queue</th> -->
			<th>Comments</th>
		</thead>

		<tbody>
			{#each data as { Part_Num, Run, Qty, Cust_Date, Comments }}
				<!-- {#if } -->
				<tr>
					<td>{Part_Num}</td>
					<td>{Run}</td>
					<td>{parseInt(Qty)}</td>
					<td>{new Date(Cust_Date).toLocaleDateString()}</td>
					<!-- <td>{convertTime(part.Queue_Diff)}</td> -->
					<td>{Comments}</td>
				</tr>
				<!-- {/if} -->
			{/each}
		</tbody>
	</table>
</div>

<style>
	.table-container {
		margin: 10px auto;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	table,
	tr,
	th,
	td {
		border: 1px solid black;
		border-collapse: collapse;
		text-align: center;
	}

	thead {
		background-color: rgba(0, 128, 128, 0.5);
	}

	@media screen and (max-width: 640px) {
		.table-container {
			width: 100%;
		}
	}
</style>
