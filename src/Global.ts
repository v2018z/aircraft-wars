class Global {
	public static stage: egret.Stage;
	public static plane:HeroPlane

	public static addScene(scene: eui.UIComponent) {
		this.stage.addChild(scene);
	}

	public static replaceScene(scene: eui.UIComponent) {
		this.stage.removeChildren();
		this.stage.addChild(scene);
	}
}