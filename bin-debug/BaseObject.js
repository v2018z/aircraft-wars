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
var BaseObject = (function (_super) {
    __extends(BaseObject, _super);
    function BaseObject(name) {
        var _this = _super.call(this) || this;
        _this.bitmap = _this.createBitmapByName(name);
        _this.addChild(_this.bitmap);
        _this.setCenter();
        return _this;
    }
    BaseObject.prototype.setCenter = function () {
        this.anchorOffsetX = this.bitmap.width / 2;
        this.anchorOffsetY = this.bitmap.height / 2;
    };
    BaseObject.prototype.setScale = function (scale) {
        this.scaleX = scale;
        this.scaleY = scale;
    };
    BaseObject.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        if (!texture) {
            throw name + "\u56FE\u7247\u4E0D\u5B58\u5728";
        }
        result.texture = texture;
        return result;
    };
    return BaseObject;
}(egret.Sprite));
__reflect(BaseObject.prototype, "BaseObject");
//# sourceMappingURL=BaseObject.js.map