//
//CREDIT TO https://stibarc.gq/
//
//main.js
function toLink(id, item) {
  try {
    if (item["deleted"]) {
      item["title"] = "Post deleted";
    }
    document.getElementById("list").innerHTML = document
      .getElementById("list")
      .innerHTML.concat('<div class="post"> <div class="flexy-boi"><div class="post-up_down">'
      )
      .concat(
        "&#8679; " +
          item["upvotes"] +
          " &#8681; " +
          item["downvotes"] +
          ""
      )+'</div> <div class="post-list-boi"> <a style="font-size:100%;text-decoration:none;" href="post.html?id='
      .concat(id)
      +'"><b>'
      .concat(
        item["title"]
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
      )+'</b></a><br><span class="posted-by">Posted by: <a href="user.html?id='
      .concat(item["poster"])
      .concat('">')
      .concat(item["poster"])
    +'</a><br></span> </div> </div> </div>';
    lastid = id;
  } catch (err) {
    console.log(err);
  }
}

var lastid = 1;

function loadMore() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open(
    "GET",
    "https://api.stibarc.gq/v2/getposts.sjs?id=" + lastid,
    false
  );
  xmlHttp.send(null);
  if (xmlHttp.responseText.trim() != "") {
    var tmp = JSON.parse(xmlHttp.responseText);
    var tmp2 = lastid - 1;
    for (var i = tmp2; i > tmp2 - 20; i--) {
      toLink(i, tmp[i]);
    }
  } else {
    document.getElementById("loadmorecontainer").style.display = "none";
  }
}



//search btn //
function searchBtnClicked(){
  var searchBar = document.getElementById("sm-search-bar");
  if(searchBar.style.display == "none"){
    searchBar.style.display = "block";
    searchBar.querySelector('input').autofocus = true;
  }else{
    searchBar.querySelector('input').autofocus = false;
    searchBar.style.display = "none";
  }
}
