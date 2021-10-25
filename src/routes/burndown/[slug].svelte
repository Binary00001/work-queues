<script context="module">
	export async function load({ page, fetch }) {
		const dept = page.params.slug;

		const res = await fetch(`http://192.168.0.39:5000/api/burndown/burndown/${dept}`, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'content-type': 'application/json'
			}
		});

		if (res.ok) {
			const data = await res.json();
			// console.log(data)
			return {
				props: { data, dept }
			};
		}

		const { message } = await res.json();
		return {
			status: res.status,
			error: new Error(message)
		};
	}
</script>

<script>
	export let data = null;
	export let dept;
</script>

<main>
	<h1 class="header">Burndown List</h1>
	{#if data.length == 0}
		<h2>No Burndown Items</h2>
		<a href={`/dept/${dept}`}><h3>Return to list</h3></a>
	{:else}
		<a class="header" href={`/dept/${dept}`}>{dept}</a>
		<div class="table">
			<table>
				<thead>
					<th>Part Number</th>
					<th>Run</th>
					<th>Quantity</th>
					<th>Customer</th>
					<th>Priority</th>
					<th>Comments</th>
				</thead>
				<tbody>
					{#each data as part}
						<tr class:hot={part.priority === 5}>
							<td>{part.part_number}</td>
							<td>{part.run}</td>
							<td>{part.qty}</td>
							<td>{part.cust}</td>
							<td>{part.priority}</td>
							<td>{part.comments}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
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

	.header {
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

	thead {
		background-color: skyblue;
	}

	tr:hover {
		background-color: yellow;
	}

	.table {
		width: 90%;
	}

	table {
		margin-top: 10px;
		width: 100%;
	}

	a {
		text-decoration: none;
		color: black;
	}

	.hot {
		background-color: yellow;
	}

	h2 {
		font-weight: 300;
	}

	@media print {
		* {
			font-size: 8px;
		}
		.table {
			width: 100%;
			height: 100%;
		}

		table,
		th,
		td {
			font-size: xx-small;
		}

		@page {
			font-size: xx-small;
		}
	}
</style>
