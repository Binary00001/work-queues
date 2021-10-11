<script context="module">
    
    export async function load({page, fetch}) {
        let dept = page.params.slug

        const [deptData, goalData, burndownData] = await Promise.all(
            [
                fetch(`/production/${dept}.json`),
                fetch(`/api/stats/${dept}`),
                fetch(`/production/burndown/${dept}.json`)
            ],
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        })

        if (deptData.ok && goalData.ok && burndownData.ok) {
            const deptList = await deptData.json()
            const deptGoal = await goalData.json()
            const burndownList = await burndownData.json()
            return {
                props: { 
                    dept,
                    deptList, 
                    deptGoal, 
                    burndownList
                }
            }
        }

        console.log('nothing')
    }
</script>

<script>
    import { onDestroy, onMount } from "svelte";

    export let dept
    export let deptList
    export let deptGoal
    export let burndownList
    let myInterval
    let count = 0

    let goal = parseInt(deptGoal[0].daily_goal / 34)

    onMount(() => {
        myInterval = setInterval(() => {
            location.reload()
        }, 60000)
    })

    onDestroy(() => {
        count = 0
        clearInterval(myInterval)
    })



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
        <h1 class='loading'>No Jobs In Queue</h1>
    {:else}
    <h1 class="dept">
        {deptList[0].WC_NAME}
    </h1>
    <div class="daily">
        <table>
            <thead>
                <th>DAILY GOAL</th>
                <th>JOBS COMPLETED</th>
                <th>PARTS COMPLETED</th>
            </thead>
            <tbody>
                <tr>
                    <td>{goal}</td>
                    <td>
                        {#if deptGoal[0].completed_jobs == null}
                            0
                        {:else}
                            {deptGoal[0].completed_jobs}
                        {/if}
                    </td>
                    <td>{deptGoal[0].daily_parts}</td>
                </tr>
            </tbody>
        </table>
        <!-- <h2>DAILY GOAL: {goal} - 
            JOBS COMPLETED: 
            {#if deptGoal[0].completed_jobs == null}
                0 -
            {:else}
                {deptGoal[0].completed_jobs} -
            {/if}
            PARTS COMPLETED:  {deptGoal[0].daily_parts}
        </h2> -->
    </div>
    
    <a href={`/production/burndown/${dept}`} class='burndown-link'>BURNDOWN</a>

    <div class="table">
    <table class='parts'>
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
        font-weight: 300;
        margin: 50px;
    }

    .loading:after {
        content: '.';
        animation: dots 2s steps(4, end)  infinite;
    } 

    @keyframes dots { 
        0%, 20% {
            color: rgba(0, 0, 0, 0);
            text-shadow: 
                .25em 0 0 rgba(0, 0, 0, 0),
                .5em 0 0 rgba(0, 0, 0, 0)
            ;
        }
        40% {
            color: black;
            text-shadow: 
                .25em 0 0 rgba(0, 0, 0, 0),
                .5em 0 0 rgba(0, 0, 0, 0)
            ;
        }
        60% {
            text-shadow: 
                .25em 0 0 black,
                .5em 0 0 rgba(0, 0, 0, 0)
            ;
        }
        80%, 100% {
            text-shadow: 
                .25em 0 0 black,
                .5em 0 0 black
            ;
        }
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

    .table tr:hover {
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

    .daily thead{
        padding: 0;
        margin: 0;
        background-color: rgba(112, 128, 144, .5);
    }

    .daily thead, .daily th, .daily td { 
        border: none;
    }

    .burndown-link {
        color: #1f1f1f;
        font-size: 1.5em;
    }

</style>