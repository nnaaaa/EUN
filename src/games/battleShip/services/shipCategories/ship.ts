import { IShipCategories, IShipSize } from 'games/battleShip/modals/ship'

class ShipSize implements IShipSize {
    constructor(public width: number, public height: number) {}
}

export abstract class ShipCategories {
    protected _6x2: IShipSize
    protected _5x1: IShipSize
    protected _4x1: IShipSize
    protected _3x1: IShipSize
    protected _2x1: IShipSize
    constructor() {
        this._6x2 = new ShipSize(6, 2)
        this._5x1 = new ShipSize(5, 1)
        this._4x1 = new ShipSize(4, 1)
        this._3x1 = new ShipSize(3, 1)
        this._2x1 = new ShipSize(2, 1)
    }
    abstract build(): IShipCategories
}
