
var domify = require('component/domify');
var temp = require('/');

var el = domify(
    '<div style="width:300px;height:100vh">'
  + '  <div style="width:100%;height:100%;background-color:red">'
  + '    wow!'
  + '  </div>'
  + '</div>'
);

console.log('before:');
displaySize(el);

temp(el, function(el) {
  console.log('after:');
  displaySize(el);
});

function displaySize(el) {
  var rect = el.getBoundingClientRect();
  console.log('  bottom: %dpx', rect.bottom);
  console.log('  left: %dpx', rect.left);
  console.log('  right: %dpx', rect.right);
  console.log('  top: %dpx', rect.top);
  console.log('  width: %dpx', rect.width);
}
