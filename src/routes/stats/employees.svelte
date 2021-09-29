<script context="module">

    export async function load({fetch}) {

        const res = await fetch('/api/stats',
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        })

        if (res.ok) {
            const data = await res.json()
            // console.log(data)
            return {
                props: {data}
            }
        }

        const {message} = await res.json()
        return {
            status: res.status,
            error: new Error(message)
        }
    }
</script>

<script>
    // import Dept from '$lib/Dept.svelte'
    export let data
    let employees = data
    let filter = ''
    // console.log(data)
</script>

<div>
    <div class="search">
        <label for="name-filter">Filter: </label>
        <input type="text" name='name-filter' id='name-filter' bind:value={filter}>
        <button on:click|preventDefault={() => filter = ''}>Clear</button>
    </div>

    <div class="table-wrapper">
        <table>
            <thead>
                <th>Employee</th>
                <th>Jobs Completed</th>
            </thead>
            <tbody>
                {#each employees.filter(e => e.employee.toLowerCase().includes(filter.toLowerCase())) as {employee, jobs_completed}}
                    <tr>
                        <td>{employee}</td>
                        <td>{jobs_completed}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    .search {
        margin: 20px;
    }

    .table-wrapper {
        margin: 20px;
    }

    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        padding: 5px;
    }

</style>