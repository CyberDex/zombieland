import { Application } from 'pixi.js'
import { Components } from './helpers/enums/components'
import ComponentController from './controllers/ComponentController'

export default class SlotGame extends Application {
    private componentsController: ComponentController

    constructor() {
        super()
        this.componentsController = new ComponentController(this)
        this.init().then(() => this.ready())
    }

    public async init() {
        await this.componentsController.initComponents([
            Components.BG,
            // Components.SLOT_MACHINE,
            // Components.UI,
        ])
        this.onResize()
    }

    private ready() {
        document.body.appendChild(this.view)
        window.addEventListener('resize', this.onResize.bind(this))
    }

    private onResize() {
        this.renderer.resize(window.innerWidth + 2, window.innerHeight + 2)
        this.stage.children.forEach((element: any) => element.resize(this.renderer.width, this.renderer.height))
    }
}