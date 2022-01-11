import { IShipCategories } from 'games/battleShip/modals/ship'
import { ShipCategories, ShipSize } from './ship'
import Constants from '../constants'

export class SubmarineShip extends ShipCategories {
    build() {
        const name = 'Submarine'
        const category: IShipCategories = {
            name,
            size: new ShipSize(5,1),
        }
        return category
    }
}
