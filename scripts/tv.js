// tv.js //
function getStuff(id) {
	var thing = new XMLHttpRequest();
	thing.open("GET", "https://api.stibarc.gq/v2/getuser.sjs?id=" + id, false);
	thing.send(null);
	var tmp = JSON.parse(thing.responseText);
	document.getElementById("pfp").src = tmp['pfp'];
}
// tv.js //
function getTitle() {
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

window.onload = function() {
    sessCheck();
      document.getElementById("sm-search-bar").style.display = "none";
      document.getElementById("search-btn").onclick = function(evt) {
        searchBtnClicked();
      };
	getTitle();
	setInterval(getTitle, 800);
	var ws = new WebSocket("wss://stibarc.gq:8001");
	ws.onmessage = function(evt) {
		if (evt.data == "/identified"){
			
		} else if (evt.data.split("/vc")[0] == "") {
            if(evt.data.split(" ")[1] == "1"){
                document.getElementById("viewers").innerHTML = evt.data.split(" ")[1]+" Viewer";
            }else{
                document.getElementById("viewers").innerHTML = evt.data.split(" ")[1]+" Viewers";
            }
		} else {
			var user = evt.data.split(":")[0];
			var message = evt.data.split(":");
			message.splice(0,1);
			message = message.join(":");
			document.getElementById("chat").innerHTML = document.getElementById("chat").innerHTML+'<div class="chat"><span><a href=\"/user.html?id="+user+"\">'+user.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")+"</a>: "+message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>")+"</span></div>";
			document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight;
		}
	}
	ws.onopen = function(evt) {
		ws.send("/viewcount");
		if (localStorage.sess != "" && localStorage.sess != undefined) {
			ws.send("/identify "+localStorage.sess);
		}
		var shifted = false;
		document.getElementById("comtent").addEventListener("keydown", function(e) {
			if (e.keyCode == 16) {
				shifted = true;
			}
		});
		document.getElementById("comtent").addEventListener("keyup", function(e) {
			if (e.keyCode == 13 && shifted == false) {
				var message = document.getElementById("comtent").value;
				var tmp = message.split("\n");
				if (tmp[tmp.length-1] == "") {
					tmp.pop();
				}
				message = tmp.join("\n");
				if (message.trim() != "") {
					document.getElementById("comtent").value = "";
					ws.send("m:"+message);
				}
			}
			if (e.keyCode == 16) {
				shifted = false;
			}
		});
		document.getElementById("send").onclick = function(e) {
			var message = document.getElementById("comtent").value;
			if (message.trim() != "") {
				document.getElementById("comtent").value = "";
				ws.send("m:"+message);
			}
		};
		setInterval(function() {ws.send("/viewcount");}, 500);
	}
}