import React, { Component } from "react";
import { Icon, Popover, Modal } from "antd";

class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      vis: false
    };
  }
  weibo = () => {
    let str = `http://service.weibo.com/share/share.php?
    &title=中国问题研究文献出版目录及服务平台
    &url=${window.location.href}`;
    window.open(str);
  };
  qq = () => {
    let str = `https://connect.qq.com/widget/shareqq/index.html?url=
    ${window.location.href}&desc=中国问题研究文献出版目录及服务平台&pics=&site=bshare`;
    window.open(str);
  };
  weixin = () => {
    this.setState({
      visible: true,
      vis: false
    });
  };
  closeWeixin = () => {
    this.setState({
      visible: false,
      vis: false
    });
  };
  handleVisibleChange = visible => {
    this.setState({ vis: visible });
  };
  render() {
    const shareContent = (
      <div className="share-parent">
        <ul>
          <li id="bp-sinaminiblog" onClick={this.weibo}>
            <span className="bsPlatIcon" title="新浪微博">
              <img alt="" className="bsPlatImg" src="http://static.bshare.cn/frame/images//logos/mp2/sinaminiblog.gif" />
            </span>
            <div className="bsPlatName" title="新浪微博">
              新浪微博
            </div>
          </li>
          <li id="bp-weixin" onClick={this.weixin}>
            <span className="bsPlatIcon" title="微信">
              <img alt="" className="bsPlatImg" src="http://static.bshare.cn/frame/images//logos/mp2/weixin.gif" />
            </span>
            <div className="bsPlatName" title="微信">
              微信
            </div>
          </li>
          <li id="bp-qqim" onClick={this.qq}>
            <span className="bsPlatIcon" title="QQ好友">
              <img alt="" className="bsPlatImg" src="http://static.bshare.cn/frame/images//logos/mp2/qqim.gif" />
            </span>
            <div className="bsPlatName" title="QQ好友">
              QQ好友
            </div>
          </li>
        </ul>
      </div>
    );
    return (
      <span>
        <Popover visible={this.state.vis} onVisibleChange={this.handleVisibleChange} trigger="click" placement="top" content={shareContent}>
          <span className="icon">
            <Icon type="share-alt" />
          </span>
          分享
        </Popover>
        <Modal title={null} centered={true} footer={null} closable={false} width={248} className="share-modal" onCancel={this.closeWeixin} visible={this.state.visible}>
          <div className="weixin-code"></div>
        </Modal>
      </span>
    );
  }
}

export default Share;
