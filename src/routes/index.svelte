<script>
    import Search from '$lib/components/Search.svelte'
    import { partList, searching } from '$lib/sessionStore'
</script>

<h1>Live Queue Lists</h1>
<Search />
{#if $searching}
    <h2 class="search">Searching</h2>
{:else}
 {#if !$partList.length > 0}
    <p></p>
 {:else}
    <table>
        <thead>
            <th>Part Number</th>
            <th>Run</th>
            <th>Purchase Order</th>
            <th>Line</th>
            <th>Work Center</th>
        </thead>
        <tbody>
        {#each $partList as {PART_NUMBER, RUN, PO, ITEM, WORK_CENTER}}
            <tr>
                <td><a href={`/part?po=${PO}&line=${ITEM}&run=${RUN}&part=${PART_NUMBER}`}>{PART_NUMBER}</a></td>
                <td>{RUN}</td>
                <td>{PO}</td>
                <td>{ITEM}</td>
                {#if !WORK_CENTER}
                <td></td>
                {:else}
                <td>{WORK_CENTER.toUpperCase()}</td>
                {/if}
            </tr>
        {/each}
        </tbody>
    </table>
    {/if}
{/if}


<style>
    * {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        margin: 0;
    }

    h1 {
        font-weight: 200;
    }

    .search::after {
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

</style>