import { IShipCategories } from 'games/battleShip/modals/ship'
import { ShipCategories } from './ship'
import Constants from '../constants'

export class CarrierShip extends ShipCategories {
    build() {
        const name = 'Carrier'
        const category: IShipCategories = {
            name,
            size: this._6x2,
            image: Constants.getShipImage(name),
        }
        return category
    }
}
