import { IShipCategories } from 'games/battleShip/modals/ship'
import { ShipCategories, ShipSize } from './ship'
import Constants from '../constants'

export class DestroyerShip extends ShipCategories {
    build() {
        const name = 'Destroyer'
        const category: IShipCategories = {
            name,
            size: new ShipSize(4, 1),
        }
        return category
    }
}
