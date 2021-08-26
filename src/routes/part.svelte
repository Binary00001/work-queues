<script context="module">

    export async function load({page, fetch}) {
        // const urlParams = 
        const number = page.query.get('number')
        const run = page.query.get('run')

        console.log(page.query.get('number'))

        const res = await fetch(`http://192.168.0.39:5000/api/part/${number}/${run}`,
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

    export let data = '';

    
</script>



<main>{#each data as part}
    <form type="submit">
        <p>Part Number: {part.part_number}</p>
        <p>Run: {part.run}</p>
        <p>PO #: {part.po_num} Item: {part.item}</p>
        <label for="comments">Comments 
            <input type="text" id="comments" name="comments" bind:value={part.comments}>
        </label>
        <!-- <label for="deleteComment">Delete
            <input type="checkbox" value="Delete">
        </label><br /> -->
        <button>Update</button>
    </form>
    {/each}
</main>

<style>
    main {
        display: flex;
        height: 550px;
        justify-content: center;
        align-items: center;
    }

    form, p, input {
        margin: 10px;
    }
</style>