<script>
import { page } from "$app/stores";
import logo from './imaginetics_logo.png'

</script>

<div class='header'>
    <h1><a href='/'><img src={logo} alt="imaginetics logo"></a></h1>
    <ul class='nav-links'>
        <li class:active={page.params === "insp%20cnc"}><a href="/dept/insp%20cnc" target="_parent">CNC Inspection</a></li>
        <li class:active={page.params === "insp%20sheet"}><a href="/dept/insp%20sheet" target="_parent">Sheet Metal Inspection</a></li>
        <!-- <li class:active={page.params === "trevor"}><a href="/dept/trevor" target="_parent">Assembly</a></li> -->
        <li class:active={page.params === "insp%20prime"}><a href="/dept/insp%20prime" target="_parent">Primer Inspection</a></li>
        <li class:active={page.params === "insp%20tc"}><a href="/dept/insp%20tc" target="_parent">Top Coat Inspection</a></li>
        <li class:active={page.params === "insp%20assy"}><a href="/dept/insp%20assy" target="_parent">Assembly Inspection</a></li>
        <li class:active={page.params === "part%20mark"}><a href="/dept/part%20mark" target="_parent">Part Mark</a></li>
        <li class:active={page.params === "final insp"}><a href="/dept/final%20insp" target="_parent">Final Inspection</a></li>
        <!-- <li class:active={page.params === "package"}><a href="/dept/package" target="_parent">Shipping</a></li> -->
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
    }

    .nav-links {
        display: flex;
        justify-content: space-around;
    }

    .nav-links li {
        list-style-type: none;
    }

    a {
        text-decoration: none;
        color: black;
    }

    a:hover {
        color: tomato;
    }
</style>