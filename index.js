function getJson(id) {
  var xhr = new XMLHttpRequest();

  // open a connection
  xhr.open("GET", "./data.json", true);

  // send the request
  xhr.send();

  // handle the response
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        findID(JSON.parse(this.responseText), id);
    }
  };
}

function findID(json, id){
    let data = json.links;
    let res = data.find(o=>o.id == id);
    if(res){
        //console.log(res);
        window.location.replace(res.link);
    }else{
        alert("Объекта недвижимости с таким номером нет");
        window.location.replace("/");
        return;
    }
}

function redirectUrl() {
  var id = document.getElementById("id_num").value;
  window.location.replace("https://dreammanor.ru/?id=" + id);
}

var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");

if (id) {
  id = Number(id);
  if (isNaN(id) == false) {
    getJson(id);
  }
}
// window.location.replace("https://rutube.ru/channel/20022262/");
