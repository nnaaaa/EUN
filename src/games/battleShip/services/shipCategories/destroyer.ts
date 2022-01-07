import { IShipCategories } from 'games/battleShip/modals/ship'
import { ShipCategories } from './ship'
import Constants from '../constants'

export class DestroyerShip extends ShipCategories {
    build() {
        const name = 'Destroyer'
        const category: IShipCategories = {
            name,
            size: this._4x1,
        }
        return category
    }
}
