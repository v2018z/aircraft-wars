class BaseObject extends egret.Sprite {

	private bitmap: egret.Bitmap;
	public constructor(name: string) {
		super()
		this.bitmap = this.createBitmapByName(name);
		this.addChild(this.bitmap);
		this.setCenter();
	}

	setCenter() {
		this.anchorOffsetX = this.bitmap.width / 2;
		this.anchorOffsetY = this.bitmap.height / 2;
	}

	setScale(scale: number) {
		this.scaleX = scale;
		this.scaleY = scale;
	}

	createBitmapByName(name: string): egret.Bitmap {
		let result = new egret.Bitmap();
		let texture: egret.Texture = RES.getRes(name);
		if (!texture) {
			throw `${name}图片不存在`
		}
		result.texture = texture;
		return result;
	}
}