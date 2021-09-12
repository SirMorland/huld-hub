const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3001;

/* API Server */

app.use(express.json());

app.get("/ping", (request, response) => {
	response.send("pong");
});

/* Start React front end on production */

if(process.env.NODE_ENV === "production") {
	app.use("/", express.static('build'));

	app.get("*", (_, response) => {
		const filePath = path.resolve(__dirname, './build', 'index.html');

		fs.readFile(filePath, 'utf8', (error, data) => {
			if (error) {
				return console.log(err);
			}

			response.send(data);
		});
	});
}

/* Start server */

app.listen(port, () => console.log(`Listening on port ${port}`));