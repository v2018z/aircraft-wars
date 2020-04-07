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
    
    public constructor(name: string) {
        super(name);
    }

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
    
}