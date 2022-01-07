import { IShipCategories } from 'games/battleShip/modals/ship'
import { ShipCategories } from './ship'
import Constants from '../constants'

export class SubmarineShip extends ShipCategories {
    build() {
        const name = 'Submarine'
        const category: IShipCategories = {
            name,
            size: this._5x1,
        }
        return category
    }
}
