<script>
	import { goto } from '$app/navigation';
	import { partList, searching } from '$lib/sessionStore';
	let searchParams = {
		partNum: '',
		customer: '',
		poNum: '',
		workcenter: ''
	};

	async function getPart() {
		try {
			goto('/', { replaceState: true });
			searching.set(true);
			const data = await fetch(`/api/search`, {
				method: 'GET',
				mode: 'cors',
				headers: {
					'content-type': 'application/json'
				}
			});

			if (data.ok) {
				let parts = await data.json();
				// console.log(data)
				partList.set(parts);
			}
		} catch (error) {
			console.log(error.message);
			throw error;
		} finally {
			searching.set(false);
			part = '';
		}
	}
</script>

<div class="form-container">
	<form action="submit" method="GET" on:submit|preventDefault={getPart}>
		<div class="form-input">
			<label for="part-num">Part Number: {searchParams.partNum}</label>
			<input type="text" name="part-num" id="part-num" bind:value={searchParams.partNum} />
		</div>

		<div class="form-input">
			<label for="customer">Customer: {searchParams.customer}</label>
			<input type="text" name="customer" id="customer" bind:value={searchParams.customer} />
		</div>

		<div class="form-input">
			<label for="po-num">Purchase Order: {searchParams.poNum}</label>
			<input type="text" name="po-num" id="po-num" bind:value={searchParams.poNum} />
		</div>

		<div class="form-input">
			<label for="workcenter">Work Center: {searchParams.workcenter}</label>
			<input type="text" name="workcenter" id="workcenter" bind:value={searchParams.workcenter} />
		</div>
		<button type="submit" disabled>Search Parts</button>
	</form>
</div>

<style>
	.form-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 100px;
	}

	form {
		display: flex;
		flex-direction: column;
		width: 320px;
		padding: 15px;
		background-color: rgba(15, 15, 15, 0.1);
		border-radius: 15px;
	}

	.form-input {
		display: flex;
		flex-direction: column;
		margin: 5px 0;
	}

	form button {
		margin-top: 25px;
	}
</style>
