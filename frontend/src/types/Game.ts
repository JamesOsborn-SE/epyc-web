import { Entry } from "./Entry";

export class Game{
    constructor(public id: string | null, public entries: Array<Entry>){}
}