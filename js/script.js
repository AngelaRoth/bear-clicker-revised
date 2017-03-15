var Bear = function(name, i) {
  // Names of bears in nameArray correspond to names of jpg files.
  this.img = 'images/' + name + '.jpg';
  this.name = name;
  this.clicks = 0;

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
    octopus.bearClicked();
  });

  // Make the Paragraph which contains info on number of clicks (salmon)
  this.countPara = document.createElement('p');
  this.countPara.id = 'count' + i;
  this.countPara.className = 'count';
  this.countPara.innerHTML = this.clicks + ' Salmon';

  // Make the container which will hold all this bear's information
  this.container = document.createElement('div');
  this.container.className = 'bearContainer';
  this.container.appendChild(this.nameElem);
  this.container.appendChild(this.imgElem);
  this.container.appendChild(this.countPara);
};

var model = {
  // All our bears: names correspond to file names of jpg's
  nameArray: ['vonGrizzmon', 'Fuzzy', 'Whitey', 'Vera', 'Zeke', 'Moz', 'Splash', 'Colleen'],
  /*numBears: model.nameArray.length,*/
  bearArray: [],
  currentBear: null,

  init: function() {
    // Make a NEW Bear for every name in nameArray
    // Store new Bears in bearArray
    for (var i = 0; i < this.nameArray.length; i++) {
      this.bearArray[i] = new Bear(this.nameArray[i], i);
    }

    this.currentBear = this.bearArray[0];
  }
};

var octopus = {
  init: function() {
    model.init();
    model.currentBear = model.bearArray[0];

    listView.init();
    bearView.init(model.currentBear);
  },

  getBears: function() {
    return model.bearArray;
  },

  getCurrentBear: function() {
    return model.currentBear;
  },

  setCurrentBear: function(bear) {
    model.currentBear = bear;
  },

  bearClicked: function(i) {
    model.currentBear.clicks ++;
    model.currentBear.countPara.innerHTML = model.currentBear.clicks + ' Salmon';

    if (model.currentBear.clicks % 5 === 0) {
      model.currentBear.container.classList.add('fiveClick');
    } else {
      model.currentBear.container.classList.remove('fiveClick');
    }
  }
};

var listView = {
  init: function() {
    this.bearList = document.getElementById('bearList');
    this.render();
  },

  render: function() {
    var bear, listItem;
    var bearArray = octopus.getBears();
    var currentBear = octopus.getCurrentBear();
    for (var i = 0; i < bearArray.length; i++) {
      bear = bearArray[i];
      listItem = document.createElement('li');
      listItem.innerHTML = bear.name;
      listItem.addEventListener('click', (function(bearCopy) {
        return function() {
          /*if (bearCopy !== currentBear) {*/
            bearView.removeCurrentBear();
            bearView.render(bearCopy);
            octopus.setCurrentBear(bearCopy);
          /*}*/
        }
      })(bear));

      this.bearList.appendChild(listItem);
    }
  }
};

var bearView = {
  init: function(firstBear) {
    this.allBears = document.getElementById('allBears');
    this.render(firstBear);
  },

  removeCurrentBear: function() {
    var currentBear = octopus.getCurrentBear();
    this.allBears.removeChild(currentBear.container);
  },

  render: function(bear) {
    this.allBears.appendChild(bear.container);
  }
};

octopus.init();
