var DanceFloor = function(){

};

DanceFloor.prototype.customStep = function () {
  this.oldStep();

  this.$node.addClass('rotateY');
  var context = this;

  setTimeout(function() {
    context.$node.removeClass('rotateY');
  }, 2000);
}


// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps){
  // inherit dance floor
  DanceFloor.call(this);

  this.top = top;
  this.left = left;
  this.timeBetweenSteps = timeBetweenSteps;
  this.pair = null;



  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"></span>');
  this.step();
  this.setPosition(this.top, this.left);


};
Dancer.prototype = Object.create(DanceFloor.prototype);
Dancer.prototype.constructor = Dancer;

Dancer.prototype.ghost = false;

Dancer.prototype.step = function(){
    // the basic dancer doesn't do anything interesting at all on each step,
    // it just schedules the next step
    var context = this;
    setTimeout(function () {
      context.step();
    }, this.timeBetweenSteps);
  };

Dancer.prototype.setPosition = function(top, left){
    // Use css top and left properties to position our <span> tag
    // where it belongs on the page. See http://api.jquery.com/css/
    //
    var styleSettings = {
      top: top,
      left: left
    };
    this.$node.css(styleSettings);
  };

Dancer.prototype.lineUp = function(height, width){
  this.$node.animate({top: height, left: width}, 1000);
  //sets new top and left values following the alignment
  this.top = height;
  this.left = width;
}



  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
