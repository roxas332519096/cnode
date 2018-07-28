<template>
  <div id="app">
      <headerbar></headerbar>
      <main>
        <router-view name="main"></router-view>
        <router-view name="aside"></router-view>
      </main>
  </div>
</template>

<script>

import headerbar from './components/headerbar'
export default {
  name: 'App',
  components:{
    headerbar,
  }
}

</script>

<style>

*{
	margin: 0;
	padding: 0;
}

*{
	box-sizing: border-box;
}
*::after{
	box-sizing: border-box;
}
*::before:{
	box-sizing: border-box;
}

ol,ul,li{
	list-style: none;
}

a {
	text-decoration: none;
	display: inline-block;
	color: inherit;
}

img {
	border: none;
}

.clearfix::after{
    content: "";
    display: block;
    clear: both;
}

input {
	font-size: inherit;
	border: none;
}

main {
  position: relative;
  width: 100%;
  min-width: 1200px;
  padding: 15px 13%;
  background: rgb(225, 225, 225);
}

.slidebar {
  position: absolute;
  top: 5px;
  left: 71%;
}

</style>
