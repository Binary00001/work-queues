<script>
	// dept possibly not needed
	// export let dept;
	export let parts;

	function convertTime(time) {
		let days = Math.floor(time / 1440);
		let hours = Math.floor(time / 60);
		let mins = time % 60;

		let difference = '';

		if (days > 0) {
			difference += days === 1 ? `${days} day` : `${days} days`;
			return difference;
		} else if (hours > 0) {
			difference = hours === 1 ? `${hours} hour` : `${hours} hours`;
			return difference;
		}
		return `${mins} minutes`;
	}
</script>

<div class="container">
	<h2>{parts[0].WC_Name.toUpperCase()}</h2>
	<table>
		<thead>
			<th>Part Number</th>
			<th>Run</th>
			<th>Cust Date</th>
			<th>Priority</th>
			<th>Customer</th>
			<th>Quantity</th>
			<th>Queue Time</th>
			<th>Comments</th>
		</thead>

		<tbody>
			{#each parts as { Part_Num, Run, Qty, Comments, Customer, WC_Num, Cust_Date, WC_Name, Queue_Diff, Priority }}
				<tr>
					<!-- <td
						><a
							href={`/part?po=${SOPO}&line=${ITNUMBER}&run=${RUNNO}&part=${RUNRTNUM}`}
							target="_blank">{RUNRTNUM}</a
						></td
					> -->
					<td>{Part_Num}</td>
					<td>{Run}</td>
					<td>{new Date(Cust_Date).toLocaleDateString()}</td>
					<td class:hot={Priority <= 5}>{Priority}</td>
					<td>{Customer}</td>
					<td>{parseInt(Qty)}</td>
					<td>{convertTime(Queue_Diff)}</td>
					<td>{Comments}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.container {
		margin-top: 10px;
		width: 48%;
	}

	/*  */
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

	table tr:hover {
		background-color: yellow;
	}

	table {
		width: 95%;
		margin: 10px;
	}
	/*  */

	.hot {
		background-color: rgba(255, 0, 0, 0.6);
		color: #eee;
	}

	/* a {
		text-decoration: none;
		color: black;
	} */
</style>
