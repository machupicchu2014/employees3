<template>
<div class="templateBody">
  <div class="wrapper">
    <div class="details">
      <h2>{{header}}</h2>
      <div v-show="editing === true">
      <form>
      <label>Name:</label>
      <input type="text" v-show="editing === true" v-model="name"></input> <br>
      <label>Email:</label>
      <input type="text" v-show="editing === true" v-model="email"></input> <br>
      <label>Job:</label>
      <input type="text" v-show="editing === true" v-model="job"></input> <br>
      <label>Salary:</label>
      <input type="text" v-show="editing === true" v-model="salary"></input> <br>
      <label>Notes:</label>
      <textarea v-show="editing === true" v-model="notes"></textarea> <br>
    </form>
    </div>
    <div class="detailView" v-show="editing === false">
      <p><b>Name:</b> {{name}}</p>
      <p><b>Email:</b><a v-bind:href="'mailto:' + email"> {{email}}</a></p>
      <p><b>Job:</b> {{job}}</p>
      <p><b>Salary:</b> {{salary}}</p>
      <p><b>Notes:</b> {{notes}}</p>
    </div>

    </div>

    <div class="sidebar">
      <h2>Employees</h2>
        <div v-for="item in employees">
          <p class="sidebarname" v-on:click="select(item.name)"> {{ item.name }}</p>
          <p class="subtext">{{ item.job }}</p>
        </div>
    </div>
    <div class="bottom">
    <p class="bottombar" v-on:click="newEmployee()">New Employee</p>
    </div>
    <div class="bottomdetails">
    <p class="bottombar" v-on:click="save()" v-show="adding === true" style=" flex: 1;">Add</p>
    <p class="bottombar" v-on:click="edit()" v-show="adding === false" style=" flex: 1;">{{buttonTitle}}</p>
    <p class="bottombar" v-on:click="deletePerson()" v-show="adding === false" style=" flex: 1;">Lay Off</p>
    <p class="bottombar" v-on:click="deletePerson()" v-show="adding === false" style=" flex: 1;">Fire</p>
    </div>
  </div>
  </div>
</template>

<script>
 export default {
   name: 'EmployeeList',
   data() {
     return {
     name: '',
     tempName: '',
     email: '',
     job: '',
     salary: '',
     notes: '',
     id: 0,
     editing: true,
     adding: true,
     header: 'New Employee',
     about: false,
     buttonTitle: "Edit"
     }
   },
   computed: {
    employees : function() {
      console.log("employee getting now");
      return this.$store.getters.employees;
    },
   },
   methods : {
   save: function(){
     if(this.name === ''){
       window.alert("You have to enter a name.");
     } else {
      this.$store.dispatch('addEmployee', {
          name: this.name,
          email: this.email,
          job: this.job,
          salary: this.salary,
          notes: this.notes,
        }).then(response => {
          this.name = '';
          this.email = '';
          this.job = '';
          this.salary = '';
          this.notes = '';
          this.getEmployees();
        }).catch(err => {
        })
        }
      },
      select: function(item){
        for(var x = 0; x < this.employees.length; x++){
          if(this.employees[x].name == item){
            this.name = this.employees[x].name;
            this.email = this.employees[x].email;
            this.job = this.employees[x].job;
            this.salary = this.employees[x].salary;
            this.notes = this.employees[x].notes;
            this.id = this.employees[x].id;
            this.editing = false;
            this.adding = false;
            this.header = "Person Details";
            this.buttonTitle = "Edit";
          }
        }
      },
      edit: function(){
        if(this.editing){
          if(this.name === ''){
            window.alert("You have to enter a name.");
          } else {
            this.editing = false;
            this.$store.dispatch('updateEmployee', {
                name: this.name,
                email: this.email,
                job: this.job,
                salary: this.salary,
                notes: this.notes,
                id: this.id,
              }).then(response => {
              this.getEmployees();
              this.editing = false;
              this.adding = false;
              this.header = "Person Details"
              this.buttonTitle = "Edit";
            }).catch(err => {
            });
          }
        } else {
          this.tempName = this.id;
          this.editing = true;
          this.header = "Editing"
          this.buttonTitle = "Save"
        }
      },
      newEmployee: function(){
        this.name = '';
        this.email = '';
        this.job = '';
        this.salary = '';
        this.notes = '';
        this.editing = true;
        this.adding = true;
        this.header = "New Employee"
    },
    deletePerson: function(){
      console.log(this.id);
      this.$store.dispatch('deleteEmployee',this.id).then(response => {
        this.newEmployee();
      }).catch(err =>{
      });
    },
   },
}

</script>

<style scoped>
.templateBody{
  margin-top: 100px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
}
body{
  background-color: #f4fffa;
}
h1{
  text-align: center;
}
h2{
  text-align: center;
}

.about p{
  text-align: center;
  margin-left: 100px;
  margin-right: 100px;
}

.about {
  text-align: center;
}

