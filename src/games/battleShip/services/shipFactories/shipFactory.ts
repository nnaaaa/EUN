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
            const x = this.rand(0, this._atlasSize - newShipSize.width)
            const y = this.rand(0, this._atlasSize - newShipSize.height)
            const _body: IBody[] = this.createBody(
                x,
                y,
                newShipSize.width,
                newShipSize.height
            )
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
    protected createBody(initX: number, initY: number, width: number, height: number) {
        const _body: IBody[] = []
        for (let i = 0; i < width; ++i) {
            for (let j = 0; j < height; ++j) {
                const body: IBody = {
                    x: initX + i,
                    y: initY + j,
                    type: 'pure',
                }
                _body.push(body)
            }
        }
        return _body
    }
    protected isJostle = (newBody: IBody[]) => {
        const oldShipsBody = this._ships.map((oldShip) => oldShip.body)
        for (const oldBody of oldShipsBody) {
            for (const oS of oldBody) {
                for (const nS of newBody) if (oS.x == nS.x && oS.y == nS.y) return true
            }
        }

        return false
    }
    protected abstract createShips(): void
    manufacture() {
        this.createShips()
        return this._ships
    }
}
