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
			<th>Cust Date</th>
			<th>Time In Queue</th>
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
					<td>{convertTime(part.Queue_Diff)}</td>
					<td>{part.Comments}</td>
				</tr>
				<!-- {/if} -->
			{/each}
		</tbody>
	</table>
</div>
