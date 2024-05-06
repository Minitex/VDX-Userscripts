// ==UserScript==
// @name        MNLINK Cluster ID Copier
// @namespace   Minitex
// @version     1.0
// @description Extracts and copies record ID from MNLink URLs upon element availability
// @author      Kyle Triska
// @match       https://search.mnlink.org/*
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    // Function to extract and copy ID to clipboard
    function copyIDToClipboard() {
        const url = window.location.href;
        const match = url.match(/Record\/([^?]+)/);
        if (match && match[1]) {
            navigator.clipboard.writeText(match[1]).then(() => {
                console.log('Record ID copied to clipboard:', match[1]);
                alert('Record ID copied to clipboard: ' + match[1]);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        }
    }

    // Attempt to add the button to the page
    function addButton() {
        const permalinkButton = document.querySelector('a.permalink-record.toolbar-btn');
        if (permalinkButton) {
            const button = document.createElement('button');
            button.textContent = 'Copy Record ID';
            button.style.marginLeft = '10px';
            button.onclick = copyIDToClipboard;
            permalinkButton.parentNode.insertBefore(button, permalinkButton.nextSibling);
            console.log('Button added successfully.');
        } else {
            console.log('Permalink button not found.');
        }
    }

    // Check if the permalink button exists, if not, use MutationObserver
    if (document.querySelector('a.permalink-record.toolbar-btn')) {
        addButton();
    } else {
        // Observer to track DOM changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    addButton();
                    observer.disconnect(); // Stop observing once the button is added
                }
            });
        });

        // Start observing the DOM
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
})();
