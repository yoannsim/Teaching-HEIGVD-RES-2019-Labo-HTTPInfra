$(function(){
  console.log("Loading students");

  function loadStudents(){
    $.getJSON( "/api/students/", function( students ){
      console.log(students);
      var message = "Nobody is here";
      if( students.length > 0){
        message = students[0].firstName + " " + students[0].lastName;
      }
      $(".font-weight-light mb-0").text(message);
    });
  };

  loadStudents();
  setInterval( loasStudents, 2000 );
});