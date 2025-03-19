const bscript = document.createElement('script');
bscript.onerror = onErrorMouseTrapFailed;
bscript.onload = onLoadBindSomeShortcuts;
bscript.src = 'https://unpkg.com/mousetrap@1.6.5/mousetrap.js';
document.head.appendChild(bscript);

/* https://www.smashingmagazine.com/2024/03/setting-persisting-color-scheme-preferences-css-javascript/ */

/*
 * If a color scheme preference was previously stored,
 * select the corresponding option in the color scheme preference UI
 * unless it is already selected.
 */
function restoreColorSchemePreference() {
  const colorScheme = localStorage.getItem(colorSchemeStorageItemName);

  if (!colorScheme) {
    // There is no stored preference to restore
    return;
  }

  const option = colorSchemeSelectorEl.querySelector(`[value=${colorScheme}]`);

  if (!option) {
    // The stored preference has no corresponding option in the UI.
    localStorage.removeItem(colorSchemeStorageItemName);
    return;
  }

  if (option.selected) {
    // The stored preference's corresponding menu option is already selected
    return;
  }

  option.selected = true;
}

/*
 * Store an event target's value in localStorage under colorSchemeStorageItemName
 */
function storeColorSchemePreference({ target }) {
  const colorScheme = target.querySelector(':checked').value;
  localStorage.setItem(colorSchemeStorageItemName, colorScheme);
}

// The name under which the user's color scheme preference will be stored.
const colorSchemeStorageItemName = 'preferredColorScheme';

// The color scheme preference front-end UI.
const colorSchemeSelectorEl = document.querySelector('#color-scheme');

if (colorSchemeSelectorEl) {
  restoreColorSchemePreference();

  // When the user changes their color scheme preference via the UI,
  // store the new preference.
  colorSchemeSelectorEl.addEventListener('input', storeColorSchemePreference);
}

function onLoadBindSomeShortcuts() {
  Mousetrap.bind('up up down down left right left right b a enter', () => {
    alert('konami');
  });

  Mousetrap.bind('g i t', () => {
    window.open('/git');
  });
}

function onErrorMouseTrapFailed() {
  console.error('Mouse did not get trapped');
}
