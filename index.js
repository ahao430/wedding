function $ (el) {
  return document.querySelector(el)
}

window.onload = function () {
  // 初始化轮播
  var mySwiper = new Swiper(".swiper-container", {
    direction: "vertical", // 垂直切换选项
    loop: false, // 循环模式选项

    // 如果需要分页器
    pagination: {
      el: ".swiper-pagination",
    },

    // 如果需要前进后退按钮
    navigation: {
      nextEl: ".btn",
      // prevEl: '.swiper-button-prev',
    },

    // 如果需要滚动条
    scrollbar: {
      el: ".swiper-scrollbar",
    },

    on: {
      init: function () {
        initAnimation(this.activeIndex)
      },
      slideChange: function () {
        console.log(this)
        removeAnimation(this.previousIndex)
        initAnimation(this.activeIndex)
      },
    }
  });

  // 动画
  function removeAnimation (index) {
    switch (index) {
      case 0:
        $('.slide-1 .picture').className = 'picture hidden'
        break
      case 1:
        break
      case 2:
        break
      case 3:
        $('.slide-4 .img-1').className = 'img-1 hidden'
        $('.slide-4 .img-2').className = 'img-2 hidden'
        $('.slide-4 .img-3').className = 'img-3 hidden'
        break
      case 4:
        $('.slide-5 .picture').className = 'picture hidden'
        break
    }
  }
  function initAnimation (index) {
    switch (index) {
      case 0:
        $('.slide-1 .picture').className = 'picture flyin-left'
        break
      case 1:
        break
      case 2:
        break
      case 3:
        $('.slide-4 .img-1').className = 'img-1 flyin-left'
        setTimeout(function () {
          $('.slide-4 .img-2').className = 'img-2 flyin-right'
        }, 500)
        setTimeout(function () {
          $('.slide-4 .img-3').className = 'img-3 flyin-right'
        }, 1000)
        break
      case 4:
        $('.slide-5 .picture').className = 'picture flyin-left'
        break
    }
  }

  // 播放器
  var playing = true;
  var music = document.getElementById("music");
  var btnPlay = document.getElementById("btn-play");
  initPlayer()

  function play () {
    music.play();
    playing = true;
    btnPlay.className = "icon-play";
  }
  function stop () {
    music.pause();
    playing = false;
    btnPlay.className = "icon-stop";
  }

  function onFirstTouch () {
    if (music.paused) {
      play();
      document.body.removeEventListener('touchstart', onFirstTouch)
    }
  }
  function initPlayer () {
    try {
      play()
    } catch (err) {
      console.log(err)
    }
    setTimeout(function(){
      if (music.paused){
        playing = false;
        btnPlay.className = "icon-stop";
      }
    }, 200)
    btnPlay.addEventListener("click", function () {
      if (music.paused) {
        play()
      } else {
        stop()
      }
    });
    document.body.addEventListener('touchstart', onFirstTouch)
  }



  // 地图
  // 高德 
  // loadScript(
  //   "https://webapi.amap.com/maps?v=1.4.15&key=65536fffcbebe4551cfe029eae9a55f3" +
  //   "&callback=initGdMap"
  // );
  // 腾讯 
  loadScript(
    "https://map.qq.com/api/gljs?v=1.exp&key=SFTBZ-RPJK2-CY6UY-CNRGT-OORHZ-TOFTK" +
      "&callback=initTxMap"
  );

};

function loadScript(src) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;
  document.body.appendChild(script);
}

function initGdMap () {
  initMap('gd')
}
function initTxMap () {
  initMap('tx')
}
function initBdMap () {
  initMap('bd')
}
function initMap(type) {
  var pos = [113.936716, 30.935262];
  var address = "湖北省孝感市孝南区北京路86号";

  switch (type) {
    case "tx":
      var center = new TMap.LatLng(pos[1], pos[0]);
      //定义map变量，调用 TMap.Map() 构造函数创建地图
      var map = new TMap.Map(document.getElementById("map"), {
        center: center, //设置地图中心点坐标
        zoom: 13, //设置地图缩放级别
      });
      //创建并初始化MultiMarker
      var markerLayer = new TMap.MultiMarker({
        map: map, //指定地图容器
        //点标记数据数组
        geometries: [
          {
            id: "1", //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
            styleId: "myStyle", //指定样式id
            position: new TMap.LatLng(pos[1], pos[0]), //点标记坐标位置
            properties: {
              //自定义属性
              title: "marker1",
            },
          },
        ],
      });
      markerLayer.on("click", function (e) {
        openMap(type)
      });

      break;
    case "gd":
      var map = new AMap.Map("map", {
        zoom: 14,
        center: pos,
      });

      var onMarkerClick = function (e) {
        openMap(type)
      };
      var marker = new AMap.Marker({
        position: pos, //位置
      });
      map.add(marker); //添加到地图
      marker.on("click", onMarkerClick); //绑定click事件
      break;
    case "bd":
      // http://api.map.baidu.com/marker?location=34.271454,108.958486&title=”+inform.orgName+"&content="+inform.orgAddress+"&output=html";
      break;
  }
  function openMap (type) {
    switch (type) {
      case 'tx':
        location.href = 'http://apis.map.qq.com/uri/v1/marker?marker=coord:' + pos[1] + ',' + pos[0] + ';title:' + address
        break
      case 'gd':
        location.href = "http://uri.amap.com/marker?position=" + pos[0] +
        "," + pos[1] + "&name=" + address + "&coordinate=gaode&callnative=1";
        break
      case 'bd':
        break
    }
  }
}