<script>
    export let dept;
    export let parts;
</script>

<main>
    <h1>{dept}</h1>
    {#if parts}
        <table>
            <thead>
                <!-- <th>Work Center</th> -->
                <th>Part Number</th>
                <th>Run</th>
                <th>Quantity</th>
                <th>Customer</th>
                <th>Priority</th>
                <th>Comments</th>
            </thead>
            <tbody>
                {#each parts as {part_number, run, qty, cust, priority, comments, po_num, item}}
                    <tr class:hot={priority === 5}>
                        <!-- <td>{part.work_center}</td> -->
                        <td><a href={`/part?po=${po_num}&line=${item}&run=${run}&part=${part_number}`} target="_blank">{part_number}</a></td>
                        <td>{run}</td>
                        <td>{qty}</td>
                        <td>{cust}</td>
                        <td>{priority}</td>
                        {#if comments == null}
                            <td>{''}</td>    
                        {:else}
                            <td class="comment">{comments}</td>
                        {/if}
                        
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
    <p>No Data To Load...</p>
    {/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        /* width: 800; */
        margin: 10px;
    }

    h1 {
        font-weight: 200;
        text-align: center;
        background-color: slategray;
        border: 1px solid black;
        border-bottom: none;
    }

    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        padding: 5px;
    }

    thead {
        background-color: skyblue;
    }

    .hot {
        background-color: yellow;
    }

    /* move to avoid repetition */
    a {
        color: #1f1f13;
        text-decoration: none;
    }
</style>