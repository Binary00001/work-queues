<script>

  import { onMount, onDestroy } from 'svelte'
  import { fly } from 'svelte/transition'

    let time = new Date(Date.now()).toLocaleString()
    console.log(`{visited: ${time}}`)

    //temp future content
    let first = [
      "Good morning adventurer.",
      "I see you're finally awake",
      "You have been asleep for quite some time."
    ]

   


    let mounted = false
    let spoiler = true

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
      <img src="https://media1.giphy.com/media/Azaj7mTthLESMKL9s1/giphy.gif" alt="Chibi GIF" style="width: 487.05px; height: 573px;">
    <h1>BRITTANY!!!!!!</h1>
    <p>Hey there amazing woman!</p>
    <p>Today is another day for you to be the shining star you are.</p>
    <p>I hope you got a chance to relax and enjoy yourself last night!</p>
    <p>This will be a better day for you than yesterday.</p>
    <p>Just remember, you will be out of this hell shortly and they will be sorry they didn't treat you better.</p>
    <p>Have a wonderful day you wonderful nerd.</p>
  </div>
{/if}
      <!-- <img class='gif' src="https://media0.giphy.com/media/HYT1M1YCPI9KE/giphy.gif" alt="mario kart GIF" style="width: 500px; height: 408.621px;"> -->



<style>
    .main {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
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