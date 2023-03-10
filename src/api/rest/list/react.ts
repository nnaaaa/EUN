import Axios from 'api/rest/axios'
import { ID } from 'models/index'
import { IReact } from 'models/react'

class ReactAPI {
    url = `react`
    addReactToPost = async (react: Omit<IReact, '_id'>) => {
        return Axios.post(`${this.url}/addToPost`, react)
    }
    addReactToComment = async (react: Omit<IReact, '_id'>) => {
        return Axios.post(`${this.url}/addToComment`, react)
    }
    addReactToMessage = async (react: Omit<IReact, '_id'>) => {
        return Axios.post(`${this.url}/addToMessage`, react)
    }
    async updateReact(react: IReact) {
        return Axios.put<IReact>(`${this.url}/update`, react)
    }
    async getReact(reactId: ID) {
        return Axios.get<IReact>(`${this.url}/get/${reactId}`)
    }
    async deleteReact(reactId: ID) {
        return Axios.delete(`${this.url}/delete/${reactId}`)
    }
}

export const reactAPI = new ReactAPI()
