var Chance = require('chance');
var chance = new Chance();

var Express = require('express');
var app = Express();

app.get('/', function(req, res) {
    res.send(generateAnimals());
});

app.listen(3000, function() {
    console.log('Accepting HTTP requests on port 3000!');
});
 
function generateAnimals(){
	var numberOfAnimals = chance.integer({
		min : 1,
		max : 10
	});
	
	console.log(numberOfAnimals);
	
	var Animals = [];
	
	for(var i = 0; i < numberOfAnimals; ++i){
        var gender = chance.gender();
		Animals.push({
            
            'animal'   : chance.animal(),
            'name'    :  chance.first({gender: gender}),
            'gender'  : gender,
			'birthday': chance.birthday({year : chance.year({min : 2008,max : 2019})})
		});
	}
	console.log(Animals);
	return Animals;
}
