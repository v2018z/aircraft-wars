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
var MeneScene = (function (_super) {
    __extends(MeneScene, _super);
    function MeneScene() {
        return _super.call(this) || this;
    }
    MeneScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    MeneScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.animation.play();
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            alert(234);
        }, this);
    };
    return MeneScene;
}(eui.Component));
__reflect(MeneScene.prototype, "MeneScene", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=MeneScene.js.map