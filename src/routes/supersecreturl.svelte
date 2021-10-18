<script context='module'>
  let time = new Date(Date.now()).toLocaleString()
  console.log(`{visited: ${time}}`)
</script>

<script>

  import { onMount, onDestroy } from 'svelte'
  import { fly } from 'svelte/transition'

    

    //temp future content
    let first = [
      "Good morning adventurer.",
      "I see you're finally awake",
      "You have been asleep for quite some time."
    ]

    let text = [
      'First things first, Good Morning Beautiful!',
      'I hope you were able to get some amazing sleep last night.',
      'Talking to you about your schooling makes me so happy for you.',
      'You are out there doing big things and taking huge steps in your life.',
      'There so many amazing things about you and that\'s just one of them.',
      'Working next to you yesterday was a lot of fun.',
      'Thanks for putting up with me :)',
      'All the positive vibes for you today'
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
    <img src="https://media1.giphy.com/media/10hO3rDNqqg2Xe/giphy.gif" alt="running man party hard GIF" style="width: 500px; height: 262.5px;">
    <div class="text">
      <h1>This time it really is Friday!!!!</h1>
      <p>Not sure if you're gonna come in today and see this :|</p>
      <p>Either way, hopefully today is a great day for you.</p>
      <p>It seems like this week has been unkind to you and you could really use a normal fucking day.</p>
      <p>Selfishly I missed seeing your face around here yesterday after lunch.</p>
      <!-- <p>Soon enough you will be onto bigger and better things and this place will be lonely</p> -->
      <p>Sending you all the good vibes I can :)</p>
      <p>Have a wonderful day!</p>
      <p></p>
    </div>
  </div>
{/if}
      <!-- <img class='gif' src="https://media0.giphy.com/media/HYT1M1YCPI9KE/giphy.gif" alt="mario kart GIF" style="width: 500px; height: 408.621px;"> -->



<style>
    .main {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: row;
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