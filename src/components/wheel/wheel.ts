import { AnimatedSprite, Texture, Sprite } from 'pixi.js'
import { IWheel } from '../../helpers/interfaces/IWheel'

export default class Wheel extends Sprite {
    public config: IWheel
    private animation: AnimatedSprite

    constructor(config: IWheel) {
        super(Texture.from(config.bg))
        this.config = config

        this.addChild(this.animation)
    }
}