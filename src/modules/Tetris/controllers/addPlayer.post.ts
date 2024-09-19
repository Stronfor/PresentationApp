import {HTTPRequest} from "../service/http"

const addPlayer = async(name: string, password: string, record = 0, lastGame = 0) => {
    const request = await HTTPRequest("addPlayer", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({name, password, record, lastGame})
    })

    return request
}

export default addPlayer