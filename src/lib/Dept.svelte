<script>
    export let dept;
    export let parts;
</script>

<main>
    <h1>{dept}</h1>
    {#if parts}
        <table>
            <thead>
                <th>Work Center</th>
                <th>Part Number</th>
                <th>Run</th>
                <th>Quantity</th>
                <th>Set Up Time</th>
                <th>Priority</th>
            </thead>
            <tbody>
                {#each parts as part}
                    <tr class:hot={part.priority === 5}>
                        <td>{part.work_center}</td>
                        <td>{part.part_number}</td>
                        <td>{part.run}</td>
                        <td>{part.QTY}</td>
                        <td>{part.setup_hours}</td>
                        <td>{part.priority}</td>
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
        width: 480px;
        margin: 5px;
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
</style>