.features p{
  margin-bottom: 2px;
  margin-left: 60px;
  margin-right: 60px;
}
button{
  text-align: center;
  margin: 0 auto;
}
#app{
  margin-top: 100px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
}
.wrapper{
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 5px;
  grid-row-gap:0px;
  grid-template-areas:
  "sidebar details"
  "bottom bottomdetails";
  margin: 0 auto;
}

.sidebar{
  grid-area: sidebar;
  background-color: grey;
  padding: 10px;
  background-color: white;
  border-style: solid;
  border-bottom: none;
  height: 430px;
  overflow-y: scroll;
}

.details{
  grid-area: details;
  background-color: grey;
  padding: 10px;
  background-color: white;
  border-style: solid;
  border-bottom: none;
  height: 430px;
  overflow-y: scroll;
}

.bottom{
  grid-area: bottom;
  background: -moz-linear-gradient(top, #eeeeee 0%, #cccccc 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, #eeeeee 0%,#cccccc 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(top bottom, #eeeeee 0%,#cccccc 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  border-style: solid;
  border-top: solid;
  border-top-width: 1px;
  height: 30px;
}

.bottomdetails{
  grid-area: bottomdetails;
  display: flex;
  background: -moz-linear-gradient(top, #eeeeee 0%, #cccccc 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, #eeeeee 0%,#cccccc 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(top bottom, #eeeeee 0%,#cccccc 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  border-style: solid;
  border-top: solid;
  border-top-width: 1px;
  height: 30px;
}

.leftlink{
    float: left;
}

.rightlink{
    float: right;
    margin-right: 10px;
}

#update{
  float: left;
  margin-left: 20px;
  margin-top: 6px;
}

.rightlink a {
  font-size: 20px;
  font-family: 'Kaushan Script', cursive;
}

.details h2{
  text-align: center;
}

.selected{
  font-size: 50px;
}

.sidebarname:hover{
  text-decoration: underline;
  cursor: pointer;
}

.sidebarname{
  margin-bottom: 0px;
}

.subtext{
  color: grey;
  font-size: small;
  margin-top: 0px;
}

.bottombar{
  font-size: 15px;
  margin-top: 2px;
  text-align: center;
}

.bottombar:hover{
  text-decoration: underline;
  cursor: pointer;
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

nav li {
  color: white;
  display: inline-block;
}

.header{
  font-size: 20px;
  font-family: 'Kaushan Script', cursive;
  float: left;
  font-weight: bold;
}


nav a{
  padding: 10px;
  text-decoration: none;
  color: white;
}

nav li a:hover{
  text-decoration: underline;
  color: white;
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

ul {
  list-style-position: inside;
  text-align: center;
}

textarea{
  vertical-align: top;
  height: 12em;
  width: 30em;
  resize: none;
}

input{
  width: 30em;
}

.button{
  width: 10em;
  text-align: center;
}

label{
  text-align: right;
  display: inline-block;
  width: 50px;
}

.detailView p{
  width: 500px;
}

@media (max-width: 800px) {

  nav ul{
    list-style-type: none;
    background-color: #4a638c;
    width: 100%;
    left: 0;
    top: 0;
    position: absolute;
    margin: 0;
    padding: 20px;
    text-align: center;

  }

  nav li {
    color: white;
    display: inline-block;
  }


  .wrapper{
    grid-template-rows: 1fr;
    grid-template-areas:
    "sidebar"
    "bottom"
    "details"
    "bottomdetails";
  }
  div.sidebar{
    width: 600px;
    margin-left: 30px;
  }

  div.details{
    width: 600px;
    margin-left: 30px;
  }

  div.bottom{
    width: 600px;
    margin-left: 30px;
    margin-bottom: 10px;
  }

  div.bottomdetails{
    width: 600px;
    margin-left: 30px;
    margin-bottom: 10px;
  }

  textarea{
    height: 12em;
  }
  footer {
    position: static;
    padding-top: 5px;
    background-color: #f4fffa;
  }

}

@media (max-width: 600px) {
  label{
    text-align: left;
  }
  div.sidebar{
    width: 500px;
    margin-left: 15px;
  }

  div.details{
    width: 500px;
    margin-left: 15px;
  }

  div.bottom{
    width: 500px;
    margin-left: 15px;
    margin-bottom: 10px;
  }

  div.bottomdetails{
    width: 500px;
    margin-left: 15px;
    margin-bottom: 10px;
  }

  textarea{
    height: 5em;
  }

}

@media (max-width: 500px) {
  div.sidebar{
    width: 300px;
    margin-left: 15px;
  }

  div.details{
    width: 300px;
    margin-left: 15px;
  }

  div.bottom{
    width: 300px;
    margin-left: 15px;
    margin-bottom: 10px;
  }

  div.bottomdetails{
    width: 300px;
    margin-left: 15px;
    margin-bottom: 10px;
  }

  #update {
    display: none;
  }

  textarea{
    height: 5em;
    width: 17em;
  }

  input{
    width: 17em;
  }

}


</style>
