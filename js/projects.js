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

  projects.prototype.whereIveBeen = function() {
    if (this.col1.classList.contains(this.expandedCol)) {
      this.col1.classList.remove(this.expandedCol);
      this.col2.classList.remove(this.contractedCol);
      this.col3.classList.remove(this.contractedCol);
    } else {
      this.col2.classList.add(this.contractedCol);
      this.col3.classList.add(this.contractedCol);

      this.col1.classList.add(this.expandedCol);
    }
  };

  projects.prototype.whereIAm = function() {
    if (this.col2.classList.contains(this.expandedCol)) {
      this.col2.classList.remove(this.expandedCol);
      this.col1.classList.remove(this.contractedCol);
      this.col3.classList.remove(this.contractedCol);
    } else {
      this.col1.classList.add(this.contractedCol);
      this.col3.classList.add(this.contractedCol);

      this.col2.classList.add(this.expandedCol);
    }
  };

  projects.prototype.whereImGoing = function() {
    if (this.col3.classList.contains(this.expandedCol)) {
      this.col3.classList.remove(this.expandedCol);
      this.col1.classList.remove(this.contractedCol);
      this.col2.classList.remove(this.contractedCol);
    } else {
      this.col1.classList.add(this.contractedCol);
      this.col2.classList.add(this.contractedCol);

      this.col3.classList.add(this.expandedCol);
    }
  };

  window.projects = projects;

}(window, document));
