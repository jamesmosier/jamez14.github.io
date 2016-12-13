'use strict';

(function () {
  var elem = document.getElementById('other');

  var hide = '<span class="mo">mosier</span>';
  var str = 'hi';
  str += '@';
  str += hide;
  str += 'jamesdmosier';
  str += '&#46;com';

  elem.innerHTML = str;
  elem.href = 'mailto:' + str.replace(hide, '').replace('&#46;', '.');
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9qcy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxDQUFDLFlBQU07QUFDTCxNQUFNLE9BQU8sU0FBUyxjQUFULENBQXdCLE9BQXhCLENBQWI7O0FBRUEsTUFBTSxPQUFPLGdDQUFiO0FBQ0EsTUFBSSxNQUFNLElBQVY7QUFDQSxTQUFPLEdBQVA7QUFDQSxTQUFPLElBQVA7QUFDQSxTQUFPLGNBQVA7QUFDQSxTQUFPLFVBQVA7O0FBRUEsT0FBSyxTQUFMLEdBQWlCLEdBQWpCO0FBQ0EsT0FBSyxJQUFMLGVBQXNCLElBQUksT0FBSixDQUFZLElBQVosRUFBa0IsRUFBbEIsRUFBc0IsT0FBdEIsQ0FBOEIsT0FBOUIsRUFBdUMsR0FBdkMsQ0FBdEI7QUFDRCxDQVpEIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoKCkgPT4ge1xuICBjb25zdCBlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ290aGVyJyk7XG5cbiAgY29uc3QgaGlkZSA9ICc8c3BhbiBjbGFzcz1cIm1vXCI+bW9zaWVyPC9zcGFuPic7XG4gIGxldCBzdHIgPSAnaGknO1xuICBzdHIgKz0gJ0AnO1xuICBzdHIgKz0gaGlkZTtcbiAgc3RyICs9ICdqYW1lc2Rtb3NpZXInO1xuICBzdHIgKz0gJyYjNDY7Y29tJztcblxuICBlbGVtLmlubmVySFRNTCA9IHN0cjtcbiAgZWxlbS5ocmVmID0gYG1haWx0bzoke3N0ci5yZXBsYWNlKGhpZGUsICcnKS5yZXBsYWNlKCcmIzQ2OycsICcuJyl9YDtcbn0pKCk7XG4iXX0=