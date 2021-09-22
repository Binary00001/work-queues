<script context="module">

    export async function load({page, fetch}) {
        // const urlParams = 
        const part = page.query.get('part')
        const run = page.query.get('run')
        const po = page.query.get('po')
        const line = page.query.get('line')

        // console.log({part: part.trim(), run: run})

        const res = await fetch(`/part/${po}-${line}-${run}-${part}.json`,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        })

        if (res.ok) {
        const data = await res.json()
            // console.log(res)

            return {
                props: {data}
            }
        }

        const {message} = await res.json()
        return {
            status: res.status,
            error: new Error(message)
        }
    }
</script>

<script>
    import UpdateForm from '$lib/components/UpdateForm.svelte'
    export let data

    // console.log(data)
    
    let part = {
        part_number: data[0].part_number,
        run: data[0].run,
        po_num: data[0].po_num,
        item: data[0].item,
        comments: data[0].comments,
        expedite: data[0].expedite
    }

    
</script>

<svelte:head>
    <meta />
</svelte:head>



<main>
    <UpdateForm {part} />
</main>

<style>

    main {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        display: flex;
        height: 550px;
        justify-content: center;
        align-items: center;
    }

</style>