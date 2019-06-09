$(function(){
  console.log("Loading animals");

  function loadAnimals(){
    $.getJSON( "/api/animals/", function( animals ){
      console.log(animals);
      var message = "Nobody is here";
      if( animals.length > 0){
        message = animals[0].animal + " " + animals[0].name;
      }
      $(".test").text(message);
    });
  };

  loadAnimals();
  setInterval( loadAnimals, 2000 );
});