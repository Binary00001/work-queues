<script>
import { page } from "$app/stores";
import logo from '/imaginetics_logo.png'

let insp = true;

</script>

<div class='header'>
    <h1><a href='/'><img src={logo} alt="imaginetics logo" style="background-color: slategrey;"></a></h1>
    <ul class='nav-links'>
       
        <li><a href="/burndown" style="color: darkred;">Burndown</a></li>
        <li><a href="/cnc">Machine Shop</a></li>
        <li><a href="/production/2200" target="_parent">Assembly</a></li>
        <li><a href="/finish/paint">Paint</a></li>
        <li class:active={page.params === "insp%20cnc"}><a href="/production/2005" target="_parent">CNC Inspection</a></li>
        <li class:active={page.params === "insp%20sheet"}><a href="/production/2000" target="_parent">Sheet Metal Inspection</a></li>
        <li class:active={page.params === "insp%20prime"}><a href="/production/5030" target="_parent">Primer Inspection</a></li>
        <li class:active={page.params === "insp%20tc"}><a href="/production/5035" target="_parent">Top Coat Inspection</a></li>
        <li class:active={page.params === "insp%20assy"}><a href="/production/2050" target="_parent">Assembly Inspection</a></li>
        <li><a href='/production/1600' target="_self">Deburr</a></li>
        <li class:active={page.params === "part%20mark"}><a href="/production/2300" target="_parent">Part Mark</a></li>
        <li class:active={page.params === "final%20insp"}><a href="/production/2060" target="_parent">Final Inspection</a></li>
        <li class:active={page.params === "package"}><a href="/production/2400" target="_parent">Shipping</a></li>
    </ul>
</div>

<style>
    * {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    h1 {
        font-weight: 100;
    }

    .header {
        display: flex;
        flex-direction: column;
        border-bottom: .5px solid black;
        background: slategray;
        padding: 10px;
    }

    .nav-links {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .nav-links li {
        list-style-type: none;
        flex-wrap: wrap;
        padding: 5px;
    }

    a {
        text-decoration: none;
        color: lightgrey;
    }

    a:hover {
        color: white;
    }

    a:active {
        color: white;
    }
</style>