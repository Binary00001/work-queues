<script>
    export let parts
</script>

<div class="parts-table">
    <table>
        <thead>
            <th>Part Number</th>
            <th>Run</th>
            <th>Days In Queue</th>
            <th>Quantity</th>
            <th>Customer</th>
            <th>Priority</th>
            <th>Comments</th>
        </thead>
        <tbody>
            {#each parts as {PART_NUMBER, RUN, DAYS_IN_QUEUE, RUN_QTY, CUSTOMER, PRIORITY, COMMENTS, PO, ITEM}}
                <tr class:p5={PRIORITY == 5}
                    class:p2={PRIORITY == 2}>
                    <td><a href={`/part?po=${PO}&line=${ITEM}&run=${RUN}&part=${PART_NUMBER}`}>{PART_NUMBER}</a></td>
                    <td>{RUN}</td>
                    <td class:stagnant={DAYS_IN_QUEUE > 3}>{DAYS_IN_QUEUE}</td>
                    <td>{RUN_QTY}</td>
                    <td>{CUSTOMER}</td>
                    <td>{PRIORITY}</td>
                    {#if COMMENTS == null}
                        <td>{''}</td>    
                    {:else}
                        <td>{COMMENTS}</td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>

    .parts-table {
        display: grid;
    }

    table {
        background-color: white;
    }

    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
    }

    thead {
        background-color: dodgerblue;
    }

    a {
        color: black;
        text-decoration: none;
    }

    .stagnant {
        color: red;
    }

    .p5 {
        background-color: yellow;
    }

    .p2 {
        background-color: lightgreen;
    }
</style>