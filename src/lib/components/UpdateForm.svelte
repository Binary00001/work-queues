<script>
    export let part
    let add = !part.comments

    let mutated = part

    let submit = false;

    function handlePost() {
        try {
        fetch('/api/insert', {
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
            add = false
            // alert('Comment successfully added')
        }
    }

    function handleDel() {
        try {
            mutated.comments = null
            fetch('/api/delete', {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(part)
            })
        } catch (err) {
            throw err
        } finally {
            add = true
            console.log('deleted')
        }
    }

    function handlePut() {
        try {
            fetch('/api/update', {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(mutated)
            })
        } catch (err) {
            alert(`Error: ${err.message}`)
            throw err
        } finally {
            console.log('success')
        }
    }
</script>

<form type="submit" class="new_comment" method="post" on:submit|preventDefault={handlePost}>

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
        <input type="text"class='box-sm' bind:value={part.item} />
    </label>

    <label for="exp">Customer Expedite:{' '}
        <input type="text"class='box-sm' bind:value={part.expedite} />
    </label>

    
    <label for="comments">Comments: 
        <textarea 
         id="comments" 
         name="comments"
         rows="4" 
         cols="50"
         bind:value={mutated.comments}></textarea>
    </label>

    <div class="btn-group">
        {#if add}
            <input class='btn' type="submit" value={submit ? 'sending' : 'Add Comment'} />
        {:else}
            <button class='btn' on:click|preventDefault={handlePut}>Update</button>
            <button class='btn btn-danger' on:click|preventDefault={handleDel}>Delete Comment</button>
        {/if}
    </div>  
</form>

<style>

/* .sending:after {
        content: '.';
        animation: dots 2s steps(4, end)  infinite;
    } */
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
    
    .box-sm {
        width: 2rem;
        text-align: center;
    }

    .btn {
        align-self: center;
    }

    textarea {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #fff;
    }

    .btn-danger {
        color: red;
    }

    .btn-group {
        align-self: center;
    }
</style>