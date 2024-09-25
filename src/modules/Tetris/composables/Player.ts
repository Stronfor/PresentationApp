import type { IPlayer } from "./types";


export default class Player implements IPlayer {
    name = ""
    score = 0
    record = 0
    lastGame = ""

    constructor(name: string = "", record = 0, lastGame = ""){
        this.name = name
        this.record = record
        this.lastGame = lastGame
        this.score = 0
    }
}