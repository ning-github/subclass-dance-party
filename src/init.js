$(document).ready(function(){
  window.dancers = [];

  $(".addDancerButton").on("click", function(event){
    /* This function sets up the click handlers for the create-dancer
     * buttons on index.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      // to ensure minimum 5%, maximum 95% (height placement of random dancer)
      (($("body").height() * Math.random()) * .75 + ($("body").height() *.1)),
      // to ensure minimum 5%, maximum 95% (width placement of random dancer)
      (($("body").width() * Math.random()) * .8 + ($("body").width() *.05)),
      Math.random() * 1000
    );
    $('body').append(dancer.$node);
    dancers.push(dancer);
  });

  $(".lineUpButton").on("click", function(event){
    var height = $("body").height()/2;
    // to adjust alignment by starting from center
    var width = $("body").width()/(dancers.length+1);
    //var length = $("body").width()*3/4;
    // the more dancers, the smaller spacing becomes
    //var spacing = (length - width)/dancers.length;

    for (var i = 0; i < dancers.length; i++){
      //each dancer is a object with a $node property
      dancers[i].$node.stop(true, true);  // stops animation to prevent misalignments caused by dogs "jumping"
      dancers[i].lineUp(height,width*(i+1)-50);

    }
  });

  $(".danceNearButton").on("click", function(event){
    // pythag theorem to get distance (top^2 - left^2 gets you the distance^2)
    var distance = function(dancer1, dancer2){  //for our purposes, distance^2 conveys distance
      return Math.pow(dancer1.top - dancer2.top, 2) + Math.pow(dancer1.left-dancer2.left, 2);
    }
    for(var i = 0; i < dancers.length; i++){
      for(var j = i; j < dancers.length; j++) {
        if (dancers[i] !== dancers[j]) {
          // 25000 is an arbitrary comparison value we use to measure proximity
          if (distance(dancers[i],dancers[j]) < 25000) {
            dancers[i].$node.stop(true, true);
            dancers[j].$node.stop(true, true);
            dancers[i].$node.animate({top: dancers[j].top, left: dancers[j].left}, 1000);
            dancers[j].$node.animate({top: dancers[i].top, left: dancers[i].left}, 1000);
            var top = dancers[j].top;
            var left = dancers[j].top;
            dancers[j].top = dancers[i].top;
            dancers[j].left = dancers[i].left;
            dancers[i].top = top;
            dancers[i].left = left;
          }
        }
      }

    }
  });

  $('body').on('mouseover', 'img', function(event){
    $(this).animate({top: "-=150"}, 200);
  });

  $('body').on('mouseleave', 'img', function(event){
    $(this).animate({top: "+=150"}, 200);
  })



});

