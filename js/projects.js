(function(window, document) {
  'use strict';

  var projects = function () {
    this.setup();
  };

  projects.prototype.setup = function () {
    var cols = document.querySelectorAll('.projects-page');

    for (var i = cols.length - 1; i >= 0; i--) {
      cols[i].classList.add('column-loaded');
    };
  };

  window.projects = projects;

}(window, document));
