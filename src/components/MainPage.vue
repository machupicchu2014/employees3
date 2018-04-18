<template>
<div class="stuff">
  <employee-list v-if="loggedIn"/>
  <hello-world v-else/>
  </div>
</template>

<script>
import HelloWorld from './HelloWorld';
import EmployeeList from './EmployeeList';
export default {
  name: 'MainPage',
  components: {HelloWorld, EmployeeList},
  computed: {
    loggedIn: function(){
      return this.$store.getters.loggedIn;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
