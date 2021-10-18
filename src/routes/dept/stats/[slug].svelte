<script context='module'>
     export async function load({page, fetch}) {
        let dept = page.params.slug

        const [deptData, goalData, employeeData, burndownData, chartData] = await Promise.all(
            [
                fetch(`/production/${dept}.json`),
                fetch(`/api/stats/dept/${dept}`),
                fetch(`/api/asdf/${dept}`),
                fetch(`/production/burndown/${dept}.json`),
                fetch(`/api/wc/stats/linedata/${dept}`)
            ],
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        })

        if (deptData.ok && goalData.ok && employeeData.ok && burndownData.ok && chartData.ok) {
            const deptList = await deptData.json()
            const deptGoal = await goalData.json()
            const employeeList = await employeeData.json()
            const burndown = await burndownData.json()
            const chartStats = await chartData.json()
            return {
                props: { 
                    deptList, deptGoal, dept, employeeList, burndown, chartStats 
                }
            }
        }

        // console.log('nothing')
    }
</script>

<script>
    import { onMount, onDestroy} from 'svelte'
    // import { page } from '$app/stores'
    import SmallChart from '$lib/components/SmallChart.svelte'
    import PartTable from '$lib/components/PartTable.svelte'
    export let deptList
    export let deptGoal
    export let employeeList
    export let burndown
    export let chartStats


    let goal = parseInt(deptGoal[0].daily_goal / 34)
    let date = new Date(Date.now()).toDateString()
    let dates = chartStats.map(day => new Date(day.DAY.replace(/-/g, '\/').replace(/T.+/, '')).toLocaleDateString())
    let dailyParts = chartStats.map(parts => parts.DAILY_JOBS)
    let reloadInterval

    // async function loadData() {
    //     let dept = $page

    //     const [deptData, goalData, employeeData, burndownData, chartData] = await Promise.all(
    //         [
    //             fetch(`/production/${dept}.json`),
    //             fetch(`/api/stats/${dept}`),
    //             fetch(`/api/asdf/${dept}`),
    //             fetch(`/production/burndown/${dept}.json`),
    //             fetch(`/api/wc/stats/linedata/${dept}`)
    //         ],
    //     {
    //         method: 'GET',
    //         mode: 'cors',
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     })

    //     if (deptData.ok && goalData.ok && employeeData.ok && burndownData.ok && chartData.ok) {
    //          deptList = await deptData.json()
    //          deptGoal = await goalData.json()
    //          employeeList = await employeeData.json()
    //          burndown = await burndownData.json()
    //          chartStats = await chartData.json()
    // }}

    onMount(() => {
        reloadInterval = setInterval(() => {
            location.reload()
            // loadData()
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
        
        <SmallChart labels={dates} data={dailyParts} dailyGoal={[goal, goal, goal, goal, goal, goal, goal, goal]} />

        </div>
     

        <!-- <a href={`/production/burndown/${dept}`} class='burndown-link'>BURNDOWN</a> -->
        {#if deptList.length == 0}
        <div class="empty">
            <p>Queue Empty</p>
        </div>
        {:else}
        <PartTable parts={deptList} />
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
</style>