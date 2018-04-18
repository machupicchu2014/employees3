<template>
<div class="about">
<h2>Welcome!</h2>
<p>Employee Manager 2.0 is the best Employee Management Software available on the market today. And,
  the best part is, it's free! Through the magic of Vue and Node, you can easily add all your employees to
  this highly secure database!</p>
  <br>
  <h2>Login:</h2>
  <form v-on:submit.prevent="login">
  <input v-model="loginUser" placeholder="User Name"></input><br>
  <input v-model="loginPassword" placeholder="Password"></input><br>
  <input type="Submit"></input>
  </form>
  <br>
  <h2>Or Register:</h2>
  <form v-on:submit.prevent="register">
  <input placeholder="Name" v-model="registerName"></input><br>
  <input placeholder="User Name" v-model="registerUser"></input><br>
  <input placeholder="Password" v-model="registerPassword"></input><br>
  <input type="Submit"></input>
  </form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      loginUser: '',
      loginPassword: '',
      registerName: '',
      registerUser: '',
      registerPassword: '',
    }
  },
  methods: {
    register: function() {
      this.$store.dispatch('register', {
        name: this.registerName,
        username: this.registerUser,
        password: this.registerPassword,
      }).then(user =>{
        this.registerName = '';
        this.registerUser = '';
        this.registerPassword = '';
      })
    },
    login: function() {
      this.$store.dispatch('login', {
        username: this.loginUser,
        password: this.loginPassword,
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.about p{
  text-align: center;
  margin-left: 100px;
  margin-right: 100px;
}

.about {
  text-align: center;
  margin-top:100px;
}

.features p{
  margin-bottom: 2px;
  margin-left: 60px;
  margin-right: 60px;
}
h2{
  text-align: center;
}
</style>
