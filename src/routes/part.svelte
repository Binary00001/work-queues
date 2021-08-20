<script>
    export let part = {
        number: "123A1234-1",
        run: 2,
        po: "211222",
        item: 1,
        comments: "This is a test comment",
        exp: 'N'
    };

    const addComment = () => {

    }
</script>

<main>
    <form type="submit">
        <p>Part Number: {part.number}</p>
        <p>Run: {part.run}</p>
        <p>PO #: {part.po} Line Item: {part.item}</p>
        <label for="comments">Comments 
            <input type="text" id="comments" name="comments" bind:value={part.comments}>
        </label>
        <label for="deleteComment">Delete
            <input type="checkbox" value="Delete">
        </label><br />
        <button>Update</button>
    </form>
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