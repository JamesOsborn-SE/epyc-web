export class Entry {
    constructor(
        public id: string | null,
        public created_at: Date | null,
        public user: string | null,
        public game_id: string,
        public sequence: number,
        public sentence: string | null,
        public drawing: string | null) {}
}