// tv.js //
function getStuff(id) {
	var thing = new XMLHttpRequest();
	thing.open("GET", "https://api.stibarc.gq/v2/getuser.sjs?id=" + id, false);
	thing.send(null);
	var tmp = JSON.parse(thing.responseText);
	document.getElementById("pfp").src = tmp['pfp'];
}
window.onload = function() {
    sessCheck();
      document.getElementById("sm-search-bar").style.display = "none";
      document.getElementById("search-btn").onclick = function(evt) {
        searchBtnClicked();
      };
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://stibarc.gq/tv/metadata.sjs", true);
	xhr.send("");
	xhr.onload = function(e) {
		var tmp = JSON.parse(xhr.responseText);
        document.title = tmp.title+" | STiBaRC TV";
		document.getElementById("title").innerHTML = tmp.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
		document.getElementById("streamer").innerHTML = tmp.streamer.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        document.getElementById("userLink").href = "user.html?id="+tmp.streamer.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        getStuff(tmp.streamer);
	}
}