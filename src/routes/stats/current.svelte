<script context="module">

    export async function load({fetch}) {
        const res = await fetch('/api/stats/current', 
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
                props: { data }
            }
        }
    }
</script>

<script>
    export let data

    let sorted = data.sort((a, b) => a.PREMNUMBER - b.PREMNUMBER)
    // console.log(sorted)
</script>

<div class="main">
    {#if data}
    <h1>CURRENT LOGINS</h1>
        <table>
            <thead>
                <th>Employee</th>
                <th>Part Number</th>
                <th>Run</th>
            </thead>
            <tbody>
                {#each sorted as current}
                    <tr>
                        <td>{current.EMPLOYEE}</td>
                        <td>{current.PARTNUM}</td>
                        <td>{current.ISRUN}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}
</div>
