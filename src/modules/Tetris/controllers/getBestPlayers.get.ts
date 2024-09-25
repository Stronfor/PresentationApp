import {HTTPRequest} from "../service/http"

const getBestPlayer = async() => {
    const request = await HTTPRequest("bestPlayers")

    return request
}

export default getBestPlayer