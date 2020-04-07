var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.timeInterval = 1 / 60 * 1000;
        _this.bgSpeed = 0.5;
        // 记录上一帧的时间
        _this.timeOnEnterFrame = 0;
        _this.lockTime = 100;
        return _this;
    }
    GameScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
        this.setListeners();
    };
    GameScene.prototype.init = function () {
        this.heroPlane = new HeroPlane('hero_png');
        this.heroPlane.appear(Global.stage.stageWidth / 2, Global.stage.stageHeight * 2 / 3);
        this.addChild(this.heroPlane);
    };
    GameScene.prototype.setListeners = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    GameScene.prototype.removeListener = function () {
        this.touchEnabled = false;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
    };
    GameScene.prototype.touchBegin = function (e) {
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.heroPlane.fly(e.stageX, e.stageY);
    };
    GameScene.prototype.setLockTimeout = function () {
        if (this.lockTouchMove) {
            return true;
        }
        this.lockTouchMove = true;
        egret.clearTimeout(this.timeoutId);
        this.timeoutId = egret.setTimeout(function () {
            this.lockTouchMove = false;
        }, this, this.lockTime);
        return false;
    };
    GameScene.prototype.touchMove = function (e) {
        if (this.setLockTimeout()) {
            return;
        }
        this.heroPlane.fly(e.stageX, e.stageY);
    };
    GameScene.prototype.touchEnd = function (e) {
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
    };
    GameScene.prototype.onEnterFrame = function () {
        /* 获取每一帧的时间差，用时间间隔位置位移会更加平滑 */
        var now = egret.getTimer();
        var time = this.timeOnEnterFrame;
        var pass = now - time;
        this.timeOnEnterFrame = now;
        if (pass > this.timeInterval * 2) {
            return;
        }
        this.scrollBg(pass);
    };
    GameScene.prototype.scrollBg = function (pass) {
        var delY = this.bgSpeed * pass;
        this.bg1.y += delY;
        this.bg2.y += delY;
        if (this.bg1.y > Global.stage.stageHeight) {
            this.bg1.y = 0;
            this.bg2.y = -Global.stage.stageHeight;
        }
    };
    return GameScene;
}(eui.Component));
__reflect(GameScene.prototype, "GameScene", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=GameScene.js.map