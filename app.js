import isMobileJS from 'ismobilejs';
const isMobile = isMobileJS(window.navigator);

console.log({isMobile});
console.table(isMobile);

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

window.addEventListener('click', toggleUrl);

window.addEventListener('dblclick', dblClickListener);
function dblClickListener() {
  console.log('dblclick', arguments);

  revealSlackLink();

  removeWindowEventListeners();
}

window.addEventListener('touchstart', touchStartListener);
function touchStartListener(event) {
  console.log('touchstart', event);

  if (event.touches.length >= 3) {
    revealSlackLink();
    removeWindowEventListeners();
  }
}

function revealSlackLink() {
  const slack = document.getElementById('slack');
  slack.style.display = 'list-item';
  slack.querySelector('a').focus();
}

function removeWindowEventListeners() {
  window.removeEventListener('dblclick', dblClickListener);
  window.removeEventListener('touchstart', touchStartListener);
}

const urlEl = document.querySelector('#url');
function toggleUrl(_event) {
  urlEl.classList.toggle('hidden');
}