<script>
    import { goto } from '$app/navigation';
    import { partList, searching } from '$lib/sessionStore'
    let part = ''

    async function getPart() {
        try {
            goto('/', {replaceState: true})
            searching.set(true)
            const data = await fetch(`/api/parts/${part}.json`, 
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'content-type': 'application/json'
                }
            }
            )

            if (data.ok) {
                let parts = await data.json()
                // console.log(data)
                partList.set(parts)
            }


        } catch (error) {
            console.log(error.message)
            throw error
        } finally {
            searching.set(false)
            part = ''
        }
            
    }
</script>

<form action='submit' method='GET' on:submit|preventDefault={getPart}>
    <label for="part-search"></label>
    <input type="text" name='part-search' id='part-search' bind:value={part}/>
    <button type='submit'>Search Parts</button>
</form>
