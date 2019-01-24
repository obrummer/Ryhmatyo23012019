var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json()); 
const logger = require('morgan');
app.use(logger('dev'));

var cors = require('cors');
app.use(cors());

var router = express.Router();

// General functionality for all REST services
// Dummy print to the console only
router.use(function (req, res, next) {
    console.log('I was called.');
    next();  // Must be here, we do want to continue to the actual service
});

// testing-route, GET http://localhost:3000/api/
// could also redirect..
router.get('/', function (req, res) {
    res.json({ message: 'Yey, you found me.. Now try the personnel' });
});


// List of people, or create new person
// GET http://localhost:3000/api/viestit
// POST http://localhost:3000/api/viestit
router.route('/viestit')
	.get(function (req, res) {
	    res.json(messages);
	})
	.post(function(req, res) {
		console.log(req.body);
		// All other checks are missing..
		if (!req.body) throw new Error("Empty body");
		const data = req.body;
		data.id = nextid++; 
		messages.push(data);
        res.status(201).location('http://localhost:3000/api/viestit/'+data.id)
             .send();
        console.log("Received", data);
	});

// Single person, get details or delete with id
// GET http://localhost:3000/api/viestit/2
// DELETE http://localhost:3000/api/viestit/2
/*router.route('/viestit/:id')
	.get(function (req, res) {
	    for (var person of messages) {
	        if (person.id == req.params.id) {
	            res.json(person);
	            return;
	        }
	    }
	    res.json("{'msg': 'Error, no such person!'}");
	})
	.delete(function (req, res) {
	    for (var person in messages) {
	        if (messages[person].id == req.params.id) {
	            messages.splice(person, 1);
	            res.json("{msg: 'Person removed'}");
	            return;
	        }
	    }
	    res.json("{'msg': 'Error, no such person!'}");
	});*/

// Single person, get details or delete with id
// GET http://localhost:3000/api/viestit/name
// DELETE http://localhost:3000/api/viestit/name
router.route('/viestit/:name')
	.get(function (req, res) {
        var apulist = [];
        for (var i=0; i < messages.length; i++) {
            if (messages[i].name === req.params.name) {
                apulist.push(messages[i]);
            }
        } 
	    // for (var person of messages) {
	    //     if (person.name == req.params.name) {
	    //         res.json(person);
	    //         return;
	    //     }
        // }
        if (apulist.length === 0) {
            res.json("{'msg': 'Error, no such person!'}"); 
        } else {
        res.json(apulist);
        }
	})
	.delete(function (req, res) {
	    for (var person in messages) {
	        if (messages[person].name == req.params.name) {
	            messages.splice(person, 1);
	            res.json("{msg: 'Person removed'}");
	            return;
	        }
	    }
	    res.json("{'msg': 'Error, no such person!'}");
	});

// data, demo stuff, should come from e.g. data base
var messages = [{ id: 0, name: 'Anna', teksti: 'Heippa' },
                { id: 2, name: 'Teemu', teksti: 'Joo' },
                { id: 5, name: 'Anne', teksti: 'Jes' },
                { id: 3, name: 'Taavi', teksti: 'Nodemoo' },
                { id: 6, name: 'Teemu2', teksti: 'Juhuu' },
				{ id: 1, name: 'Annukka', teksti: 'Jap' }];
var nextid = 100;

app.use('/api', router);
app.use(express.static('public'));


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Now listening at http://%s:%s", host, port);
});
