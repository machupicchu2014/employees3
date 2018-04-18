const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const knex = require('knex')(config);

let bcrypt = require('bcrypt');
const saltRounds = 10;

let employees = [];
let id = 0;

//new SQL things
app.post('/api/login', (req, res) => {
    if(!req.body.username || !req.body.password){
	return res.status(400).send();
    }
    knex('users').where('username',req.body.username).first().then(user => {
	if (user === undefined) {
	    res.status(403).send("Invalid Credentials");
	    throw new Error('abort');
	}
	return [bcrypt.compare(req.body.password, user.hash),user];
    }).spread((result, user) => {
	if(result)
	    res.status(200).json({user:{username:user.username, name:user.name, id:user.id}});
	else
	    res.status(403).send("Invalid Credentials");
	return;
    }).catch(error => {
	res.status(500).send("Well that was dumb");
    });
});

app.post('/api/user', (req, res) => {
	console.log("registering");
  if(!req.body.username || !req.body.name || !req.body.password){
    return res.status(400).send();
  }
  knex('users').where('username', req.body.username).first().then(user => {
    if(user !== undefined){
      res.status(403).send("Username already taken");
      throw new Error('abort');
    }
    return bcrypt.hash(req.body.password, saltRounds);
  }).then(hash => {
    return knex('users').insert({name: req.body.name, username: req.body.username, hash:hash});
  }).then(ids => {
    return knex('users').where('id',ids[0]).first().select('name', 'username','id');
  }).then(user => {
    res.status(200).json({user:user});
    return;
  }).catch(error => {
    res.status(500).send("Well that was dumb");
  })
});

app.get("/api/users/:id/employees", (req,res) => {
    let id = parseInt(req.params.id);
    console.log("Trying to get some people");
    knex('users').join('employees','users.id', 'employees.user_id')
      .where('users.id',id)
      .orderBy('employees.name', 'desc')
      .select('employees.name', 'email', 'job', 'salary', 'notes', 'employees.id').then(employees => {
        console.log("Here");
        res.status(200).json({employees:employees});
      }).catch(error => {
        console.log(error);
        res.status(500).send(error);
      })
});

app.post("/api/users/:id/employees", (req,res) => {
    let id = parseInt(req.params.id);
    knex('users').where('id',id).first().then(user => {
      return knex('employees').insert({user_id: id, name: req.body.name,
         email: req.body.email, job: req.body.job, salary: req.body.salary,
          notes: req.body.notes})
    }).then(ids => {
      return knex('employees').where('id',ids[0]).first();
    }).then(employee => {
      res.status(200).json({employee:employee});
      return;
    }).catch(error => {
      res.status(500).send("Well that was dumb");
    })
});

app.put("/api/users/:id/employees/:empID", (req,res) => {
    let id = parseInt(req.params.id);
    let employeeID = parseInt(req.params.empID);
    knex('employees').where('id',employeeID).first().then(user => {
      console.log(employeeID);
      return [knex('employees').where('id', employeeID).first().update({user_id: id, name: req.body.name,
         email: req.body.email, job: req.body.job, salary: req.body.salary,
          notes: req.body.notes}),employeeID];
    }).spread((ids,id) => {
      return knex('employees').where('id',id).first();
    }).then(employee => {
      res.status(200).json({employee:employee});
      return;
    }).catch(error => {
      console.log(error);
      res.status(500).send("Well that was dumb");
    })
});

app.delete("/api/users/:id/employees/:empID", (req, res) => {
  let id = parseInt(req.params.id);
  let employeeID = parseInt(req.params.empID);
  knex('employees').where('id', employeeID).del().then(count => {
    console.log(count);
  }).catch(error =>{
    console.log(error);
    res.status(500).send("Well that was dumb");;
  })
  res.sendStatus(200);
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
