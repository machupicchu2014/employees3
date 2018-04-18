<template>
  <div id="app">
    <nav-bar/>
    <router-view/>
    <footer>
      <p>Copyright yesterday. Check out my <a href="https://github.com/machupicchu2014/employees3">github.</a></p>
    </footer>
  </div>
</template>

<script>
import NavBar from './components/NavBar';
export default {
  name: 'App',
  components: {NavBar},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
footer {
  position: fixed;
  left: 0px;
  bottom: 0px;
  text-align: center;
  width: 100%;
  background-color: #EBEBEB;
  margin-top: 20px;
}

footer p{
  margin-top: 20px;
}
</style>
