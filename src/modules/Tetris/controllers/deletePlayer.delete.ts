import {HTTPRequest} from "../service/http"

const deletePlayer = async(name: string) => {
    const request = await HTTPRequest("deletePlayer", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({name})
    })

    return request
}

export default deletePlayer