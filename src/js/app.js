(() => {
  const elem = document.getElementById('other');

  const hide = '<span class="mo">mosier</span>';
  let str = 'hi';
  str += '@';
  str += hide;
  str += 'jamesdmosier';
  str += '&#46;com';

  elem.innerHTML = str;
  elem.href = `mailto:${str.replace(hide, '').replace('&#46;', '.')}`;
})();
