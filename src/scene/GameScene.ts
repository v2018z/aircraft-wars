class GameScene extends eui.Component implements  eui.UIComponent {
	private timeInterval: number = 1 / 60 * 1000;
	private bg1: eui.Image;
	private bg2: eui.Image;
	private bgSpeed: number = 0.5;
	/**
	 * 记录上一帧的时间
	 */
	private timeOnEnterFrame: number = 0;
	public heroPlane: HeroPlane;
	/**
	 * 控制移动时间的频率，提高性能
	 */
	public lockTouchMove: boolean;
	public lockTime: number = 100;
	public timeoutId: number; 

	private hp: eui.BitmapLabel;
	private score:eui.BitmapLabel;
	private group: eui.Group;

	// 子弹容器
	public bulletContainer: BulletContainer;
	public enemyContainer: EnemyContainer;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
		this.setListeners();
	}

	private init() {
		this.heroPlane = new HeroPlane('hero_png');
		this.heroPlane.appear(Global.stage.stageWidth / 2, Global.stage.stageHeight * 2/3);
		this.addChild(this.heroPlane);

		this.bulletContainer = new BulletContainer();
		this.addChild(this.bulletContainer);

		this.enemyContainer = new EnemyContainer();
		this.addChild(this.enemyContainer);
	}

	private setListeners() {
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
		
		this.heroPlane.addEventListener('setHP', this.setHP, this);
		this.heroPlane.addEventListener('setScore', this.setScore, this);
	}

	private setHP(event) {
		this.hp.text = event.data;
	}

	private setScore(event) {
		this.score.text = event.data;
	}

	private removeListener() {
		this.touchEnabled = false;
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
		this.heroPlane.removeEventListener('setHP', this.setHP, this);
		this.heroPlane.removeEventListener('setScore', this.setScore, this);
	}

	private touchBegin(e: egret.TouchEvent) {
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
		this.heroPlane.fly(e.stageX, e.stageY);
	}

	private setLockTimeout(): boolean {
		if (this.lockTouchMove) {
			return true;
		}
		this.lockTouchMove = true;
		egret.clearTimeout(this.timeoutId);
		this.timeoutId = egret.setTimeout(function() {
			this.lockTouchMove = false;
		}, this, this.lockTime);
		return false;
	}

	private touchMove(e: egret.TouchEvent) {
		if (this.setLockTimeout()) {
			return;
		}
		this.heroPlane.fly(e.stageX, e.stageY);
	}

	private touchEnd(e: egret.TouchEvent) {
		this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
	}

	private onEnterFrame() {
		/* 获取每一帧的时间差，用时间间隔位置位移会更加平滑 */
		const now = egret.getTimer();
		const time = this.timeOnEnterFrame;
		const pass = now - time;
		this.timeOnEnterFrame = now;

		if (pass > this.timeInterval * 2) {
			return;
		}
		this.scrollBg(pass);
		this.shootBullet(pass);
		this.createEnemy(pass);
	}

	private scrollBg(pass: number) {
		const delY = this.bgSpeed * pass;
		this.bg1.y += delY;
		this.bg2.y += delY;
		if (this.bg1.y > Global.stage.stageHeight) {
			this.bg1.y = 0;
			this.bg2.y = - Global.stage.stageHeight;
		}
	}

	private shootBullet(pass: number) {
		this.heroPlane.shoot(this.bulletContainer, pass);
		this.bulletContainer.move(this.heroPlane, this.enemyContainer, pass);
	}

	private createEnemy(pass: number) {
		this.enemyContainer.createEnemy(pass);
		this.enemyContainer.moveAndShoot(this.heroPlane, this.bulletContainer, pass);
	}
	
}