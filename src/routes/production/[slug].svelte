<script context="module">
    
    export async function load({page, fetch}) {
        let dept = page.params.slug

        const res = await fetch(`/dept/${dept}.json`, 
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        })

        if (res.ok) {
            const data = await res.json()
            // console.log(data)
            return {
                props: { 
                    data, dept
                }
            }
        }

        console.log('nothing')
    }
</script>

<script>
    export let data
    export let dept
//     console.log(dept)
// console.log(data.body)
</script>

<h1>this is a test page</h1>
{#each data as job}
    <p>{job.part_number}</p>
{/each}