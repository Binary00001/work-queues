<script>
  import Search from '$lib/components/Search.svelte'
  import NavBtn from '$lib/components/NavBtn.svelte'

  import logo from '/imaginetics_logo.png'

</script>

<div class="nav-container">
    <NavBtn x={{url: '/dept', title: 'Depts'}} />
    <NavBtn x={{url: '/dept/doc-control', title: 'Doc Control'}} />
</div>