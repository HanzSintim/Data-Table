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

const publicDir = path.join(__dirname, './static');
app.use('/static', express.static(publicDir));
app.use(express.urlencoded({extended: 'false'}));
app.use(express.json())

let db = new sqlite3.Database('./database.db', (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Connected to the SQlite database.');
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get("/results", (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'resultdata.html'));
})

app.get("/data", (req, res) => {
	db.all("SELECT * FROM data", [], (err, rows) => {
		if (err) console.error(err.message)
		res.json({data: rows})
	})
})

app.post("/data", (req, res) => {
	const {
		companyName,
		Subscriber,
		firstName,
		lastName,
		Gender,
		levelOfEducation,
		contactDetails,
		dateOfBirth,
		placeOfBirth,
		Nationality,
		Occupation,
		parentOccupation,
		parentContact,
		residentialAddress,
		digitaladdress,
		address,
		tin,
		email,
	} = req.body;
	console.log(req.body)
	db.run(`CREATE TABLE IF NOT EXISTS data (
		id INTEGER PRIMARY KEY,
		companyName VARCHAR(100),
		subscriber VARCHAR(50),
		firstName VARCHAR(50),
		lastName VARCHAR(50),
		gender VARCHAR(10),
		levelOfEducaton VARCHAR(100),
		contactDetails VARCHAR(50)
		dateOfBirth DATE,
		placeOfBirth VARCHAR(100),
		nationality VARCHAR(100),
		occupation VARCHAR(100),
		parentOccupation VARCHAR(50),
		parentContact  VARCHAR(50),
		residentialAddress VARCHAR(50),
		digitalAddress VARCHAR(100),
		address VARCHAR(100),
		tin VARCHAR(100),
		email VARCHAR(50)
	);
	`)

	db.run("INSERT INTO data VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,)", [
		companyName,
		Subscriber,
		firstName,
		lastName,
		Gender,
		levelOfEducation,
		contactDetails,
		dateOfBirth,
		placeOfBirth,
		Nationality,
		Occupation,
		parentOccupation,
		parentContact,
		residentialAddress,
		digitaladdress,
		address,
		tin,
		email
	], ((err) => {
		if (err) console.log(err.message)
	}))
	res.redirect('/')
})

app.listen(5000, () => {
	console.log("server started on http://localhost:5000")
})