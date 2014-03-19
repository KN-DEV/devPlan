/**
 * 
 */
module devPlan{
    /**
     * Class represents Place from Cash service
     * @since 0.8
     */
    export class Place {
        /**
         * Place id
         * @since 0.8
         */
        private id: number = 0;
        /**
         * Location name
         * @since 0.8
         */
        private location: string = "";
        /**
         * @since 0.8
         */
        constructor(id: number = 0, location: string= "") {
            this.setId(id);
            this.setLocation(location);
        }
        /**
         * Returns place id
         * @since 0.8
         */
        public getId(): number {
            return this.id;
        }
        /**
         * Sets place id
         * @since 0.8
         */
        public setId(id: number = 0): void {
            this.id = id;
        }
        /**
         * Returns place location
         * @since 0.8
         */
        public getLocation(): string {
            return this.location;
        }
        /**
         * Sets place location
         * @since 0.8
         */
        public setLocation(location: string= ""): void {
            this.location = location;
        }
    }
}