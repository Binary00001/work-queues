<script>
    import Line from 'svelte-chartjs/src/Line.svelte'
    export let labels 
    export let data

    let dataLine = {
        labels,
        datasets: [
            {
                label: 'Jobs Completed Per Day',
                fill: true,
                lineTension: 0.3,
                backgroundColor: "rgba(225, 204,230, .3)",
                borderColor: "rgb(205, 130, 158)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgb(205, 130,1 58)",
                pointBackgroundColor: "rgb(255, 255, 255)",
                pointBorderWidth: 10,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgb(0, 0, 0)",
                pointHoverBorderColor: "rgba(220, 220, 220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data
            }, 
            {
                label: '',
                fill: false,
                borderColor: "rgba(0, 0, 0, 0)",
                data: [0, 80]
            }
        ]
    }
</script>
        <Line data={dataLine} options={{ responsive: true }} />

<style>

</style>