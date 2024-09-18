import type { IPlayer } from "./types";


export default class Player implements IPlayer {
    name = ""
    password = ""
    score = 0
    record = 0
    lastGame = ""

    constructor(name: string = "", password: string = "", record = 0, lastGame = ""){
        this.name = name
        this.password = password
        this.record = record
        this.lastGame = lastGame
    }

    continueGame(name: string, password: string){
    
    }
}