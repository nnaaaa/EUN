import { IShipCategories, IShipCategoryManager } from 'games/battleShip/modals/ship'
import { ShipCategories, ShipCategoryManager, ShipSize } from './ship'

export class CarrierShip extends ShipCategories {

    
    build() {
        const name = 'Carrier'
        const category: IShipCategories = {
            name,
            size: new ShipSize(6,2),
        }
        return category
    }
}

