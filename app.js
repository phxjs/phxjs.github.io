import isMobileJS from 'ismobilejs';
const isMobile = isMobileJS(window.navigator);

console.log({isMobile});

if (isMobile.any) {
  document.body.classList.add('mobile');
}

const ua = window.navigator.userAgent;
const div = document.createElement('div');
div.style.marginTop = '100vh';
div.innerText = ua;
document.body.appendChild(div);
const pre = document.createElement('pre');
pre.innerText = JSON.stringify(isMobile, null, '    ');
document.body.appendChild(pre);

window.addEventListener('dblclick', dblClickListener);
function dblClickListener() {
  console.log('dblclick', arguments);

  document.getElementById('slack').style.display = 'list-item';

  removeWindowEventListeners();
}

window.addEventListener('touchstart', touchStartListener);
function touchStartListener(event) {
  console.log('touchstart', event);

  if (event.touches.length >= 3) {
    document.getElementById('slack').style.display = 'list-item';

    removeWindowEventListeners();
  }
}

function removeWindowEventListeners() {
  window.removeEventListener('dblclick', dblClickListener);
  window.removeEventListener('touchstart', touchStartListener);
}
