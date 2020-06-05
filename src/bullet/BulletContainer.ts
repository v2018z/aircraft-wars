class BulletContainer extends egret.Sprite {
	public bullets: Array<BaseBullet> = [];
	public constructor() {
		super();
	}

	public addBullet(bullet: BaseBullet) {
		this.bullets.push(bullet);
		this.addChild(bullet);
	}

	public move(heroPlane: HeroPlane, enemyContainer: EnemyContainer, time: number) {
		for(let i = this.bullets.length-1;i >= 0;i--){
			let bullet = this.bullets[i]
			bullet.move(time)

			// 如果子弹是主角发射的
			if (bullet.owner === heroPlane) {
				const enemy = enemyContainer.hitCheck(bullet);
				if (enemy) {
					heroPlane.dispatchScoreEvent(enemy.score);
					this.destroy(i);
					continue
				}
			} else {
				if (bullet.hitCheck(heroPlane)) {
					heroPlane.hurt(bullet);
					this.destroy(i);
					continue;
				}
			}

			//子弹超出了屏幕，就销毁
			if(!bullet.validate()){
				this.destroy(i)
			}
		}
	}

	public destroy(index: number) {
		this.removeChildAt(index);
		this.bullets.splice(index, 1);
	}
}