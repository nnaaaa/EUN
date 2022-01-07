import { CruiserShip } from '../shipCategories/cruiser'
import { PatrolShip } from '../shipCategories/patrol'
import { CarrierShip } from '../shipCategories/carrier'
import { ThreeShipFactory } from './threeShipFactory'

export class SixShipFactory extends ThreeShipFactory {
    protected createShips() {
        const cruiserCtg = new CruiserShip().build()
        const cruiserShip = this.createShipByRand(cruiserCtg)
        this._ships.push(cruiserShip)

        const patrolCtg = new PatrolShip().build()
        const patrolShip = this.createShipByRand(patrolCtg)
        this._ships.push(patrolShip)

        const carrierCtg = new CarrierShip().build()
        const carrierShip = this.createShipByRand(carrierCtg)
        this._ships.push(carrierShip)
    }
}
