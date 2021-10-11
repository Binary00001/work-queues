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
    {#if spoiler}
      <h2>It's fucking Friday</h2>
      <button on:click={()=> spoiler = false}>Spoiler</button>
    {:else}
    <p>You have made another week enjoyable.</p>
    <p>It's almost time for you to enjoy yourself and forget about this place for a minute.</p>
    <p>You do so much and go so far above what any normal person does, it's crazy.</p>
    <p>The way you are working to get through school, take care of your kids and work a full time job...</p>
    <p>You are a superhero. </p>
    <p>So many sacrifices you make and all the selfless choices to take care of everything is amazing.</p>
    <p>You are just a straight up badass. And a hot one at that.</p>
    <p>You are the real deal, the full package, the deluxe edition with the lifesize statue and signed poster.</p>
    <p>And my analogies suck.</p>
    <p>Enjoy your day and hopefully it is as amazing for you as you are yourself.</p>
    <img src="https://media2.giphy.com/media/JdCz7YXOZAURq/giphy.gif" alt="Party Band GIF" style="width: 500px; height: 281.25px;">
    <p>P.S. If i don't come around as much it is only because I don't want to keep you from working/get you in trouble.</p>
    {/if}
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