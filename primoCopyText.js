// ==UserScript==
// @name         Primo VE Copy Text
// @namespace    https://minitex.umn.edu/
// @version      1.1.0
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


(function() {
    'use strict';

    waitForKeyElements('p[role="button"][tabindex="0"]', addButton);

    function addButton(jNode) {
        // Skip if a button already exists or if the text starts with "Description:"
        if (jNode.next('button').length > 0 || jNode.text().startsWith('Description:')) {
            return;
        }

        var button = $('<button>').text('Copy Text');
        button.css({
            'margin-left': '5px',
            'display': 'inline-block'   // Set the button's display to inline-block
        });

        button.click(function(event) {
            event.stopPropagation();

            var clone = jNode.clone();
            clone.find('button').remove();

            var textToCopy = jNode.text().startsWith('Location/Call number: ')
                ? clone.text().split(": ").slice(1).join(": ")
                : clone.text();

            GM_setClipboard(textToCopy);
        });

        jNode.after(button);

        // Check if the jNode is a block-level element
        if (jNode.css('display') === 'block') {
            jNode.css('display', 'inline-block');
        }
    }

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes) {
                $(mutation.addedNodes).each(function() {
                    var node = $(this);
                    if (node.is('span[role="button"][tabindex="0"][ng-bind-html="item.itemFields[3]"]')) {
                        addButton(node);
                    } else if (node.find('span[role="button"][tabindex="0"][ng-bind-html="item.itemFields[3]"]').length > 0) {
                        addButton(node.find('span[role="button"][tabindex="0"][ng-bind-html="item.itemFields[3]"]'));
                    }
                });
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

})();
