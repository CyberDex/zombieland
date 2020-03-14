import { AnimatedSprite, Texture, Container, Sprite } from 'pixi.js';
import { SlotTypes } from "../enums/SlotTypes";
import { ISlotConfig } from '../interfaces/IConfig';
import ISlot from "../interfaces/ISlot";

export default class Slot extends Sprite {
    private animation: AnimatedSprite;
    private activness = false;

    constructor(config: ISlot) {
        super(Texture.from(config.parameters.fileTemplate + config.type))

        const marginX = config.parameters.marging.x
        const marginY = config.parameters.marging.y
        this.x = config.x + marginX / 2
        this.y = config.y + marginY / 2
        this.width = config.w - marginX
        this.height = config.h - marginY

        this.animation = this.addAnimation(config)
        this.addChild(this.animation)
        this.active = true;
    }

    public set active(active: boolean) {
        if (this.activness === active) { return; }
        this.activness = active
        this.interactive = active
        this.buttonMode = active
        active
            ? this.on('pointerdown', this.play)
            : this.off('pointerdown', this.play)
    }

    public get active() {
        return this.activness
    }

    private addAnimation(config: ISlot) {
        const animTextures = this.animTextures(
            config.parameters.fileTemplate + "anim/" + config.type,
            config.parameters.framesCount[config.type]
        )
        const animation = new AnimatedSprite(animTextures);
        animation.alpha = 0
        animation.anchor.set(.5)
        const marginX = config.parameters.marging.x
        const marginY = config.parameters.marging.y
        animation.x = this.width - marginX / 4
        animation.y = this.height - marginY / 2.2
        animation.loop = false
        return animation
    }

    private animTextures(slotType: string, framesCount = 1) {
        const animTextures = [];
        for (let i = 0; i < framesCount; i++) {
            animTextures.push(Texture.from(`${slotType}/${i + 1}`));
        }
        return animTextures
    }

    public play() {
        this.animation.alpha = 1
        this.animation.gotoAndPlay(1)
        this.animation.onComplete = () => {
            this.animation.alpha = 0
        };
    }
}