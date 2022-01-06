import { IBody, IShip, IShipCategories } from 'games/battleShip/modals/ship'

export abstract class ShipFactory {
    protected _ships: IShip[]
    protected _atlasSize: number
    constructor(atlatSize: number) {
        this._ships = []
        this._atlasSize = atlatSize
    }
    protected createShipByRand = (shipCategory: IShipCategories) => {
        const isHorizontal = this.rand(0, 2)
        let newShipSize = isHorizontal
            ? shipCategory.size
            : {
                  width: shipCategory.size.height,
                  height: shipCategory.size.width,
              }

        while (true) {
            const _body: IBody[] = []
            const x = this.rand(0, this._atlasSize - newShipSize.width)
            const y = this.rand(0, this._atlasSize - newShipSize.height)
            for (let i = 0; i < newShipSize.width; ++i) {
                for (let j = 0; j < newShipSize.height; ++j) {
                    const body: IBody = {
                        x: x + i,
                        y: y + j,
                        type: 'pure',
                    }
                    _body.push(body)
                }
            }
            if (!this.isJostle(_body)) {
                const _ship: IShip = {
                    body: _body,
                    direction: isHorizontal ? 'left' : 'top',
                    ...shipCategory,
                }
                return _ship
            }
        }
    }
    protected rand = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min) + min)
    protected isJostle = (newBody: IBody[]) => {
        const oldShipsBody = this._ships.map((oldShip) => oldShip.body)
        const oldBodyFlat: IBody[] = []
        for (const body of oldShipsBody) oldBodyFlat.concat(body)
        for (const oS of oldBodyFlat) {
            for (const nS of newBody) if (oS.x == nS.x && oS.y == nS.y) return true
        }
        return false
    }
    protected abstract build(): void
    manufacture() {
        this.build()
        return this._ships
    }
}
