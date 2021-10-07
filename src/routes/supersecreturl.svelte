<script>

  import { onMount, onDestroy } from 'svelte'
  import { fly } from 'svelte/transition'

    let time = new Date(Date.now()).toLocaleString()
    console.log(`{visited: ${time}}`)

   


    let mounted = false
    let view = 'choice'

    const chooseView = (choice) => {
      view = choice
      console.log(choice)
    }

  onMount(() => {
    mounted = true
  })
    
</script>


{#if mounted}
  <div class="main">
    {#if view == 'choice'}
      <div class="choice" in:fly={{x: -200, duration: 1000}}>
        <h4>Dislcaimer: Your choice</h4>
        <div class="btn-container">
          <button on:click={() => chooseView('accept')}>Accept</button>
          <button on:click={() => chooseView('decline')}>Decline</button>
        </div>
      </div>
    {:else if view == 'decline'}
    <div style="flex-direction: column; text-align: center;"
      in:fly={{x: -200, duration: 1000}}
      >
      <img src="https://media0.giphy.com/media/LrmU6jXIjwziE/giphy.gif" alt="rick roll GIF" style="width: 500px; height: 375px;">
      <h4>Have A Good Day Brittany</h4>
    </div>
    {:else if view == 'accept'}
      <div class="text"
        in:fly={{x: -200, duration: 1000}}
        >
        <h3>Good Fucking Morning!</h3>
        <p>If you are reading this I gave you the option... :)</p>
        <p>I was conflicted about whether or not to write another one, but I gave you an out ahead of time...</p>
        <p>Thank you.</p>
        <p>Thank you for being the one positive thing about coming to work.</p>
        <p>Thank you for keeping the negativity from becoming overwhelming.</p>
        <p>Thank you for sharing your smile and laugh and that complexity in your eyes.</p>
        <p>Thank you for showing your strength in not backing down to the assholes and instead showing up and proving yourself every fucking day.</p>
        <p>Thank you for making me smile</p>
        <p>Thank you for being you.</p>
        <p>Have another wonderful day, Brittany.</p>
      </div>    
    {/if}

  </div>
{/if}
      <!-- <img class='gif' src="https://media0.giphy.com/media/HYT1M1YCPI9KE/giphy.gif" alt="mario kart GIF" style="width: 500px; height: 408.621px;"> -->



<style>
    .main {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: center;
        background: linear-gradient(to bottom right, white, slategray, lightgrey, tomato);
        font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-weight: 300;
      }

      .btn-container {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }

      ul {
        text-align: center;
      }
      ul li {
        list-style-type: none;
        margin: none;
      }

    .text {
      text-align: center;
      padding: 25px;
      color: #1f1f1f;
    }

    .gif {
      height: 375px;
      width: 400px;
      box-shadow: -10px -10px rgba(0, 0, 0, .5)
    }
   
</style>