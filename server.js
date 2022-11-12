// Import Dependencies
require("dotenv").config()
const express = require('express'); 
const budget = require("./models/budget"); 
const methodOverride = require("method-override") 

//Express App object
const app = express();

//Middleware
app.use(express.urlencoded({extended: true})) 
app.use(methodOverride("_method")) 
// app.use("/static", express.static("public")) 

app.get("/", (req, res) => res.redirect("/budget"))

// HOME ROUTE
app.get('/budget', (req, res) => {
    res.render(
        'index.ejs',
        {
            allBudget:budget
        }
        
    );
});

// Add New Budget Items
app.get('/budget/new', (req, res) => {
    res.render('new.ejs');
});

// Create Route and redirect the user back to index
app.post("/budget", (req, res) => {
   
    budget.push(req.body);
  
    res.redirect("/budget");
  });

//SHOW ROUTE - Returns a single budget
app.get("/budget/:index", (req, res) => {
    res.render("show.ejs", {
      budget: budget[req.params.index],
      index: req.params.index
    });
  });

// The Server Listener
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});