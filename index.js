document.querySelector("#navbarSideCollapse").addEventListener("click", () => {
  document.querySelector(".offcanvas-collapse").classList.toggle("open");
});



let data;

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

function getModalVideo(id) {
  var xhr = new XMLHttpRequest();

  // open a connection
  xhr.open("GET", "./data.json", true);

  // send the request
  xhr.send();

  // handle the response
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //let arr = findIDVideo(, id);
      data = JSON.parse(this.responseText);
      let i = data.links.find((o) => o.id == id)
      var modal = document.getElementById("exampleModalLabel");
      var player = document.getElementById('player');
      var findAd = document.getElementById('find-ad');
      
      modal.innerText = i.title;
      if(i.video_zen){
        player.innerHTML = `<iframe src="${i.video_zen}?from_block=partner&from=zen&backoffice=1&mute=1&autoplay=1&tv=0" allow="autoplay; fullscreen; accelerometer; gyroscope; picture-in-picture; encrypted-media" frameborder="0" scrolling="no" allowfullscreen=""></iframe>`;
      }else{
        player.innerHTML = `<iframe width="720" height="405" src="https://rutube.ru/play/embed/8b1353d5f7eb2ffdf497ac72c14dc353" frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>  <p><a href="${i.video_rutube}/">Обзор дома в деревне (Тверская область, Андреапольский муниципальный округ, д. Болотово) №12</a> от <a href="//rutube.ru/video/person/20022262/">Усадьба Мечты [Жить в деревне]</a> на <a href="https://rutube.ru/">Rutube•LiST</a>`;
      
      }
      findAd.innerHTML = `<button type="button"  id="find-ad" class="btn btn-primary" onClick="getJson(${i.id})">Найти объявление</button>`;
    }
  };
}

function getJsonList() {
  var xhr = new XMLHttpRequest();

  // open a connection
  xhr.open("GET", "./data.json", true);

  // send the request
  xhr.send();

  // handle the response
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let openEl = "";
      var id = document.getElementById("list");
      let arr = JSON.parse(this.responseText);
      let str = "";

      arr.links.forEach((el) => {
        let video = "";
        if (el.video_zen) {
          video = el.video_zen;
        } else {
          video = el.video_rutube;
        }
        str =
          str +
          '<div class="d-flex text-muted pt-3"><p class="pb-3 mb-0 small lh-sm border-bottom"><strong class="d-block text-grey-dark"><a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="getVideo( ' +
          el.id +
          ')"> № ' +
          el.id +
          " : " +
          el.title +
          "</strong></a></p></div></div>";
      });

      id.innerHTML = str;
    }
  };
}

function getVideo(e) {
  getModalVideo(e);
}

function findIDVideo(json, id) {
  let data = json.links;
  let res = data.find((o) => o.id == id);
  return res;
}

function findID(json, id) {
  let data = json.links;
  let res = data.find((o) => o.id == id);
  if (res) {
    //console.log(res);
    window.location.replace(res.link);
  } else {
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
getJsonList();
