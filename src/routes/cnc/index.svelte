<script context="module">

    export async function load({fetch}) {

        const res = await fetch('http://192.168.0.39:5000/api/kyle',
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
    // import Dept from '$lib/Dept.svelte'
    export let data = '';
    // console.log(data)
</script>

<main>
    <!-- super janky  -->
    <!-- <Dept dept={'600'} parts={data.filter(dept => dept.op_center == '0600        ').slice(0, 5)} />
    <Dept dept={'602'} parts={data.filter(dept => dept.op_center == '0602        ').slice(0, 5)} />
    <Dept dept={'603'} parts={data.filter(dept => dept.op_center == '0603        ').slice(0, 5)} />
    <Dept dept={'604'} parts={data.filter(dept => dept.op_center == '0604        ').slice(0, 5)} />
    <Dept dept={'605'} parts={data.filter(dept => dept.op_center == '0605        ').slice(0, 5)} />
    <Dept dept={'607'} parts={data.filter(dept => dept.op_center == '0607        ').slice(0, 5)} />
    <Dept dept={'611'} parts={data.filter(dept => dept.op_center == '0611        ').slice(0, 5)} />
    <Dept dept={'624'} parts={data.filter(dept => dept.op_center == '0624        ').slice(0, 5)} />
    <Dept dept={'625'} parts={data.filter(dept => dept.op_center == '0625        ').slice(0, 5)} />
    <Dept dept={'630'} parts={data.filter(dept => dept.op_center == '0630        ').slice(0, 5)} />
    <Dept dept={'631'} parts={data.filter(dept => dept.op_center == '0631        ').slice(0, 5)} />
    <Dept dept={'632'} parts={data.filter(dept => dept.op_center == '0632        ').slice(0, 5)} />
    <Dept dept={'640'} parts={data.filter(dept => dept.op_center == '0640        ').slice(0, 5)} />
    <Dept dept={'642'} parts={data.filter(dept => dept.op_center == '0642        ').slice(0, 5)} /> -->
        <div class="table">
            <h1 class="dept">Machine Shop</h1>
            <table>
                <thead>
                    <th>Work Center</th>
                    <th>Part Number</th>
                    <th>Run</th>
                    <th>Quantity</th>
                    <th>Set Up Time</th>
                    <th>Run Time</th>
                    <th>Priority</th>
                </thead>
                <tbody>
                    {#each data as part}
                    <tr class:hot={part.priority === 5}>
                        <td>{part.op_center}: {part.work_center}</td>
                        <td>{part.part_number}</td>
                        <td>{part.run}</td>
                        <td>{part.qty}</td>
                        <td>{part.setup_hours} hrs</td>
                        <td>{part.run_hours} hrs</td>
                        <td>{part.priority}</td>
                    </tr>   
                    {/each}
                </tbody>
            </table>
        </div>

</main>

<style>
     main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-weight: 200;
    }

    .dept {
        text-transform: uppercase;
        font-weight: 100;
        text-align: center;
    }

    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        padding: 5px;
    }

    thead {
        background-color: skyblue;
    }

    tr:hover {
        background-color: yellow;
    }

    .table {
        margin: 10px;
        width: 90%;
    }

    table {
        margin-top: 10px;
        width: 100%;
    }

    .hot {
        background-color: yellow;
    }

</style>