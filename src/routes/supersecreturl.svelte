<script>
    let time = new Date(Date.now()).toLocaleString()
    console.log(`{visited: ${time}}`)
</script>

<main>
    <!--  -->

    <!-- <h1 class="jt --debug">
        <span class="jt__row">
          <span class="jt__text">BRITT</span>
        </span>
        <span class="jt__row jt__row--sibling" aria-hidden="true">
          <span class="jt__text">BRITT</span>
        </span>
        <span class="jt__row jt__row--sibling" aria-hidden="true">
          <span class="jt__text">BRITT</span>
        </span>
        <span class="jt__row jt__row--sibling" aria-hidden="true">
          <span class="jt__text">BRITT</span>
        </span>
      </h1> -->

    <!--  -->
    <!-- <h2>!Brittany!</h2> -->
    <!-- <h3 style="text-align: center;">Everyday in this place is heck, but you being around makes it a pleasure to be here.</h3><br />
    <img src="https://media0.giphy.com/media/inyqrgp9o3NUA/giphy.gif" alt="Happy Bobs Burgers GIF" style="width: 500px; height: 280px;">
    <br />
    <p>I wasn't able to update this at the normal time due to an office full of people </p> -->
    <h1>Bayonetta,</h1>
    <br />
    <p>Thank you for being the one solid piece around here. You keep things from feeling completely overwhelming.</p>
    <p>Have a wonderful Thursday and keep bringin that smile.</p>
    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><img src="/FeelsBadMan.png" style="width: 75px; height: 75px;" alt="FeelsBadMan.png" /></a>
    <br />
    <!-- <p>To make up for it I made today's page a little extra</p> -->
</main>


<style>
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    /*  */
.jt {
  position: relative;
  font-size: 20vmin;
  font-family: 'Staatliches', sans-serif;
  text-transform: uppercase;
  font-display: swap;
  text-shadow: 0 0 10px tomato;
}
.jt__row {
  display: block;
}
.jt__row:nth-child(1) {
  clip-path: polygon(-10% 75%, 110% 75%, 110% 110%, -10% 110%);
}
.jt__row:nth-child(2) {
  clip-path: polygon(-10% 50%, 110% 50%, 110% 75.3%, -10% 75.3%);
}
.jt__row:nth-child(3) {
  clip-path: polygon(-10% 25%, 110% 25%, 110% 50.3%, -10% 50.3%);
}
.jt__row:nth-child(4) {
  clip-path: polygon(-10% 0%, 110% 0%, 110% 25.3%, -10% 25.3%);
}
.jt__row.jt__row--sibling {
  position: absolute;
  top: 0;
  left: 0;
  user-select: none;
  witdh:800px;
}
.jt__text {
    color: tomato;
  display: block;
  transform-origin: bottom left;
  animation: moveIn 2s 0s cubic-bezier(.36,0,.06,1) alternate infinite ;
}
.jt__row:nth-child(1) .jt__text {
  transform: translateY(-0.1em);
}
.jt__row:nth-child(2) .jt__text {
  transform: translateY(-0.3em) scaleY(1.1);
}
.jt__row:nth-child(3) .jt__text {
  transform: translateY(-0.5em) scaleY(1.2) ;
}
.jt__row:nth-child(4) .jt__text {
  transform: translateY(-0.7em) scaleY(1.3) ;
}
.jt__row:nth-child(5) .jt__text {
  transform: translateY(-0.9em) scaleY(1.4) ;
}
.jt__row:nth-child(6) .jt__text {
  transform: translateY(-1.1em) scaleY(1.5) ;
}
@keyframes moveIn {
  50%, 100% { 
    transform: translateY(0em)
  }
  0%   { 
  opacity: 0; 
  filter: blur(10px);
  
  }
  100% { 
  opacity: 1; 
  filter: blur(0px);
  }
}
.debug .jt__row:nth-child(even) {
  color: black;
  background: white;
}
.debug .jt__row:nth-child(odd) {
  color: white;
  background: black;
}
    /*  */
</style>