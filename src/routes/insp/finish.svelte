<script context="module">
    export async function load({fetch}) {
        const [primerData, primerBurndown, topCoatData, topCoatBurndown] = await Promise.all(
            [
                fetch('/production/5030.json'),
                fetch('/production/burndown/5030.json'),
                fetch('/production/5035.json'),
                fetch('/production/burndown/5035.json')
            ],

            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'content-type': 'application/json'
                }
            })

        if (primerData.ok && primerBurndown.ok && topCoatData.ok && topCoatBurndown.ok) {
            const primerParts = await primerData.json()
            const primerBD = await primerBurndown.json()
            const topCoatParts = await topCoatData.json()
            const topCoatBD = await topCoatBurndown.json()

            return {
                props: {
                    primerParts, 
                    primerBD,
                    topCoatParts,
                    topCoatBD
                }
            }
        }
    }
</script>

<script>
    import {onMount, onDestroy} from 'svelte'
    import DeptCard from "$lib/components/DeptCard.svelte";

    export let primerParts 
    export let primerBD
    export let topCoatParts
    export let topCoatBD

    let burndown = [...primerBD, ...topCoatBD]
    // console.log(burndown)
    let myInterval

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


<div class="finish-container">
    <h1>FINISH INSPECTION</h1>

    <!-- burndown table -->
    <div class="burndown-table">
        {#if burndown.length == 0}
            <p></p>
        {:else}
            <h2>BURNDOWN</h2>
            <table>
                <thead>
                    <th>Part Number</th>
                    <th>Run</th>
                    <th>Days In Queue</th>
                    <th>Work Center</th>
                </thead>
                <tbody>
                    {#each burndown as {PART_NUMBER, RUN, DAYS_IN_QUEUE, WORK_CENTER}}
                        <tr>
                            <td>{PART_NUMBER}</td>
                            <td>{RUN}</td>
                            <td>{DAYS_IN_QUEUE}</td>
                            <td>{WORK_CENTER.toUpperCase()}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>

    <!-- Department tables -->
    <div class="card-view">
        <DeptCard parts={primerParts} dept={'primer inspection'} />
        <DeptCard parts={topCoatParts} dept={'topcoat inspection'} />
    </div>
</div>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .finish-container {
        text-align: center;
    }

    h1 {
        background-color: tomato;
    }

    .burndown-table {
        margin: 10px;
    }

    table {
        width: 100%;
    }

    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
    }

    thead {
        background-color: skyblue;
    }

    .card-view {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
</style>
