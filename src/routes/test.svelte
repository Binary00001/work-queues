<script>

    import { createEventDispatcher, onDestroy, onMount } from "svelte";
    import DailyChart from '$lib/components/DailyChart.svelte'
    let data
    let loading = true
    let myInterval
    let chart
    let labels
    let daily


    
    async function getData() {
        const [deptData, chartData] = await Promise.all(
            [
                fetch('/production/2400.json'),
                fetch('/api/wc/stats/linedata/2400')
            ],
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        })
        if (deptData.ok && chartData.ok) {
            data = await deptData.json()
            chart = await chartData.json()
            labels = chart.map(day => new Date(day.DAY).toDateString())
            daily = chart.map(count => count.DAILY_JOBS)
            loading = false
            // console.log(data)
        }
    }

    onMount(() => {
        getData()
        myInterval = setInterval(() => {
            getData()
        }, 60000)
    }) 

    onDestroy(() => {
        clearInterval(myInterval)
    }) 
</script>

<div>
    <p>test page</p>
    {#if loading}
        <p>loading...</p>
    {:else}
        {#if data}
        <div class='container'>
            <div class="chart">
                <DailyChart labels={labels} data={daily} />
            </div>
            <div class="table">
                {#each data as {PART_NUMBER, COMMENTS}}
                    <p class:burndown={COMMENTS}>{PART_NUMBER}</p>
                {/each}
            </div>
        </div>
        {/if}
    {/if}
</div>

<style>
    .burndown {
        color: red;
    }

    .container {
        display: flex;
        flex-direction: row;
    }

    .chart {
        width: 50%;
    }

    .table {
        display: flex;
        flex-direction: column;
    }
</style>