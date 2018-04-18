<template>
<nav>
<ul>
  <li class="header">Employee Manager 3.0</li>
  <li class="rightlink" v-if="loggedIn" v-on:click="logout()"><a href="#">Log Out</a></li>
</ul>
</nav>

</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    logout: function(){
      console.log("logging out");
      this.$store.dispatch('logout');
    },
    },
    computed: {
      loggedIn: function(){
        return this.$store.getters.loggedIn;
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav {
background-color: black;
}
nav ul{
  list-style-type: none;
  background-color: #4a638c;
  width: 100%;
  left: 0;
  top: 0;
  position: fixed;
  margin: 0;
  padding: 20px;
  text-align: center;

}
.header{
  font-size: 20px;
  font-family: 'Kaushan Script', cursive;
  float: left;
  font-weight: bold;
}
nav li {
  color: white;
  display: inline-block;
}
nav a{
  padding: 10px;
  text-decoration: none;
  color: white;
}

.rightlink{
    float: right;
    margin-right: 10px;
}

nav li a:hover{
  text-decoration: underline;
  color: white;
}
</style>
