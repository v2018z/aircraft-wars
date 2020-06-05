class MeneScene extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	public button: eui.Button;
	public animation: egret.Tween;

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.animation.play();
		this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			Global.replaceScene(new GameScene());
		}, this);
	}
	
}