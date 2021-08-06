<script>
    export let dept;
    export let parts;
</script>

<main>
    <h1>{dept}</h1>
    {#if parts}
        <table>
            <thead>
                <th>Part Number</th>
                <th>Run</th>
                <th>Quantity</th>
                <th>Customer</th>
                <th>Priority</th>
            </thead>
            <tbody>
                {#each parts as part}
                    <tr>
                        <td>{part.part_number}</td>
                        <td>{part.run}</td>
                        <td>{part.qty}</td>
                        <td>{part.cust}</td>
                        <td>{part.priority}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
    <p>No Data To Load...</p>
    {/if}
</main>