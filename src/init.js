$(document).ready(function(){
  window.ground = [];
  window.fish = [];
  window.sharks = [];
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
    if ( dancer.type === 'dog' || dancer.type === 'crab') {
      ground.push(dancer);
    }
    if (dancer.type === 'fish') {
      fish.push(dancer);
    }
    if (dancer.type === 'shark') {
      sharks.push(dancer);
    }
    dancers.push(dancer);
  });

  $(".lineUpButton").on("click", function(event){
    var height = $("body").height()*3/4;
    // to adjust alignment by starting from center
    var width = $("body").width()/(ground.length+1);
    // the more ground animals, the smaller spacing becomes

    for (var i = 0; i < ground.length; i++){
      //each dancer is a object with a $node property
      ground[i].$node.stop(true, true);  // stops animation to prevent misalignments caused by ground animals "jumping"
      ground[i].lineUp(height,width*(i+1)-50);
    }

    var fishHeight = $("body").height()*1/5;
    var fishWidth = $("body").width()/(fish.length+1);

    for (var i = 0; i < fish.length; i++){
      //each dancer is a object with a $node property
      fish[i].$node.stop(true, true);  // stops animation to prevent misalignments caused by fish "swimming"
      fish[i].lineUp(fishHeight,fishWidth*(i+1)-50);
    }

    var sharksWidth = $("body").width()/(sharks.length+1);

    for (i = 0; i < sharks.length; i++) {
      sharks[i].$node.stop(true, true);  // stops animation to prevent misalignments caused by sharks "swimming"
      sharks[i].lineUp(fishHeight*2,sharksWidth*(i+1)-50);
    }
  });

  $(".hauntedHouseButton").on("click", function(event) {
    $("body").addClass("hauntedHouse");
    DanceFloor.prototype.customStep = function () {
      this.oldStep();
      this.$node.stop(true, true);
      this.$node.fadeOut();
      this.$node.fadeIn();
    }
    //change dancer prototype to create a ghost
    Dancer.prototype.ghost = true;
    $('img').attr('src',"ghost.png");

  });
    //change pre-existing dancers to ghosts
  $(".convertButton").on('click', function (event) {
    $('.DogDancer').attr('src', 'dog.png');
    $('.SharkDancer').attr('src', 'shark.png');
    $('.CrabDancer').attr('src', 'crab.png');
    $('.FishDancer').attr('src', 'fish.png');
  });


  $(".underWaterButton").on("click", function(event) {
    $("body").removeClass("hauntedHouse");
    DanceFloor.prototype.customStep = function () {
      this.oldStep();

      this.$node.addClass('rotateY');
      var context = this;

      setTimeout(function() {
        context.$node.removeClass('rotateY');
      }, 2000);
    };
    //change the dancer prototype to no longer create ghosts
    Dancer.prototype.ghost = false;
  })

  $('.customDanceButton').on("click", function(event) {
    for (var i = 0; i < dancers.length; i++) {
      dancers[i].customStep();
    }
  });

  $('.danceCircleButton').on("click", function(event) {

    //really messy code to place dancers around the square object
    var horSpacing = $('#circle').width()/(dancers.length/4);
    var verSpacing = $('#circle').height()/(dancers.length/4)

    for (var i = 0; i < dancers.length/4; i++) {
      dancers[i].$node.stop(true, true);
      $('#circle').append(dancers[i].$node);
      dancers[i].setPosition(0, horSpacing*i);
    }
    for (var i = Math.ceil(dancers.length/4); i < dancers.length/2; i++) {
      dancers[i].$node.stop(true, true);
      $('#circle').append(dancers[i].$node);
      dancers[i].setPosition(verSpacing*(i-Math.ceil(dancers.length/4)), $('#circle').width());
    }
    for (var i = Math.ceil(dancers.length/2); i < dancers.length*3/4; i++) {
      dancers[i].$node.stop(true, true);
      $('#circle').append(dancers[i].$node);
      dancers[i].setPosition($('#circle').height(), $('#circle').width() - (horSpacing*(i-Math.ceil(dancers.length/2))));
    }
    for (var i = Math.ceil(dancers.length*3/4); i < dancers.length; i++) {
      dancers[i].$node.stop(true, true);
      $('#circle').append(dancers[i].$node);
      dancers[i].setPosition($('#circle').height() - verSpacing*(i-Math.ceil(dancers.length*3/4)), 0);
    }
  });

  $('.unDanceCircleButton').on("click", function(event) {
    for (var i = 0; i < dancers.length; i++) {
      $('body').append(dancers[i].$node);
      dancers[i].setPosition(dancers[i].top, dancers[i].left);
    }
  });

  // dance near currently broken
  $(".danceFarButton").on("click", function(event){
    // pythag theorem to get distance (top^2 - left^2 gets you the distance^2)
    var distance = function(dancer1, dancer2){  //for our purposes, distance^2 conveys distance
      return Math.pow(dancer1.top - dancer2.top, 2) + Math.pow(dancer1.left-dancer2.left, 2);
    }
    for(var i = 0; i < dancers.length; i++){
      for(var j = 0; j < dancers.length; j++) {
        if (dancers[i] !== dancers[j]) {
          if (dancers[i].pair === null || (distance(dancers[i],dancers[j]) > distance(dancers[i], dancers[i].pair))) {
            dancers[i].pair = dancers[j];
          }
        }
      }
    }
    for(var i = 0; i < dancers.length; i++) {
      dancers[i].$node.stop(true, true);
      dancers[i].$node.animate({top: dancers[i].pair.top, left: dancers[i].pair.left, height: 150, width: 150}, 1000);
      dancers[i].$node.animate({top: dancers[i].top, left: dancers[i].left, height: 100, width: 100}, 1000);
    }
  });

  $('body').on('mouseover', '.DogDancer', function(event){
    $(this).animate({top: "-=150"}, 200);
  });

  $('body').on('mouseleave', '.DogDancer', function(event){
    $(this).animate({top: "+=150"}, 200);
  });

  $('body').on('mouseover', '.CrabDancer', function(event){
    $(this).addClass('tilt');
  });

  $('body').on('mouseleave', '.CrabDancer', function(event){
    $(this).removeClass('tilt');
  });

  $('body').on('mouseover', '.FishDancer', function(event){
    $(this).addClass('rotateY');
    var context = $(this);

    setTimeout(function() {
      context.removeClass('rotateY');
    }, 2000);
  });

  $('body').on('mouseover', '.SharkDancer', function(event){
    $(this).addClass('flip');
    var context = $(this);

    setTimeout(function() {
      context.removeClass('flip');
    }, 2000);
  });




});

