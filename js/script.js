var allBears = document.getElementById('allBears');
var bearList = document.getElementById('bearList');

// The Bear Class. Takes as imput the name of the bear
// and its position in the bearArray
var Bear = function(name, i) {
  // Names of bears in nameArray correspond to names of jpg files.
  this.img = 'images/' + name + '.jpg';
  this.name = name;
  this.clicks = 0;

  // Make the bear's entry in the Choose a Bear list
  this.listItem = document.createElement('li');
  this.listItem.innerHTML = this.name;
  // Attach an event listener which calls the bearChosen function on
  // the bear stored in this bear's place in the bearArray
  this.listItem.addEventListener('click', function() {
    bearChosen(i);
  });


  // Make the Heading for the Bear Container
  this.nameElem = document.createElement('h2');
  this.nameElem.innerHTML = this.name;

  // Make the Image for the Bear Container
  this.imgElem = document.createElement('img');
  this.imgElem.id = 'bear' + i;
  this.imgElem.src = this.img;
  this.imgElem.alt = this.name;
  // Attach an event listener which calls the bearClicked function on
  // the bear stored in this bear's place in the bearArray
  this.imgElem.addEventListener('click', function() {
    bearClicked(i);
  });

  // Make the Paragraph which contains info on number of clicks (salmon)
  this.countPara = document.createElement('p');
  this.countPara.id = 'count' + i;
  this.countPara.className = 'count';
  this.countPara.innerHTML = this.clicks + ' Salmon';

  // Make the container which will hold all this bear's information
  this.container = document.createElement('div');
  this.container.className = 'bearContainer';

};

// Add bear as a child of #bearList element
Bear.prototype.enterList = function() {
  bearList.appendChild(this.listItem);
}

// Append all of a bear's information to its container and
// add container as a child of #allBears element
Bear.prototype.enterHTML = function() {
  this.container.appendChild(this.nameElem);
  this.container.appendChild(this.imgElem);
  this.container.appendChild(this.countPara);
  allBears.appendChild(this.container);
};

// Remove the bear's container from the children of #allBears element
Bear.prototype.leaveHTML = function() {
  allBears.removeChild(this.container);
}

// Called when a bear's name is chosen for display.
// If the bear is not already displayed, it removes currently displayed
// bear and adds newly chosen bear; otherwise it augments the bear's salmon.
// Runs on the bear located at position (i) of the bearArray.
function bearChosen(i) {
  if (bearArray[i] !== currentBear) {
    currentBear.leaveHTML();
    bearArray[i].enterHTML();
    currentBear = bearArray[i];
  } else {
    bearClicked(i);
  }
}

// Augment's bear's salmon when a their image is clicked.
// Makes container background red when salmon number is a multiple of five.
// Runs on the bear located at position (i) of the bearArray.
function bearClicked(i) {
  bearArray[i].clicks ++;
  bearArray[i].countPara.innerHTML = bearArray[i].clicks + ' Salmon';

  if (bearArray[i].clicks % 5 === 0) {
    bearArray[i].container.classList.add('fiveClick');
  } else {
    bearArray[i].container.classList.remove('fiveClick');
  }
}

// All our bears: names correspond to file names of jpg's
var nameArray = ['vonGrizzmon', 'Fuzzy', 'Whitey', 'Vera', 'Zeke', 'Moz', 'Splash', 'Colleen'];
var numBears = nameArray.length;
var bearArray = [];

// Make a NEW Bear for every name in nameArray
// Store new Bears in bearArray
for (var i = 0; i < numBears; i++) {
  bearArray[i] = new Bear(nameArray[i], i);
  bearArray[i].enterList();
}

// When site is first loaded, the first bear in the array
// is the "currently displayed bear"
bearArray[0].enterHTML();
var currentBear = bearArray[0];
