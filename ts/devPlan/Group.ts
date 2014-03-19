/**
 * 
 */
module devPlan {
    /**
     * Class represents Group from Cash service
     * @version 0.8
     */
    export class Group {
        /**
         * Group id
         * @since 0.8
         */
        private id: number = 0;
        /**
         * Group name
         * @since 0.8
         */
        private name: string = "";
        /**
         * @since 0.8
         */
        constructor(id: number = 0, name: string = "") {
            this.setId(id);
            this.setName(name);
        }
        /**
         * Returns group id
         * @since 0.8
         */
        public getId(): number {
            return this.id;
        }
        /**
         * Sets group id
         * @since 0.8
         */
        public setId(id: number = 0): void {
            this.id = id;
        }
        /**
         * Returns group name
         * @since 0.8
         */
        public getName(): string {
            return this.name;
        }
        /**
         * Sets group name
         * @since 0.8
         */
        public setName(name: string = ""): void {
            this.name = name;
        }
    }
}