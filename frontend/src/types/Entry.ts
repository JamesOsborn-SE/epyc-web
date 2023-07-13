export class Entry {
    constructor(
        public id: string,
        public created_at: Date,
        public user: string,
        public game_id: string,
        public sequence: number,
        public sentence: string,
        public drawing: Blob) {}
}