var Bear = function(name, i) {
  this.img = 'images/' + name + '.jpg';
  this.name = name;
  this.clicks = 0;
};

var model = {
  nameArray: ['vonGrizzmon', 'Fuzzy', 'Whitey', 'Vera', 'Zeke', 'Moz', 'Splash', 'Colleen'],
  bearArray: [],
  currentBear: null,

  init: function() {
    // Make a NEW Bear for every name in nameArray
    // Store new Bears in bearArray
    this.numBears = this.nameArray.length;
    for (var i = 0; i < this.numBears; i++) {
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
    adminView.init();
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

  bearClicked: function() {
    model.currentBear.clicks ++;
    /*this.checkFiveClick();*/
    bearView.render();
  },

  checkFiveClick: function() {
    if (model.currentBear.clicks % 5 === 0 && model.currentBear.clicks !== 0) {
      bearView.containerElem.classList.add('fiveClick');
    } else {
      bearView.containerElem.classList.remove('fiveClick');
    }
  },

  openAdmin: function() {
    var bear = this.getCurrentBear();
    adminView.formElem.classList.remove('hidden');
    adminView.nameElem.value = bear.name;
    adminView.imgSourceElem.value = bear.img;
    adminView.clicksElem.value = bear.clicks;

  },

  closeAdmin: function() {
    adminView.formElem.classList.add('hidden');
  },

  saveAdmin: function() {
    var bear = this.getCurrentBear();
    var newName = adminView.nameElem.value;
    var newImg = adminView.imgSourceElem.value;
    var newClicks = adminView.clicksElem.value;
    if (newName) {
      bear.name = newName;
    }
    if (newImg) {
      bear.img = newImg;
    }
    if (newClicks && !isNaN(newClicks)) {
      bear.clicks = newClicks;
    }

    this.closeAdmin();
    listView.render();
    bearView.render();
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

    this.bearList.innerHTML = '';

    for (var i = 0; i < bearArray.length; i++) {
      bear = bearArray[i];
      listItem = document.createElement('li');
      listItem.innerHTML = bear.name;
      listItem.addEventListener('click', (function(bearCopy) {
        return function() {
          octopus.setCurrentBear(bearCopy);
          octopus.closeAdmin();
          bearView.render();
        }
      })(bear));

      this.bearList.appendChild(listItem);
    }
  }
};

var bearView = {
  init: function(firstBear) {
    this.containerElem = document.getElementById('bearContainer');
    this.nameElem = document.getElementById('nameElem');
    this.imgElem = document.getElementById('imgElem');
    this.countElem = document.getElementById('countElem');
    this.imgElem.addEventListener('click', function() {
      octopus.bearClicked();
    });

    this.render();
  },

  render: function() {
    var bear = octopus.getCurrentBear();
    this.nameElem.innerHTML = bear.name;
    this.imgElem.src = bear.img;
    this.imgElem.alt = bear.name;
    this.countElem.innerHTML = bear.clicks + ' Salmon';

    octopus.checkFiveClick();
  }
};

var adminView = {
  init: function() {
    bear = octopus.getCurrentBear();
    this.formElem = document.getElementById('adminForm');
    this.nameElem = document.getElementById('adminName');
    this.imgSourceElem = document.getElementById('adminImgSource');
    this.clicksElem = document.getElementById('adminClicks');

    this.adminButton = document.getElementById('adminShow');
    this.adminButton.addEventListener('click', function() {
      octopus.openAdmin();
    });

    this.cancelButton = document.getElementById('adminCancel');
    this.cancelButton.addEventListener('click', function() {
      octopus.closeAdmin();
    });

    this.saveButton = document.getElementById('adminSave');
    this.saveButton.addEventListener('click', function() {
      octopus.saveAdmin();
    });

    octopus.closeAdmin();
  }
};

octopus.init();
