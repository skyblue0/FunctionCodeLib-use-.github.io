/**
 * Created by MyLove on 2017/8/7 0007.
 */
(function (window) {
  function tabSwitch(obj) {
    this.tabMenus = null;
    this.tabMains = null;
    this.tabMain = null;
    this.mainToggleClass = obj.mainToggleClass;
    this.menuToggleClass = obj.menuToggleClass;
    this.autoPlayflag = obj.autoPlay | false;
    this.index = 0;
    this.autoTimerId = null;
    this.init(obj);
  }
  tabSwitch.prototype = {
    constructor: tabSwitch,
    // 初始化
    init: function (obj) {
      // 查找dom元素
      this.bindDom(obj);
      // 绑定事件
      this.bindEvent();
      // 自动切换
      this.autoPlay();
    },
    // 查找dom元素
    bindDom: function (obj) {
      this.tabMenus = document.getElementById("" + obj.tabMenuId).children;
      this.tabMains = document.getElementById("" + obj.tabMainId).children;
      this.tabMain = document.getElementById("" + obj.tabMainId);
    },
    // 绑定事件
    bindEvent: function () {
      var that = this;
      // tab切换事件
      for (var i = 0; i < this.tabMenus.length; i++) {
        this.tabMenus[i].index = i;
        this.tabMenus[i].onclick = function () {
          that.index = this.index;
          that.select(this);
        }
      }
      // 停止自动切换触发事件
      this.tabMain.onmouseover = function () {
        clearInterval(that.autoTimerId);
      }
      // 开启自动切换触发事件
      this.tabMain.onmouseout = function () {
        that.autoPlay();
      }
    },
    // 自动切换
    autoPlay: function () {
      clearInterval(this.autoTimerId);
      if (this.autoPlayflag) {
        var that = this;
        this.autoTimerId = setInterval(function () {
          that.select(that.tabMenus[that.index]);
          that.index++;
          if (that.index >= that.tabMenus.length) {
            that.index = 0;
          }
        }, 1000);
      }
    },
    //让对应的tab按钮处于选中的状态，并切换对应的tab页内容
    select: function (ele) {
      for (var i = 0; i < this.tabMenus.length; i++) {
        this.tabMenus[i].classList.remove(this.menuToggleClass);
        this.tabMains[i].classList.remove(this.mainToggleClass);
      }
      ele.classList.add(this.menuToggleClass);
      this.tabMains[this.index].classList.add(this.mainToggleClass);
    }
  }
  
  window.tabSwitch = tabSwitch;
})(window);