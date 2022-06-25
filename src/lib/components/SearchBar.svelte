<script>
    import { goto } from '$app/navigation';
    import { partList, searching } from '$lib/sessionStore'
    import { api } from '$lib/db'
    let part = ''

    async function getPart() {
        try {
            part = part.replace(/[^a-z0-9]/gi, '')
            console.log("part", part)
            goto('/', {replaceState: true})
            searching.set(true)
            const data = await fetch(`${api}/part/${part}`, 
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
                console.log(parts)
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
