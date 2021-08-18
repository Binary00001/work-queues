<script context="module">

    export async function load({fetch}) {

        const res = await fetch('http://192.168.0.39:5000/api',
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
    import Dept from '$lib/Dept.svelte'
    export let data = '';
    // console.log(data)
</script>

<main>
    <!-- super janky  -->
    <Dept dept={'600'} parts={data.filter(dept => dept.op_center == '0600        ').slice(0, 5)} />
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
    <Dept dept={'642'} parts={data.filter(dept => dept.op_center == '0642        ').slice(0, 5)} />

</main>

<style>
   main {
      display: flex;
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
      /* align-items: flex-start; */
}
</style>