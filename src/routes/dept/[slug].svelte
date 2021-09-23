<script context="module">
    
    export async function load({page, fetch}) {
        const dept = page.params.slug;

        const res = await fetch(`/dept/${dept}.json`, 
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

    export let data = '';
    export let dept = '';
    
    let ordered = data

</script>

<svelte:head>
    <title>IMAGINETICS - {dept.toUpperCase()}</title>
</svelte:head>

<main>
    <h1 class="dept">
        {dept}
    </h1>
    <a href={`/burndown/${dept}`}><p>Burndown list</p></a>
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
            <th>Priority</th>
            <th>Comments</th>
            <th>Days in Queue</th>
        </thead>
        <tbody>
            {#each ordered as { part_number, run, qty, cust, comments, diq, po_num, item, priority}}
            <tr class:hot={priority === 5}>
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
                <td class:stagnant={diq > 3}>{diq}</td>
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
        margin-top: 10px;
    }

    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        padding: 5px;
    }

    td {
        text-align: center;
    }

    thead {
        background-color: skyblue;
    }

    tr:hover {
        background-color: yellow;
    }

    .table {
        width: 90%;
    }

    table {
        margin-top: 10px;
        width: 100%;
    }

    a {
        text-decoration: none;
        color: black;
        
    }

    .comment {
        font-weight: bold;
    }

    .hot {
        background-color: yellow;
    }

    .stagnant {
        color: red;
        font-weight: bold;
    }

</style>