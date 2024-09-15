import type { IPlayer } from "./types";


export default class Player implements IPlayer {
    name = ""
    password = ""
    score = 0

    constructor(name: string, password: string){
        this.name = name
        this.password = password
    }

    continueGame(name: string, password: string){
    
    }
}