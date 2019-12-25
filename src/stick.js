import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import "core-js";
import "./style/basic.scss";
import "./style//stick/page.scss";
import Util from "./script/util";
import jQuery from "jquery";

const years = {
  "1世纪": {
    start: 1,
    end: 99
  },
  "2世纪": {
    start: 100,
    end: 199
  },
  "3世纪": {
    start: 200,
    end: 299
  },
  "4世纪": {
    start: 300,
    end: 399
  },
  "5世纪": {
    start: 400,
    end: 499
  },
  "6世纪": {
    start: 500,
    end: 599
  },
  "7世纪": {
    start: 600,
    end: 699
  },
  "8世纪": {
    start: 700,
    end: 799
  },
  "9世纪": {
    start: 800,
    end: 899
  },
  "10世纪": {
    start: 900,
    end: 999
  },
  "11世纪": {
    start: 1000,
    end: 1099
  },
  "12世纪": {
    start: 1100,
    end: 1199
  },
  "13世纪": {
    start: 1200,
    end: 1299
  },
  "14世纪": {
    start: 1300,
    end: 1399
  },
  "15世纪": {
    start: 1400,
    end: 1499
  },
  "16世纪": {
    start: 1500,
    end: 1599
  },
  "17世纪": {
    start: 1600,
    end: 1699
  },
  "18世纪": {
    start: 1700,
    end: 1799
  },
  "19世纪": {
    start: 1800,
    end: 1899
  },
  "20世纪前期": {
    start: 1901,
    end: 1939
  },
  "20世纪中期": {
    start: 1940,
    end: 1969
  },
  "20世纪末期": {
    start: 1970,
    end: 2000
  },
  "21世记": {
    start: 2001,
    end: 2020
  }
};
let data = []; //总数据
let sjIndex = 0; //头部选中项
let maxLeft = 0; //最大滚动限制
let scroll = {
  x: 0,
  y: 0
}; //使用坐标
let startScroll = null; //初始坐标
let scrollDom = jQuery(".footer-scroll");
//头部滚动条定位
function changeHeaderScroll(index) {
  let dom = jQuery(".header-scroll .sj-item")
    .removeClass("active")
    .eq(index);
  dom.addClass("active");
  sjIndex = index;
  let allWidth = document.documentElement.clientWidth;
  let nowWidth = sjIndex * -256 + allWidth * 0.5;
  let maxWidth = data.length * 256 - allWidth;
  if (nowWidth > 0) {
    nowWidth = 0;
  }
  if (nowWidth + maxWidth < 0) {
    nowWidth = maxWidth * -1;
  }
  jQuery(".header-scroll").css({
    transform: `translateX(${nowWidth}px)`
  });
}
//绑定事件
function bindEvent() {
  setTimeout(() => {
    maxLeft = scrollDom[0].clientWidth - document.documentElement.clientWidth;
  }, 2000);
  jQuery(document.body)
    .mousedown(function(e) {
      startScroll = {
        x: e.pageX,
        y: e.pageY
      };
      e.preventDefault();
    })
    .mouseup(function(e) {
      scroll = { x: parseInt(scrollDom[0].style.left), y: 0 };
      startScroll = null;
      e.preventDefault();
      jQuery(".footer-scroll .sj-plan").each(function(index, item) {
        if (
          scroll.x < -1 * item.offsetLeft &&
          scroll.x > -1 * (item.offsetLeft + item.clientWidth)
        ) {
          let index = parseInt(jQuery(item).attr("index"));
          let dom = jQuery(".header-scroll .sj-item")
            .removeClass("active")
            .eq(index);
          dom.addClass("active");
        }
      });
    })
    .mousemove(function(e) {
      e.preventDefault();
      if (!startScroll) return;
      var newPos = {
        x: e.pageX - startScroll.x + scroll.x,
        y: e.pageY - startScroll.y + scroll.y
      };
      if (newPos.x > 0) {
        newPos.x = 0;
      } else if (maxLeft + newPos.x < 0) {
        newPos.x = -1 * maxLeft;
      }
      setTimeout(function() {
        scrollDom.css({
          left: newPos.x
        });
      }, 0);
    });
  //展开 收起左侧
  jQuery(".page-fix .action").click(function() {
    jQuery(".page-fix").toggleClass("active");
  });
  //切换类型
  jQuery(".page-fix .citem").click(function() {
    let type = jQuery(this).attr("type");
    jQuery(".page-fix .citem").removeClass("active");
    jQuery(`.page-fix .citem[type="${type}"]`).addClass("active");
    getPageData(type);
  });
}
//获取数据
function getPageData(type) {
  jQuery
    .ajax({
      url: "http://rds.abcvote.cn/api/web/sinology",
      data: {
        type: type
      }
    })
    .done(res => {
      let header = jQuery(".header-scroll").empty();
      res.data.forEach((item, index) => {
        let obj = years[item.century];
        if (obj) {
          item.start = obj.start;
          item.end = obj.end;
        }
        let beanList = [...item.beanList];
        item.dataArray = [];
        for (let i = item.start; i <= item.end; i++) {
          let list = beanList.filter(beanItem => beanItem.year == i);
          let obj = {
            year: i,
            list: list.length > 0 ? [...list[0].list] : []
          };
          item.dataArray.push(obj);
        }
        //头部数据绑定
        let dom = jQuery(`<span class="sj-item" index="${index}">${item.century}</span>`).appendTo(
          header
        );
        dom.bind("click", function() {
          let index = jQuery(this).attr("index");
          changeHeaderScroll(parseInt(index));
          let ft = jQuery('.footer-scroll .sj-plan[century="' + item.century + '"]');
          let left = -1 * ft[0].offsetLeft;
          if (maxLeft + left < 0) {
            left = -1 * maxLeft;
          }
          scroll = {
            x: left,
            y: 0
          };
          scrollDom.animate({
            left: scroll.x
          });
        });
      });
      data = [...res.data];
      changeHeaderScroll(0);
      let footer = jQuery(".footer-scroll").empty();
      //数据循环
      data.forEach((sjitem, sjindex) => {
        console.log(sjitem);
        let century = jQuery(
          `<span class="sj-plan" century="${sjitem.century}" index="${sjindex}"></span>`
        ).appendTo(footer);
        sjitem.dataArray.forEach((yearitem, yearindex) => {
          let conPar = jQuery(
            `<span class="${yearitem.list.length ? "year has-data" : "year"}" year="${
              yearitem.year
            }"></span>`
          ).appendTo(century);
          let conData = jQuery(`<div class="f-f-content"></div>`).appendTo(conPar);
          yearitem.list.forEach((dataItem, dataIndex) => {
            let itemDom = jQuery(
              `<div class="data-item type-${dataItem.place}" 
              style="z-index:${yearitem.year + "0" + dataIndex};bottom:${dataIndex * 270 + 20}px">
              <div class="item-plan">
              <div class="item-border">
              <div class="row-1">
                <div class="cover"><img src="${Util.transImgUrl(dataItem.covers)}"/></div>
                <div class="nick">${dataItem.names}</div>
              </div>
              <div class="row-2">
                <div class="content">${dataItem.content}</div>
                <div class="ff"><span class="more">更多</span></div>
              </div>
              </div></div></div>`
            ).appendTo(conData);
            jQuery('.more', itemDom).click(function(){
              console.log(dataItem)
            })
          });
          jQuery(
            `<div class="f-f-line"><p class="origin"></p><p class="txt">${
              yearitem.list.length ? yearitem.year : ""
            }</p></div>`
          ).appendTo(conPar);
        });
      });
    });
}
//1.数据加载
getPageData(1);
//2.事件滚动监控
bindEvent();
