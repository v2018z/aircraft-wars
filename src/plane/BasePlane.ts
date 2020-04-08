class BasePlane extends BaseObject {
    /**
     * 生命值
     */
    public hp: number = 10000;
    /**
     * 攻击力
     */
    public atk: number = 10;
    /**
     * 飞行速度
     */
    protected flySpeed: number = 300;
    /**
     * 爆炸例子动画播放的时间
     */
    public explodeTime: number = 1000;
    /**
     * 受攻击粒子动画播放的时间
     */
    public hurtTime: number = 500;
    /**
     * 是否爆炸的状态
     */
    public isExploade: boolean = false;
    /**
     * 是否销毁的状态
     */
    public isDie: boolean = false;
    /**
     * 子弹出现的位置
     */
    public bulletPositions: Array<Object> = [];
    // 子弹飞行的速度
    public bulletSpeed: number = 0.05;
    // 子弹发射的频率
    public shootInterval: number = 200;
    public threshold: number = 0;
    
    public constructor(name: string) {
        super(name);

		this.init()
    }

    protected init() {}

    public hitCheck(target: BasePlane, length: number = 50): boolean {
        if (target.isExploade) return false;

        let x1 = this.x;
        let y1 = this.y;
        let x2 = target.x;
        let y2 = target.y;

        if ((Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)) > Math.pow(length, 2)) {
            return false;
        }

        return true;
    }

    /**
     * 累计间隔时间，控制子弹发射的频率
     */
    public addShootTime(passOnEnterFrame: number): boolean {
        this.threshold += passOnEnterFrame;
        if (this.threshold > this.shootInterval) {
            this.threshold = 0;
            return true;
        }
        return false;
    }

    public reduceHP(target: BasePlane) {
        this.hp -= target.atk;
        if (this.hp <= 0) {
            this.explode();
            // boom
        }
    }

    /**
     * 出现的初始位置
     */
    public appear(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public fly(x: number, y:number) {

    }

    // 受到攻击，遭受伤害
    protected hurt() {

    }

    // 受到撞击
    protected impact() {

    }
    
    // 血量耗尽，触发爆炸
    protected explode() {

    }
    
    public shoot(bulletContainer: BulletContainer, passOnEnterFrame: number) {}

    /**
     * 判断是否在屏幕外面
     */
    public validate() {
        return !(this.x < -100 || this.x > Global.stage.stageWidth + 100 || this.y < -100 || this.y > Global.stage.stageHeight + 100);
    }

    public destory() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }
    
    public move(time: number) {}
}