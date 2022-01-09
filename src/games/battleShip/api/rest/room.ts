import Axios from 'api/rest/axios'
import { IRoom } from 'games/battleShip/modals/room'

class RoomAPI {
    url = `game/battleShip/room`
    create = async (room: Partial<IRoom>) => {
        return Axios.post(`${this.url}/create`, room)
    }
    update = async (room: Partial<IRoom>) => {
        return Axios.post(`${this.url}/update`, room)
    }
}

export default new RoomAPI()
