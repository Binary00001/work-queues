<script context="module">
    
    export async function load({fetch}) {

        const res = await fetch(`http://192.168.0.39:5000/api/finish/`, 
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        })

        if (res.ok) {
            const data = await res.json()
            return {
                props: { data }
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
    import Dept from '$lib/components/Dept.svelte'
    export let data
    // console.log(data)
    
</script>

<svelte:head>
    <title>IMAGINETICS - FINISH</title>
</svelte:head>

<main>
    <h1 class="dept">
        primer/topcoat
    </h1>
    <a href={`/burndown/jeff`}><p>Burndown list</p></a>
    {#if !data}

        <p>loading...</p>

    {:else}
        <div class="dept-tables">

            <Dept dept={'Primer'} parts={data.filter(dept => dept.op_center == '5045        ').slice(0,10)}/>
            <Dept dept={'Topcoat'} parts={data.filter(dept => dept.op_center == '5050        ').slice(0, 10)} />
       
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

    .dept-tables {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    a {
        text-decoration: none;
        color: black;
        
    }

    /* table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        padding: 5px;
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

    

    .comment {
        font-weight: bold;
    }

    .hot {
        background-color: yellow;
    } */

</style>