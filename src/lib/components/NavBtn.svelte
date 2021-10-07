<script>
    export let x 
</script>

<div class="nav-btn">
    <a href={x.url}>{x.title}</a>
</div>

<style>
    .nav-btn {
        height: 75px;
        width: 75px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 5px;
    }

    .nav-btn a {
        height: 75px;
        width: 75px;
        border: 1px solid #1f1f1f;
        border-radius: 5px;
        box-shadow: 2px 2px #2e2e2e;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        text-decoration: none;
        color: #1f1f1f;
        background-color: #dfdfdf;
    }

    .nav-btn a:hover {
        background-color: #cdcdcd;
    }

    .nav-btn a:active {
        box-shadow: .5px .5px #2e2e2e;
        transform: translateY(2px);
    }
</style>