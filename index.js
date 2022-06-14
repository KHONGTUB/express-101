const express = require("express");
const app = express();

let people = require("./data");

const PORT = 8000;

app.use(express.json());

app.get("/people", (req, res) => {
  res.json(people);
});

app.get("/people/:id", (req, res) => {
  const id = req.params.id;

  const person = people.find((person) => person.id === Number(id));
  res.json(person);
});

app.post("/people", (req, res) => {
  const person = {
    id: people.length + 1,
    ...req.body,
  };

  console.log(person);

  people.push(person);
  res.json(person);
});

app.put("/people/:id", (req, res) =>{
  const id = req.params.id
  const person = people.find((person) => person.id === Number(id))
  const foundindex = people.findIndex((person) => person.id === Number(id))
  const newinfo = {
    
    ...person,
    ...req.body

  }

  people.splice(foundindex, 1, newinfo)
  res.json(newinfo)
})

app.delete("/people/:id", (req, res) => {
  const id = req.params.id
  const foundindex = people.findIndex((person) => person.id === Number(id))

  people = people.filter(people => {
    return people.id !== Number(id)
  })
  for( let i = 0; i < people.length; i++){

    if(people[i].id > Number(id)){
      people[i].id = (people[i].id - 1)
    }
  }
  res.json(people)
})

app.listen(PORT, () => console.log(`I am listening on port ${PORT}`));
