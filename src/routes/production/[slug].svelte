<script context="module">
    
    export async function load({page, fetch}) {
        let dept = page.params.slug

        const [countData, deptData] = await Promise.all(
            [fetch(`/api/wc/${dept}`),
            fetch(`/production/${dept}.json`)],
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        })

        if (deptData.ok && countData.ok) {
            const deptList = await deptData.json()
            const deptCount = await countData.json()
            // console.log(data)
            return {
                props: { 
                    deptCount, deptList
                }
            }
        }

        console.log('nothing')
    }
</script>

<script>
    export let deptCount
    export let deptList
    console.log(deptList)
console.log(deptCount)
</script>

<svelte:head>
    {#if deptList.length === 0}
        <title>IMAGINETICS</title>
    {:else}
        <title>IMAGINETICS - {deptList[0].WORK_CENTER.toUpperCase()}</title>
    {/if}
</svelte:head>

<main>
   
    <!-- <a href={`/burndown/${dept}`}><p>Burndown list</p></a> -->
    {#if deptList.length === 0}
        <p class='loading'>loading...</p>
    {:else}
    <h1 class="dept">
        {deptList[0].WC_NAME}
    </h1>
    <h2>JOBS COMPLETED: {deptCount[0].completed}</h2>
    <div class="table">
    <table>
        <thead>
            <th>Part Number</th>
            <th>Run</th>            
            <th>Days in Queue</th>
            <th>Quantity</th>
            <th>Customer</th>
            <th>Priority</th>
            <th>Comments</th>
        </thead>
        <tbody>
            {#each deptList as { PART_NUMBER, RUN, RUN_QTY, CUSTOMER, COMMENTS, DAYS_IN_QUEUE, PO, ITEM, PRIORITY}}
            <tr class:hot={PRIORITY <= 5}>
                <td><a href={`/part?po=${PO}&line=${ITEM}&run=${RUN}&part=${PART_NUMBER}`} target="_blank">{PART_NUMBER}</a></td>
                <td>{RUN}</td>
                <td class:stagnant={DAYS_IN_QUEUE > 3}>{DAYS_IN_QUEUE}</td>
                <td>{RUN_QTY}</td>
                <td>{CUSTOMER}</td>
                <td>{PRIORITY}</td>
                {#if COMMENTS == null}
                  <td>{''}</td>    
                {:else}
                  <td class="comment">{COMMENTS}</td>
                {/if}
                
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

    .loading {
        margin: 50px;
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