import { IShipCategories } from 'games/battleShip/modals/ship'
import { ShipCategories } from './ship'
import Constants from '../constants'

export class LightnightShip extends ShipCategories {
    build() {
        const name = 'Lightnight'
        const category: IShipCategories = {
            name,
            size: this._2x1,
        }
        return category
    }
}
