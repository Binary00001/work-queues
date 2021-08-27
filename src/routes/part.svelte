<script context="module">

    export async function load({page, fetch}) {
        // const urlParams = 
        const number = page.query.get('number')
        const run = page.query.get('run')

        console.log({part: number.trim(), run: run})

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

    let submit
    export let data

    function handleSubmit() {
        let formData = new FormData(part_form)

        let commentData = {
            part_number: formData.get('part_number').trim(),
            run: formData.get('run_number').trim(),
            po_num: formData.get('po_number').trim(),
            item: formData.get('item_line').trim(),
            comments: formData.get('comments').trim(),
            expedite: formData.get('exp').trim()
        }

        console.log(commentData)

        // submit = await fetch(`http://192.168.0.39:5000/api/test_insert/`,
        //    { 
        //         method: 'POST',
        //         mode: 'cors',
        //         headers: {'content-type': 'application/x-www-form-urlencoded'},
        //         body: {
        //             part_number: formData.get('part_number').trim(),
        //             run: formData.get('run_number').trim(),
        //             po_num: formData.get('po_number').trim(),
        //             item: formData.get('item_line').trim(),
        //             comments: formData.get('comments').trim(),
        //             expedite: formData.get('exp').trim()
        //         }
        // })

        // if (submit.ok) {
        //     const data = submit.json()

        //     res.send(data)
        // }

        // const { message } = await submit.json()
        // return {
        //     status: submit.status,
        //     error: new Error(message)
        // }
    // .then((res) => {
    //     console.log(res.json())
    //     res.json()})
    //   .catch(error => console.log(error.message))
    //   .finally(submit = null)
    }

    
</script>



<main>
    {#if submit}
        <p class="sending">Sending</p>
    {:else}
    <form name="part_form" id="part_form" class="new_comment" on:submit|preventDefault={() => handleSubmit()} method="post">

        <label for="part_number">Part Number: 
            <input type="text" id="part_number" name="part_number" bind:value={data[0].part_number}  />
        </label>

        <!-- <br /> -->

        <label for="run_number">Run: 
            <input type="text" id="run_number" name="run_number" bind:value={data[0].run}  />
        </label>

        <!-- <br /> -->
        
        <label for="po_number">PO#: 
            <select id="po_number" name="po_number">
                {#each data as {po_num}}
                    <option value={po_num}>
                        {po_num}
                    </option>
                {/each}
            </select>
        </label>

        <label for="item_line">Item: 
            <select id="item_line" name="item_line">
                {#each data as {item}}
                    <option value={item}>{item}</option>
                {/each}
            </select>
        </label>

        <label for="exp">Customer Expedite:{' '}
            <select id="exp" name="exp">
                <option value="N">N</option>
                <option value="Y">Y</option>
            </select>
        </label>

        <!-- <br /> -->
        
        <label for="comments">Comments:
            <textarea 
             id="comments" 
             name="comments"
             bind:value={data[0].comments} 
             rows="4" 
             cols="50"></textarea>
        </label>

        <!-- <br /> -->

        <button type="submit">Update</button>
    </form>
    {/if}
</main>

<style>
    main {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        display: flex;
        height: 550px;
        justify-content: center;
        align-items: center;
    }
    .sending:after {
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
    .new_comment {
        display: flex;
        flex-direction: column;
        height: 350px;
        width: 400px;
        align-items: flex-start;
        justify-content: space-around;
        padding: 5px;
        background-color: #fbfbfb;
        border: 1px solid lightblue;
        box-shadow: 1.5px 1.5px slategray;
        border-radius: 15px;
    }
    label {
        padding: 5px;
    }
    textarea {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #fff;
    }
    button {
        align-self: center;
    }

    textarea {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #fff;
    }

    button {
        align-self: center;
    }

</style>