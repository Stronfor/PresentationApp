import {HTTPRequest} from "../service/http"

const getAllPlayer = async() => {
    const request = await HTTPRequest("allPlayers")

    return request
}

export default getAllPlayer