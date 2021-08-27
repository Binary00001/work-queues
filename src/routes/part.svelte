<script>
import Agendaview from "./agendaview.svelte"

    export let data = [{
        number: "123A1234-1",
        run: 2,
        po: "211222",
        item: 1,
        comments: "This is a test comment",
        exp: 'N'
    }, {
        number: "123A1234-1",
        run: 2,
        po: "211222",
        item: 2,
        comments: "",
        exp: "N"
    }]

    let part = {
        partNumber: data[0].number,
        run: data[0].run,
        poNum: "",
        itemLine: "",
        comments: "",
        exp: 'N'
    }

    let submit = false

    function handleSubmit() {
        
        
        let newPart = new FormData(part_form)

        let newComment = {
            partNum: newPart.get('part_number'),
            run: newPart.get('run_number'),
            poNum: newPart.get('po_number'),
            itemLine: newPart.get('item_line'),
            comments: newPart.get('comments'),
            exp: newPart.get('exp')
        }
        console.log(newComment)

        return submit = true
        

        // submit = null
    }
</script>

<main>
    {#if submit}
        <p class="sending">Sending</p>
    {:else}
    <form name="part_form" id="part_form" class="new_comment" on:submit|preventDefault={() => handleSubmit()}>

        <label for="part_number">Part Number: 
            <input type="text" id="part_number" name="part_number" bind:value={part.partNumber}  />
        </label>

        <!-- <br /> -->

        <label for="run_number">Run: 
            <input type="text" id="run_number" name="run_number" bind:value={part.run}  />
        </label>

        <!-- <br /> -->
        
        <label for="po_number">PO#: 
            <select id="po_number" name="po_number">
                {#each data as {po}}
                    <option value={po}>
                        {po}
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

</style>