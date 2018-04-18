import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

const getAuthHeader = () => {
  return {headers: {'Authorization': localStorage.getItem('token')}};
}

export default new Vuex.Store({
  state: {
    user: {},
    token: '',
    error: "",
    employees: [],
  },
  getters: {
    user: state => state.user,
    token: state => state.token,
    loggedIn: state => {
      if(state.token === '') return false
      return true;
    },
    employees: state => state.employees,
    error: state => state.error,
  },
  mutations: {
    setUser(state,user){
      state.user = user;
    },
    setToken(state,token){
      state.token = token;
      if(token === '') localStorage.removeItem('token');
      else localStorage.setItem('token', token);
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
        context.commit('setToken', response.data.token);
        context.commit('setError', "");
      }).then(result => {
        context.dispatch('getEmployees');
      }).catch(error => {
        context.commit('setError', "Error registering.");
        context.commit('setToken', '');
        context.commit('setUser', {})
      })
    },
    login(context,user){
      axios.post("/api/login",user).then(response => {
        context.commit('setUser', response.data.user);
        context.commit('setToken', response.data.token);
        context.commit('setError', '');
        return true;
      }).then(result => {
        context.dispatch('getEmployees');
      }).catch(error => {
        context.commit('setError', "Error with login.");
        context.commit('setToken', '');
        context.commit('setUser', {})
      })
    },
    logout(context){
      context.commit('setUser', {});
      context.commit('setToken', '');
    },
    getEmployees(context){
      console.log("Getting employees");
      axios.get("/api/users/" + context.state.user.id + "/employees",getAuthHeader()).then(response => {
        context.commit('setEmployees',response.data.employees);
      }).catch(err => {
        console.log("getEmployees failed.");
      })
    },
    addEmployee(context,employee){
      axios.post("/api/users/" + context.state.user.id + "/employees",employee,getAuthHeader()).then(response => {
        return context.dispatch('getEmployees');
      }).catch(err => {
        console.log("addEmployee failed");
      })
    },
    updateEmployee(context, employee) {
      axios.put("/api/users/" + context.state.user.id + "/employees/" + employee.id,employee,getAuthHeader()).then(response => {
        return context.dispatch('getEmployees');
      }).catch(err => {
        console.log(err);
      })
    },
    deleteEmployee(context, employee) {
      axios.delete("/api/users/" + context.state.user.id + "/employees/" + employee,getAuthHeader()).then(response => {
        return context.dispatch('getEmployees');
      }).catch(err => {
        console.log(err);
      })
    },
    initialize(context){
      let token = localStorage.getItem('token');
      if(token){
        axios.get("/api/me", getAuthHeader()).then(response => {
          context.commit('setToken', token);
          context.commit('setUser',response.data.user);
          console.log("hello");
        }).then(result => {
          console.log("dumb");
          context.dispatch('getEmployees');
        }).catch(error => {
          localStorage.removeItem('token');
          context.commit('setToken', '');
          context.commit('setUser',{});
        });
      }
    },

  }
});
