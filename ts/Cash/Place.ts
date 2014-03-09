module Cash {
    export interface PlaceInterface {
        id: number;
        location: string;
    }
    /**
     * Model of place data
     */
    export class Place {
        /**
         * 
         */
        public id: number = 0;
        /**
         * 
         */
        public location: string = "";
        /**
         * 
         */
        constructor(object: Cash.PlaceInterface = { id: 0, location: "" }) {
            this.setId((object == null) ? 0 : object.id);
            this.setLocation((object == null) ? "" : object.location);
        }
        /**
         * 
         */
        public getId(): number {
            return this.id;
        }
        /**
         * 
         */
        public setId(id: number): void {
            this.id = id;

        }
        /**
         * 
         */
        public getLocation(): string {
            return this.location;
        }
        /**
         * 
         */
        public setLocation(location: string): void {
            this.location = location;
        }
    }
}