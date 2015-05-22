var BlinkyDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function

  //this.step();
  this.$node = $('<span class="BlinkyDancer"></span>');
  this.setPosition(this.top, this.left);


};

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;
BlinkyDancer.prototype.oldStep = function() {
  Dancer.prototype.step.call(this);
};


BlinkyDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  this.$node.toggle();
};



var SquareDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function

  //this.step();
  this.$node = $('<span class="SquareDancer"></span>');
  this.setPosition(this.top, this.left);

};

SquareDancer.prototype = Object.create(Dancer.prototype);
SquareDancer.prototype.constructor = SquareDancer;
SquareDancer.prototype.oldStep = function() {
  Dancer.prototype.step.call(this);
};


SquareDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  this.$node.toggle();
};

var DogDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function

  //this.step();
  if (!this.ghost) {
    this.$node = $('<img src="dog.png" class="DogDancer">');
  } else {
    this.$node = $('<img src="ghost.png" class="DogDancer">');
  }
  this.setPosition(this.top, this.left);
  this.type = 'dog';

};

DogDancer.prototype = Object.create(Dancer.prototype);
DogDancer.prototype.constructor = DogDancer;
DogDancer.prototype.oldStep = function() {
  Dancer.prototype.step.call(this);
};


DogDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  this.$node.animate({top: "-=20"}, 100);
  this.$node.animate({top: "+=20"}, 100);
};

var CrabDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function

  //this.step();
  if(!this.ghost){
    this.$node = $('<img src="crab.png" class="CrabDancer">');
  } else {
    this.$node = $('<img src="ghost.png" class="CrabDancer">');
  }
  this.setPosition(this.top, this.left);
  this.type = 'crab';
};

CrabDancer.prototype = Object.create(Dancer.prototype);
CrabDancer.prototype.constructor = CrabDancer;
CrabDancer.prototype.oldStep = function() {
  Dancer.prototype.step.call(this);
};


CrabDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  this.$node.animate({left: "-=20"}, 100);
  this.$node.animate({left: "+=20"}, 100);

};

var SharkDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function

  //this.step();
  if (!this.ghost){
    this.$node = $('<img src="shark.png" class="SharkDancer">');
  } else {
    this.$node = $('<img src="ghost.png" class="SharkDancer">');
  }
  this.setPosition(this.top, this.left);
  this.type = 'shark';

};

SharkDancer.prototype = Object.create(Dancer.prototype);
SharkDancer.prototype.constructor = SharkDancer;
SharkDancer.prototype.oldStep = function() {
  Dancer.prototype.step.call(this);
};


SharkDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  this.$node.animate({left: "-=20"}, 100);
  this.$node.animate({left: "+=20"}, 100);
};

var FishDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function

  //this.step();
  if (!this.ghost){
    this.$node = $('<img src="fish.png" class="FishDancer">');
  } else {
    this.$node = $('<img src="ghost.png" class="FishDancer">');
  }
  this.setPosition(this.top, this.left);
  this.type = 'fish';

};

FishDancer.prototype = Object.create(Dancer.prototype);
FishDancer.prototype.constructor = FishDancer;
FishDancer.prototype.oldStep = function() {
  Dancer.prototype.step.call(this);
};


FishDancer.prototype.step = function(){
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  this.$node.animate({left: "-=20"}, 100);
  this.$node.animate({left: "+=20"}, 100);
};





