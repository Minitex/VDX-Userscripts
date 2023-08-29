// ==UserScript==
// @name         Primo VE Copy Text
// @namespace    https://minitex.umn.edu/
// @version      1.0.4
// @description  An update to Primo made copying text difficult. This adds copy text buttons and disables the click even to collapse when clicked.
// @author       Kyle Triska
// @require      https://code.jquery.com/jquery-3.7.0.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @match        https://primo.lib.umn.edu/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=umn.edu
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @update       https://github.com/Minitex/VDX-Userscripts/raw/master/primoCopyText.js
// ==/UserScript==

waitForKeyElements('div[ng-if="item.itemFields[3]"] span[role="button"][tabindex="0"], p[role="button"][tabindex="0"]', addButton);

function addButton(jNode) {
    if (jNode.text().startsWith('Location/Call number: ') || jNode.closest('div[ng-if="item.itemFields[3]"]').length > 0) {
        var button = $('<button>').text('Copy Text'); // replace 'Copy Text' with your desired button text
        button.css('margin-left', '5px'); // apply a left margin to the button
        button.click(function(event) {
            event.stopPropagation(); // prevent the click event from propagating to parent elements
            var text = jNode.text(); // get the text of the targeted node
            GM_setClipboard(text); // copy the text to the clipboard
        });
        jNode.append(button); // append the button directly to jNode
    }
}
