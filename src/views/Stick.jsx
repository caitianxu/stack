import React, { Component } from "react";
import HTTP from "../script/service";
import "../style/stick/Stick.scss";
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
    start: 180,
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
  "21世纪": {
    start: 2001,
    end: 2020
  }
};

class Stick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sjIndex: 0,
      hsScroll: 0,
      type: 1 //（1:亚洲，2:欧美）
    };
  }
  componentDidMount() {
    HTTP._web_sinology({
      type: this.state.type
    }).then(res => {
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
      });
      console.log("事故", res.data);
      this.setState({
        data: [...res.data]
      });
    });
  }
  //改变世纪
  changeSJ = index => {
    this.setState(
      {
        sjIndex: index
      },
      () => {
        this.changeHeaderScroll();
      }
    );
  };
  //头部滚动条定位
  changeHeaderScroll() {
    let { sjIndex, data } = this.state;
    let allWidth = document.documentElement.clientWidth;
    let nowWidth = sjIndex * -256 + allWidth * 0.5;
    let maxWidth = data.length * 256 - allWidth;
    if (nowWidth > 0) {
      nowWidth = 0;
    }
    if (nowWidth + maxWidth < 0) {
      nowWidth = maxWidth * -1;
    }
    this.setState({
      hsScroll: nowWidth
    });
  }
  mouseDown = e => {
    console.log("mouseDown", e.pageX, e.pageY);
    this.scrollMove = e.pageX;
  };
  onMouseUp = e => {
    this.scrollMove = null;
  };
  onMouseMove = e => {
    if (!this.scrollMove) return;
    let left = parseInt(this.footerScrollElement.style.left);
    if (e.pageX < this.scrollMove) {
      left -= 10;
    } else {
      left += 10;
    }
    this.scrollMove = e.pageX;
  };
  render() {
    const { data, sjIndex, hsScroll } = this.state;
    return (
      <div className="stick-content">
        <div className="header">
          <div
            className="header-scroll"
            ref={el => (this.headerElement = el)}
            style={{ transform: `translateX(${hsScroll}px)` }}
          >
            {data.map((item, index) => {
              return (
                <span
                  className={index == sjIndex ? "sj-item active" : "sj-item"}
                  key={`key-${index}`}
                  onClick={this.changeSJ.bind(this, index)}
                >
                  {item.century}
                </span>
              );
            })}
          </div>
        </div>
        <span className="conter"></span>
        <div className="footer">
          <div
            className="footer-scroll"
            ref={el => (this.footerScrollElement = el)}
            style={{ left: 0 }}
            onMouseDown={this.mouseDown}
            onMouseUp={this.onMouseUp}
            onMouseMove={this.onMouseMove}
          >
            {data.map((sjitem, sjindex) => {
              return (
                <div className="sj-plan" key={`sj-${sjindex}`}>
                  {sjitem.dataArray.map((yearitem, yearindex) => {
                    return (
                      <span
                        className={yearitem.list.length > 0 ? "year hasData" : "year"}
                        key={`year-${yearindex}`}
                      >
                        <p className="origin"></p>
                        {yearitem.list.length > 0 ? <p className="txt">{yearitem.year}</p> : null}
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Stick;
