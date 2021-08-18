<script context="module">
    
    export async function load({page, fetch}) {
        const dept = page.params.slug;

        const res = await fetch(`http://192.168.0.39:5000/api/${dept}`, 
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        })

        if (res.ok) {
            const data = await res.json()
            // console.log(data.recordset)
            return {
                props: { data, dept }
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
import { navigating } from "$app/stores";




    export let data = '';
    export let dept = '';
    // console.log(data)


</script>

<main>
    <h1 class="dept">
        {dept}
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
            <!-- <th>Must Ship Date</th> -->
            <th>Priority</th>
        </thead>
        <tbody>
            {#each data as { part_number, run, qty, cust, ship_date, priority}}
            <tr class:hot={priority === 5}>
                <td>{part_number}</td>
                <td>{run}</td>
                <td>{qty}</td>
                <td>{cust}</td>
                <!-- <td class:past-due={(new Date(ship_date) - new Date(Date.now())) < 1}>{ship_date}</td> -->
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
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-weight: 200;
    }

    .dept {
        text-transform: uppercase;
        font-weight: 100;
    }

    table, th, td {
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
        width: 100%;
    }

    table {
        width: 100%;
    }

    .past-due {
        color: red;
    }

    .hot {
        background-color: yellow;
    }

</style>