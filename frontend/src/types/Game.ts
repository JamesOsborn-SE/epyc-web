import { Entry } from "./Entry";

export class Game{
    constructor(
        public id: string | null,
        public created_at: Date,
        public user: string,
        public entries: Array<Entry>
        ){}
}