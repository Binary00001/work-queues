<script context='module'>

    export async function load({fetch}) {
        const res = await fetch('http://192.168.0.39:5000/api/deburr/', 
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        })

        if (res.ok) {
            let data = await res.json()
            return {
                props: {data}
            }
        }

        const { message } = await res.json()
        return {
            status: res.status,
            error: new Error(message)
        }
    }
</script>

<script>
    export let data = '';
    console.log(data)
</script>

<main>
    <h1>
        Testing...
    </h1>
    {#if !data}
        <p>loading...</p>
    {:else}
    <div class="table">
    <table>
        <thead>
            <th>Part Number</th>
            <th>Run</th>
            <th>Quantity</th>
            <th>Customer</th>
            <th>Must Ship Date</th>
            <th>Priority</th>
        </thead>
        <tbody>
            {#each data as { part_number, run, qty, cust, ship_date, priority}}
            <tr>
                <td>{part_number}</td>
                <td>{run}</td>
                <td>{qty}</td>
                <td>{cust}</td>
                <td>{ship_date}</td>
                <td>{priority}</td>
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
    }

    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        padding: 5px;
    }

    thead {
        background-color: skyblue;
    }

</style>