<script context="module">

    export async function load({fetch}) {

        const res = await fetch('/api/burndown',
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
    export let data = [];
    // console.log(data)
</script>

<main>
        <div class="table">
            <h1 class="dept">BURNDOWN LIST</h1>
            <table>
                <thead>
                    <th>Work Center</th>
                    <th>Part Number</th>
                    <th>Run</th>
                    <!-- <th>Customer Date</th> -->
                    <th>PO#</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>DiQ</th>
                </thead>
                <tbody>
                    {#each data as part}
                    <tr>
                        <td>{part.WC_NAME}</td>
                        <td>{part.PART_NUMBER}</td>
                        <td>{part.RUN}</td>
                        <!-- <td>{part.CUST_REQ_DATE}</td> -->
                        <td>{part.PO}</td>
                        <td>{part.ITEM}</td>
                        <td>{part.RUN_QTY}</td>
                        {#if part.DAYS_IN_QUEUE == null}
                          <td>0</td>
                        {:else}
                          <td>{part.DAYS_IN_QUEUE}</td>
                        {/if}
                    </tr>   
                    {/each}
                </tbody>
            </table>
        </div>

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
        text-align: center;
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
        margin: 10px;
        width: 90%;
    }

    table {
        margin-top: 10px;
        width: 100%;
    }

    

</style>