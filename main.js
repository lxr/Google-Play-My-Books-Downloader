"use strict";

function appendDownloadLink(bfeMenu) {
  // Assume that, when appendDownloadLink(bfeMenu) is called,
  // only the cover menu button element corresponding to `bfeMenu`
  // bears the following class signature.
  var query = ".bfe-volume-menu-button-focused"
              ".bfe-volume-menu-button-open";
  var cardContent = document.querySelector(query).parentNode.parentNode;
  var coverOverlay = cardContent.querySelector(".bfe-cover-overlay");
  var id = coverOverlay.href.match(/&id=([^&]+)/)[1];
  var download = document.createElement("a");
  download.href = "https://books.google.com/books/download?id=" + id
                + "&output=uploaded_content";
  download.textContent = "Download";
  download.style.color = "#333";
  var div = document.createElement("div");
  div.className = "goog-menuitem";
  div.setAttribute("onmouseover", "this.style.backgroundColor = '#F6F6F6'");
  div.setAttribute("onmouseout", "this.style.backgroundColor = null");
  div.appendChild(download);
  bfeMenu.appendChild(div);
}

new MutationObserver(function (mutations) {
  for (var i = 0, mutation; mutation = mutations[i]; i++) {
    for (var j = 0, node; node = mutation.addedNodes[j]; j++) {
      // The popup menus of uploaded books contain
      // only the "Delete" entry, so we assume that
      // every one-child element of the `bfe-menu`
      // class is the popup menu of an uploaded book.
      if (node.classList.contains("bfe-menu") &&
          node.childElementCount === 1) {
        appendDownloadLink(node);
      }
    }
  }
}).observe(document.body, { childList: true });
