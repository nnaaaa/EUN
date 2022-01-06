import { IShipCategories } from 'games/battleShip/modals/ship'
import { ShipCategories } from './ship'
import Constants from '../constants'

export class PatrolShip extends ShipCategories {
    build() {
        const name = 'Patrol'
        const category: IShipCategories = {
            name,
            size: this._3x1,
            image: Constants.getShipImage(name),
        }
        return category
    }
}
