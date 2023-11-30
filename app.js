const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

// db.close((err) => {
// 	if (err) {
// 	  return console.error(err.message);
// 	}
// 	console.log('Close the database connection.');
// });
		
const app = express();

const publicDir = path.join(__dirname, './public');
app.use(express.static(publicDir));
app.use(express.urlencoded({extended: 'false'}));
app.use(express.json())

// app.set('view engine', 'html')

let db = new sqlite3.Database('./database.db', (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Connected to the SQlite database.');
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

// app.get("/results", (req, res) => {
// 	res.render("results")
// })

app.post("/data", (req, res) => {
	const {
		companyName,
		Subscriber,
		firstName,
		lastName,
		Gender,
		dateOfBirth,
		placeOfBirth,
		Nationality,
		Occupation,
		digitaladdress,
		address,
		tin,
		signature,
	} = req.body;
	console.log(req.body)
	db.run("CREATE TABLE ")
	res.redirect('/')
})

app.listen(5000, () => {
	console.log("server started")
})