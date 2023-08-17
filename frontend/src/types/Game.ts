import { Entry } from "./Entry";

export class Game{
    constructor(
        public id: string | undefined,
        public created_at: Date,
        public completed_at: Date,
        public user: string,
        public entries: Array<Entry>
        ){}
}