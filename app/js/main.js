$(window).load(function() {

  $('#load').delay(2800).fadeOut(500);
});

var loader = new Vivus('loader', {
  type: 'delayed',
  duration: 1,
  start: 'autostart',
  dashGap: 20,
  forceRender: false,
});



var loader = new Vivus('loader', {}, function (obj) {
  obj.el.classList.add('finished');
});

var scene = document.getElementById('scene');
var parallax = new Parallax(scene);
