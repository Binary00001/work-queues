<script>
import { page } from "$app/stores";
import logo from '/imaginetics_logo.png'

let insp = true;

</script>

<div class='header'>
    <h1><a href='/'><img src={logo} alt="imaginetics logo" style="background-color: slategrey;"></a></h1>
    <div class='nav-links'>
       <!-- let's make a dropdown to de-clutter this clusterfuck -->
       <div>
        <a href="/burndown" style="color: darkred;" target='_parent'>Burndown</a>
       </div>
        <!-- dropdowns -->
        <!-- Assembly -->
        <div class="dropdown">
            <a class='dropdown-btn' href='#'>Assembly</a>
            <div class="dropdown-menu">
                <a href="/production/0301" target='_parent'>Stores ID & Issue</a>
                <a href="/production/0302" target='_parent'>Assembly ID & Issue</a>
                <a href="/production/2200" target="_parent">Assembly</a>
                <a href="/production/2650" target="_parent">Assembly Countersink</a>
                <a href="/production/2300" target="_parent">Part Mark</a>
                <a href="/production/5075" target="_parent">Part Mark Overcoat</a>
            </div>
        </div>
        <!-- Sheet Metal -->
        <div class="dropdown">
            <a class="dropdown-btn" href='#'>Sheet Metal</a>
            <div class="dropdown-menu">
                <a href="/production/0300" target='_parent'>Material ID & Issue</a>
                <a href="/production/0401" target='_parent'>Shear</a>
                <a href="/production/0500" target='_parent'>Saw</a>
                <a href="/production/0700" target="_parent">CNC PUNCH</a>
                <a href="/production/0750" target="_parent">AMADA 2510NT</a>
                <a href="/production/0900" target="_parent">Punch Press</a>
                <a href="/production/0950" target="_parent">Hot Joggle</a>
                <a href="/production/1000" target="_parent">Hydroform</a>
                <a href="/production/1100" target="_parent">Roll Form</a>
                <a href="/production/1200" target="_parent">Notcher</a>
                <a href="/production/1400" target="_parent">Router</a>
                <a href="/production/1600" target="_parent">Deburr</a>
                <a href="/production/5600" target="_parent">Abrasive Blast</a>
                <a href="/production/1800" target="_parent">Straightening</a>
            </div>
        </div>
        <!-- Inspection -->
        <div class="dropdown">
            <a class="dropdown-btn" href='#'>Inspection</a>
            <div class="dropdown-menu">
                <a href="/production/2000" target="_parent">Insp Sheet Metal</a>
                <a href="/production/2005" target="_parent">Insp CNC</a>
                <a href="/production/2020" target="_parent">Insp Heat Treat</a>
                <a href="/production/2040" target="_parent">Insp Finish</a>
                <a href="/production/5030" target="_parent">Insp Prime</a>
                <a href="/production/5035" target="_parent">Insp Topcoat</a>
                <a href="/production/5099" target="_parent">IMAG CERT</a>
                <a href="/production/2050" target="_parent">Insp Assembly</a>
                <a href="/production/2060" target="_parent">Insp Final</a>
            </div>
        </div>
        <!-- Machine Shop -->
        <div class="dropdown">
            <a class="dropdown-btn" href='/cnc' target="_parent">Machine Shop</a>
            <div class="dropdown-menu">
                <a href="/production/0611" target="_parent">VF1 3-Axis</a>
                <a href="/production/0600" target="_parent">VF2 3-Axis</a>
                <a href="/production/0603" target="_parent">VF6 3-Axis</a>
                <a href="/production/0640" target="_parent">VF6 5-Axis</a>
                <a href="/production/0607" target="_parent">VF7 3-Axis</a>
                <a href="/production/0605" target="_parent">VF10 3-Axis</a>
                <a href="/production/0625" target="_parent">VF10 4-Axis</a>
                <a href="/production/0604" target="_parent">VX-1000 3-Axis</a>
                <a href="/production/0624" target="_parent">VX-1500 4-Axis</a>
                <a href="/production/0630" target="_parent">EC 400 Horizontal</a>
                <a href="/production/0631" target="_parent">EC 400 Pallet Pool</a>
                <a href="/production/0602" target="_parent">Mori Seki 3-Axis</a>
                <a href="/production/0632" target="_parent">Okuma MB 5000</a>
                <a href="/production/0642" target="_parent">Okuma 5-Axis</a>
            </div>
        </div>
        <!-- Paint Shop -->
        <div class="dropdown">
            <a href="/finish/paint" target='_parent' class="dropdown-btn">Building 2</a>
            <div class="dropdown-menu">
                <a href="/production/5225" target='_parent'>Penetrant Inspect</a>
                <a href="/production/5010" target='_parent'>Chemline</a>
                <a href="/production/5020" target='_parent'>Masking</a>
                <a href="/production/5045" target='_parent'>Primer</a>
                <a href="/production/5050" target='_parent'>Topcoat</a>
                <a href="/production/5080" target='_parent'>Rework</a>
                <a href="/production/5085" target='_parent'>Minor Touch Up</a>
            </div>
        </div>
        <a href="/production/2400" target="_parent">Shipping</a>
    </div>
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
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .nav-links a {
        list-style-type: none;
        flex-wrap: wrap;
        padding: 5px;
    }

    a {
        text-decoration: none;
        color: #e1e1e1;
    }

    a:hover {
        color: #ffffff;
    }

    a:active {
        color: white;
    }

    .dropdown:hover .dropdown-menu {
        display: flex;
        flex-direction: column;
        position: absolute;
        background-color: rgba(112, 128, 144, 1);
        padding: 1em;
        border-bottom-right-radius: 15px;
        box-shadow: 2px 2px rgba(0, 0, 0, .7);
    }

    .dropdown-menu {
        display: none;
    }
</style>