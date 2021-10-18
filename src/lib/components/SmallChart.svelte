<script>
    import Line from 'svelte-chartjs/src/Line.svelte'
    export let labels 
    export let data
    export let dailyGoal

    let dataLine = {
        labels,
        datasets: [
            {
                label: 'Jobs Completed',
                fill: false,
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
            },
            {
                label: 'Daily Goal',
                lineTension: 0.3,
                fill: false,
                borderColor: 'rgba(158, 130, 255, .8)',
                data: dailyGoal
            }
        ]
    }
</script>
    <div>
        <Line data={dataLine} options={{ responsive: true, scales: { yAxes: [{ticks: {display: false}}], xAxes: [{ticks: {display: false}}]}, legend: {display: false} }} />
    </div>

<style>
    * {
        text-align: center;
    }

    div {
        background-color: white;
    }
</style>