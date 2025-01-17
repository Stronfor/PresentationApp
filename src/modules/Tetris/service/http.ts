
const serverURL = import.meta.env.MODE === 'development' ? "http://127.0.0.1:3000/api/" : "/api/"

export const HTTPRequest = async(url: string, options = {}) => {
    try {
        const fetching = await fetch(serverURL + url, {...options})
        return await fetching.json()
    } catch (e){
        console.warn(e)
    }
    
}