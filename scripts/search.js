//
//CREDIT TO https://stibarc.gq/
//
//search.js
function toLink(item) {
	try {
		var i = item.indexOf(':');
		var splits = [item.slice(0, i), item.slice(i + 1)];
		document.getElementById("list").innerHTML = document.getElementById("list").innerHTML.concat('<a href="post.html?id=').concat(splits[0])+'"><div class="user-post"><div class="post-list-boi"><b>'.concat(splits[1].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")).concat("</b></div></div></a>");
	} catch (err) {
		console.log("Whoops");
	}
}

function toJSON(cookie) {
	var output = {};
	cookie.split(/\s*;\s*/).forEach(function (pair) {
		pair = pair.split(/\s*=\s*/);
		output[pair[0]] = pair.splice(1).join('=');
	});
	return output;
}

function search() {
	//var q = document.getElementById("q").value;
	if (q != "") {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("post", "https://api.stibarc.gq/postsearch.sjs", false);
		xmlHttp.send("q="+encodeURIComponent(q));
		if (xmlHttp.responseText.split("\n")[0] != "No results" && xmlHttp.responseText != "") {
			var tmp = xmlHttp.responseText.split("\n");
			document.getElementById("list").innerHTML = "";
			for (i = 0; i < tmp.length - 1; i++) {
				toLink(tmp[i]);
			}
		} else {
			document.getElementById("list").innerHTML = "<li>No results</li>"
		}
		document.getElementById("main2").style.display = "";
	}
}
var q;
window.onload = function () {
    sessCheck();
    q = getAllUrlParams().q;
    var smSearchBar = document.getElementById("sm-search-bar");
    var searchBar = document.getElementById("header-search-bar");
    smSearchBar.value = q;
    searchBar.value = q;
    search();
}