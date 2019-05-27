var Chance = require('chance');
var chance = new Chance();

var Express = require('express');
var app = Express();

app.get('/', function(req, res) {
    res.send(generateStudents());
});

app.listen(3000, function() {
    console.log('Accepting HTTP requests on port 3000!');
});
 
function generateStudents(){
	var numberOfStudents = chance.integer({
		min : 1,
		max : 10
	});
	
	console.log(numberOfStudents);
	
	var Students = [];
	
	for(var i = 0; i < numberOfStudents; ++i){
        var gender = chance.gender();
		Students.push({
            
            'first'   : chance.first({ gender: gender }),
            'last'    : chance.last(),
            'gender'  : gender,
			'birthday': chance.birthday({year : chance.year({min : 1986,max : 1997})} ),
            'country' : chance.country({ full: true }),
            'email' : chance.email(),
		});
	}
	console.log(Students);
	return Students;
}
