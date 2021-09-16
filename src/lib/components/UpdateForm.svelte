<script>
    export let part
    
    let submit = false;

    async function handleSubmit() {
        try {
            submit = fetch('/api/insert', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(part)
            })
        } catch (err) {
            throw err
        } finally {
            submit = false
        }
    }
</script>

<form type="submit" class="new_comment" method="post" on:submit|preventDefault={handleSubmit}>

    <label for="part_number">Part Number: 
        <input type="text" id="part_number" name="part_number" bind:value={part.part_number}  />
    </label>


    <label for="run_number">Run: 
        <input type="text" id="run_number" name="run_number" bind:value={part.run}  />
    </label>

    
    <label for="po_number">PO#: 
        <input type="text" bind:value={part.po_num} />
    </label>

    <label for="item_line">Item: 
        <input type="text" bind:value={part.item} />
    </label>

    <label for="exp">Customer Expedite:{' '}
        <input type="text" bind:value={part.expedite} />
    </label>

    
    <label for="comments">Comments:
        <textarea 
         id="comments" 
         name="comments"
         rows="4" 
         cols="50"
         bind:value={part.comments}></textarea>
    </label>


    <input class="button" type="submit" value={submit ? 'sending' : 'update'} />
</form>

<style>

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

    .button {
        align-self: center;
    }

    textarea {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #fff;
    }

    .button {
        align-self: center;
    }
</style>