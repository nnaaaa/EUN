import { ShipFactory } from './shipFactory'
import { DestroyerShip } from '../shipCategories/destroyer'
import { LightnightShip } from '../shipCategories/lightnight'
import { SubmarineShip } from '../shipCategories/submarine'

export class ThreeShipFactory extends ShipFactory {
    protected build() {
        const destroyerCtg = new DestroyerShip().build()
        const destroyerShip = this.createShipByRand(destroyerCtg)
        this._ships.push(destroyerShip)

        const lightnightCtg = new LightnightShip().build()
        const lightnightShip = this.createShipByRand(lightnightCtg)
        this._ships.push(lightnightShip)

        const submarineCtg = new SubmarineShip().build()
        const submarineShip = this.createShipByRand(submarineCtg)
        this._ships.push(submarineShip)
    }
}
