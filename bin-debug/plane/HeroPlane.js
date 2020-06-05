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
var HeroPlane = (function (_super) {
    __extends(HeroPlane, _super);
    function HeroPlane(name) {
        var _this = _super.call(this, name) || this;
        _this.setScale(0.5);
        _this.flySpeed = 300;
        _this.hp = 1000;
        _this.bulletSpeed = -0.6;
        _this.bulletPositions = [
            { x: -20, y: 20 },
            { x: 20, y: 20 },
        ];
        Global.plane = _this;
        return _this;
    }
    HeroPlane.prototype.fly = function (x, y) {
        var speedo = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)) / this.flySpeed;
        egret.Tween.removeTweens(this);
        var tw = egret.Tween.get(this);
        tw.to({ x: x, y: y }, speedo * 1000, egret.Ease.sineOut);
    };
    HeroPlane.prototype.dispatchHPEvent = function (hp) {
        if (hp === void 0) { hp = 0; }
        this.hp -= hp;
        var event = new egret.Event('setHP');
        event.data = "" + this.hp;
        this.dispatchEvent(event);
    };
    HeroPlane.prototype.dispatchScoreEvent = function (score) {
        if (score === void 0) { score = 0; }
        this.score += score;
        var event = new egret.Event('setScore');
        event.data = "" + this.score;
        this.dispatchEvent(event);
    };
    HeroPlane.prototype.shoot = function (bulletContainer, time) {
        var _this = this;
        if (!this.addShootTime(time)) {
            return;
        }
        this.bulletPositions.forEach(function (position) {
            var bullet = new BaseBullet('bullet_png', _this);
            bullet.show(position);
            bulletContainer.addBullet(bullet);
        });
    };
    HeroPlane.prototype.hurt = function (target) {
        if (target instanceof BaseEnemy) {
            this.dispatchHPEvent(target.expoldeAtk);
        }
        else {
            this.dispatchHPEvent(target.atk);
        }
    };
    return HeroPlane;
}(BasePlane));
__reflect(HeroPlane.prototype, "HeroPlane");
//# sourceMappingURL=HeroPlane.js.map