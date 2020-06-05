class HeroPlane extends BasePlane {
    public constructor(name: string) {
        super(name);

        this.setScale(0.5);
        this.flySpeed = 300;
        this.hp = 1000;
        this.bulletSpeed = -0.6;
        this.bulletPositions = [
            {x: -20, y: 20},
            {x: 20, y: 20},
        ]
        Global.plane = this;
    }

    public fly(x: number, y:number) {
        var speedo = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)) / this.flySpeed;
        egret.Tween.removeTweens(this);
        var tw = egret.Tween.get(this);
        tw.to( { x, y }, speedo * 1000, egret.Ease.sineOut);
    }

    public dispatchHPEvent(hp: number = 0) {
        this.hp -= hp;
        let event = new egret.Event('setHP');
        event.data = `${this.hp}`;
        this.dispatchEvent(event);
    }

    public dispatchScoreEvent(score: number = 0) {
        this.score += score;
        let event = new egret.Event('setScore');
        event.data = `${this.score}`;
        this.dispatchEvent(event);
    }

    public shoot(bulletContainer: BulletContainer, time: number) {
        if (!this.addShootTime(time)) {
            return;
        }
        this.bulletPositions.forEach(position => {
            let bullet = new BaseBullet('bullet_png', this);
            bullet.show(position);
            bulletContainer.addBullet(bullet);
        })
    }

    hurt(target: BasePlane) {
        if (target instanceof BaseEnemy) {
            this.dispatchHPEvent(target.expoldeAtk);
        } else {
            this.dispatchHPEvent(target.atk);
        }
    }
}