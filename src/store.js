import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    loggedIn: false,
    error: "",
    employees: [],
  },
  getters: {
    user: state => state.user,
    loggedIn: state => state.loggedIn,
    employees: state => state.employees,
    error: state => state.error,
  },
  mutations: {
    setUser(state,user){
      state.user = user;
    },
    setLogin(state,status){
      state.loggedIn = status;
    },
    setEmployees(state, employees){
      state.employees = employees;
    },
    setError(state, err){
      state.error = err;
    }
  },
  actions: {
    register(context,user){
      axios.post("/api/user",user).then(response => {
        context.commit('setUser', response.data.user);
        context.commit('setLogin', true);
        context.commit('setError', "");
      }).then(result => {
        context.dispatch('getEmployees');
      }).catch(error => {
        context.commit('setError', "Error registering.");
      })
    },
    login(context,user){
      axios.post("/api/login",user).then(response => {
        context.commit('setUser', response.data.user);
        context.commit('setLogin', true);
        context.commit('setError', '');
        return true;
      }).then(result => {
        context.dispatch('getEmployees');
      }).catch(error => {
        context.commit('setError', "Error with login.");
      })
    },
    logout(context){
      context.commit('setUser', {});
      context.commit('setLogin', false);
    },
    getEmployees(context){
      console.log("Getting employees");
      axios.get("/api/users/" + context.state.user.id + "/employees").then(response => {
        context.commit('setEmployees',response.data.employees);
      }).catch(err => {
        console.log("getEmployees failed.");
      })
    },
    addEmployee(context,employee){
      axios.post("/api/users/" + context.state.user.id + "/employees",employee).then(response => {
        return context.dispatch('getEmployees');
      }).catch(err => {
        console.log("addEmployee failed");
      })
    },
    updateEmployee(context, employee) {
      axios.put("/api/users/" + context.state.user.id + "/employees/" + employee.id,employee).then(response => {
        return context.dispatch('getEmployees');
      }).catch(err => {
        console.log(err);
      })
    },
    deleteEmployee(context, employee) {
      axios.delete("/api/users/" + context.state.user.id + "/employees/" + employee).then(response => {
        return context.dispatch('getEmployees');
      }).catch(err => {
        console.log(err);
      })
    }

  }
});
