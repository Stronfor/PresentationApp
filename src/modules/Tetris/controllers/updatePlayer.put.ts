import {HTTPRequest} from "../service/http"

const updatePlayer = async(name: string, record: number, lastGame: string) => {
    const request = await HTTPRequest("updatePlayer", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, record, lastGame})
    })

    return request
}

export default updatePlayer