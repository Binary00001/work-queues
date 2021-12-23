<script>
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
			<th>Customer</th>
			<th>Purchase Order</th>
			<th>Time In Queue</th>
			<th>Priority</th>
			<th>Comments</th>
		</thead>

		<tbody>
			{#each tableData as part}
				<!-- {#if } -->
				<tr>
					<td
						><a
							href={`/part?po=${part.PO}&line=${part.Item}&run=${part.Run}&part=${part.Part_Num}`}
							target="_blank">{part.Part_Num}</a
						></td
					>
					<td>{part.Run}</td>
					<td>{parseInt(part.Qty)}</td>
					<td>{new Date(part.Cust_Date).toLocaleDateString()}</td>
					<td>{part.Customer}</td>
					<td>{part.PO}-{part.Item}</td>
					<td>{convertTime(part.Queue_Diff)}</td>
					<td>{part.Priority}</td>
					<td>{part.Comments}</td>
				</tr>
				<!-- {/if} -->
			{/each}
		</tbody>
	</table>
</div>
