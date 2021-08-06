<script context = 'module'>
    export async function load({fetch}) {
        const res = await fetch('http://192.168.0.39:5000/api',
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
    export let data = '';

    //write filter func
</script>

<main>
    <h1>Agenda View</h1>

    {#if !data}
    <p>Loading...</p>
    {:else}
    <div class="table">
        <table>
            <thead>
                <th>Part Number</th>
                <th>S/D</th>
                <th>PM</th>
                <th>EXP</th>
                <th>Ship Date</th>
                <th>Cust Date</th>
                <th>SO#</th>
                <th>Item</th>
                <th>Customer</th>
                <th>PO</th>
                <th>EXT $</th>
                <th>QTY</th>
                <th>QOH</th>
                <th>BAL</th>
                <th>Run</th>
                <th>Status</th>
                <th>Run QTY</th>
                <th>OWNER</th>
                <th>OPDATE</th>
                <th>LATE</th>
                <th>Open Operations</th>
                <th>DIQ</th>
                <th>Supplier</th>
                <th>PONUM</th>
                <th>IT</th>
                <th>Due Date</th>
            </thead>
            <tbody>
                {#each data as { part_number, sd, PM, cmt, expedite, ship_date, cust_date, so_num, item, cust, PO, ext_price, QTY, QOH, BAL, run, status, run_qty, owner, opdate, late, open_ops, diq, supplier, po_num, po_item, due_date}}
                <tr>
                    <td>{part_number}</td>
                    <td>{sd}</td>
                    <td>{PM}</td>
                    <td>{expedite}</td>
                    <td class:past-due={(new Date(ship_date) - new Date(Date.now())) < 1}>{ship_date}</td>
                    <td>{cust_date}</td>
                    <td>{so_num}</td>
                    <td>{item}</td>
                    <td>{cust}</td>
                    <td>{PO}</td>
                    <td>{ext_price}</td>
                    <td>{QTY}</td>
                    <td>{QOH}</td>
                    <td>{BAL}</td>
                    <td>{run}</td>
                    <td>{status}</td>
                    <td>{run_qty}</td>
                    <td>{owner}</td>
                    <td>{opdate}</td>
                    <td>{late}</td>
                    <td>{open_ops}</td>
                    <td>{diq}</td>
                    <td>{supplier}</td>
                    <td>{po_num}</td>
                    <td>{po_item}</td>
                    <td>{due_date}</td>
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

    h1 {
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

</style>