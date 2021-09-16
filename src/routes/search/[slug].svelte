
<script context="module">
    

    async function load({fetch}) {
        const res = await fetch(`/api/parts/${part}.json`,
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
                props: {
                    data
                }
            }
        }
        
    }

    
   
</script>

<script>
    export let data
</script>

<div>
    <input type="text" bind:value={partNumber} />
    <p>testing: {partNumber}</p>
    <button on:click|preventDefault={() => getParts(partNumber)}>Search</button>

    
    {#if data}
        <p>Something here</p>
    {/if}
</div>