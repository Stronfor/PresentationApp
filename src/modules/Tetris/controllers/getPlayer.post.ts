import {HTTPRequest} from "../service/http"

const getPlayer = async(name: string, password: string,) => {
    const request = await HTTPRequest("getPlayer", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, password})
    })

    return request
}

export default getPlayer