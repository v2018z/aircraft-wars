class HeroPlane extends BasePlane {
    private score: number = 0;
    public constructor(name: string) {
        super(name);

        this.setScale(0.5);
        this.flySpeed = 300;
        this.hp = 1000;
    }

    public fly(x: number, y:number) {
        var speedo = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)) / this.flySpeed;
        egret.Tween.removeTweens(this);
        var tw = egret.Tween.get(this);
        console.log(x, y);
        tw.to( { x, y }, speedo * 1000, egret.Ease.sineOut);
    }

    dispatchHPEvent() {
        let event = new egret.Event('setHP');
        event.data = `${this.hp}`;
        this.dispatchEvent(event);
    }

    dispatchScoreEvent() {
        let event = new egret.Event('setScore');
        event.data = `${this.score}`;
        this.dispatchEvent(event);
    }
}