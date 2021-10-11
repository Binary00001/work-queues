<script context='module'>
     export async function load({page, fetch}) {
        let dept = page.params.slug

        const [deptData, goalData, employeeData, burndownData] = await Promise.all(
            [
                fetch(`/production/${dept}.json`),
                fetch(`/api/stats/${dept}`),
                fetch(`/api/asdf/${dept}`),
                fetch(`/production/burndown/${dept}.json`)
            ],
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        })

        if (deptData.ok && goalData.ok && employeeData.ok && burndownData.ok) {
            const deptList = await deptData.json()
            const deptGoal = await goalData.json()
            const employeeList = await employeeData.json()
            const burndown = await burndownData.json()
            return {
                props: { 
                    deptList, deptGoal, dept, employeeList, burndown
                }
            }
        }

        console.log('nothing')
    }
</script>

<script>
    import { onMount, onDestroy} from 'svelte'
    export let deptList
    export let deptGoal
    export let employeeList
    export let burndown


    let goal = parseInt(deptGoal[0].daily_goal / 34)
    let date = new Date(Date.now()).toDateString()
    let reloadInterval

    onMount(() => {
        reloadInterval = setInterval(() => {
            location.reload()
        }, 60000)
    })

    onDestroy(() => {
        clearInterval(reloadInterval)
    })

</script>

<div class='grid-container'>
    {#if deptList.length > 0}
        <h1>{deptList[0].WC_NAME}</h1>
    {/if}
    <table class='goals-table'>
        <thead>
            <th>DAILY GOAL</th>
            <th>TOTAL COMPLETED JOBS</th>
            <th>TOTAL COMPLETED PARTS</th>
            <!-- th NEGATIVE JOBS FOR THE WEEK PER PAT -->
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
    <div class="data">
        <div class="sidebar">
        <!-- {#if dept == 1600} -->
        <h3>{date}</h3>
            <table>
                <thead>
                    <th>EMPLOYEE</th>
                    <th>COMPLETED JOBS</th>
                </thead>
                <tbody>
                    {#each employeeList as {employee, jobs_completed}}
                        <tr>
                            <td>{employee}</td>
                            <td>{jobs_completed}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        <!-- {/if} -->

        <!-- BURNDOWN DATA -->
        {#if burndown.length > 0}
            <h4>BURNDOWN JOBS</h4>
            <table>
                <thead>
                    <th>PART NUMBER</th>
                    <th>RUN</th>
                </thead>
                <tbody>
                    {#each burndown as {PART_NUMBER, RUN}}
                    <tr>
                        <td>{PART_NUMBER}</td>
                        <td>{RUN}</td>
                    </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
        </div>
     

        <!-- <a href={`/production/burndown/${dept}`} class='burndown-link'>BURNDOWN</a> -->
        {#if deptList.length == 0}
            <p>Queue Empty</p>
        {:else}
    <div class="parts-table">
        <table class='parts' >
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
                <tr class:hot={PRIORITY == 5} class:p4={PRIORITY == 4}>
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
    </div>
</div>

<style>
    .grid-container {
        display: grid;
        text-align: center;
        height: 100%;
        background-color: lightgray;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    h1 {
        background-color: tomato;
    }

    h3 {
        margin: 10px;
    }

    .goals-table {
        /* gap: 12px; */
        background-color: tomato;
        text-align: center;
        border-bottom: 1px solid black;
    }

    .data {
        display: grid;
        grid-template-columns: 1fr 5fr;
    }

    .sidebar {
        background-color: lightgray;
    }

    .sidebar table {
        margin-bottom: 15px;
        width: 100%;
        text-align: center;
    }

    .parts-table {
        display: grid;
        background-color: white;
    }

    .parts {
        border: 1px solid black;
        border-collapse: collapse;
    }

    .parts th {
        border: 1px solid black;
        background-color: dodgerblue;
    }

    .parts td {
        border: 1px solid black;
    }

    a {
        color: black;
        text-decoration: none;
    }

    .hot {
        background-color: lightgoldenrodyellow;
    }

    .p4 {
        background-color: yellowgreen;
    }

    .stagnant {
        color: red;
    }

</style>