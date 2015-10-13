(function(window, document) {
  'use strict';

  var projects = function() {
    this.col1 = document.querySelector('.proj-col-1');
    this.col2 = document.querySelector('.proj-col-2');
    this.col3 = document.querySelector('.proj-col-3');
    this.expandedCol = 'expanded-col';
    this.contractedCol = 'contracted-col';

    this.setup();
    this.establishHandlers();
  };

  projects.prototype.setup = function() {
    var cols = document.querySelectorAll('.column-third');

    for (var i = cols.length - 1; i >= 0; i--) {
      cols[i].classList.add('column-loaded');
    };
  };

  projects.prototype.establishHandlers = function() {
    var whereIveBeen = document.getElementById('been');
    var whereIAm = document.getElementById('am');
    var whereImGoing = document.getElementById('going');

    whereIveBeen.addEventListener('click', this.whereIveBeen.bind(this), true);
    whereIAm.addEventListener('click', this.whereIAm.bind(this), true);
    whereImGoing.addEventListener('click', this.whereImGoing.bind(this), true);
  };

  projects.prototype.whereIveBeen = function(e) {
    if (this.col1.classList.contains(this.expandedCol)) {
      this.columnWillContract(this.col1, [this.col2, this.col3]);
    } else {
      this.columnWillExpand(e, this.col1, [this.col2, this.col3]);
    }
  };

  projects.prototype.whereIAm = function(e) {
    if (this.col2.classList.contains(this.expandedCol)) {
      this.columnWillContract(this.col2, [this.col1, this.col3]);
    } else {
      this.columnWillExpand(e, this.col2, [this.col1, this.col3]);
    }
  };

  projects.prototype.whereImGoing = function(e) {
    if (this.col3.classList.contains(this.expandedCol)) {
      this.columnWillContract(this.col3, [this.col1, this.col2]);
    } else {
      this.columnWillExpand(e, this.col3, [this.col1, this.col2]);
    }
  };

  projects.prototype.columnWillExpand = function(e, primaryCol, secondaryCols) {
    // user clicks a column so it will expand & others will contract
    primaryCol.classList.add(this.expandedCol);

    secondaryCols[0].classList.add(this.contractedCol);
    secondaryCols[1].classList.add(this.contractedCol);

    // var transitionEvent = whichTransitionEvent();
    // transitionEvent && primaryCol.addEventListener(transitionEvent, function() {});
    // for (var i = secondaryCols.length - 1; i >= 0; i--) {
    //   var col = secondaryCols[i];
    //   col.classList.add(this.contractedCol);
    // }

  };

  projects.prototype.columnWillContract = function(primaryCol, secondaryCols) {
    // user wants to contract a column, so remove appropriate classes
    primaryCol.classList.remove(this.expandedCol);

    // for (var i = secondaryCols.length - 1; i >= 0; i--) {
    //   var col = secondaryCols[i];
    //   col.classList.remove(this.contractedCol);
    // }
    secondaryCols[0].classList.remove(this.contractedCol);
    secondaryCols[1].classList.remove(this.contractedCol);

  };

  function whichTransitionEvent() {
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    }

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  }

  window.projects = projects;

}(window, document));
