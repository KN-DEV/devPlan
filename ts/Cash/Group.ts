
module Cash {
    /**
     * 
     */
    export interface GroupInterface {
        /**
         * 
         */
        id: number;
        /**
         * 
         */
        name: string;
    }
    /**
     * Model of group data
     */
    export class Group {
        /**
         * 
         */
        public id: number = 0;
        /**
         * 
         */
        public name: string = "";


        /**
         * 
         */
        constructor(object: Cash.GroupInterface = { id: 0, name: "" }) {
            this.setId((object == null) ? 0 : object.id);
            this.setName((object == null) ? "" : object.name);
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
        public setId(id: number = 0): void {
            this.id = id;
        }
        /**
         * 
         */
        public getName(): string {
            return this.name;
        }
        /**
         * 
         */
        public setName(name: string = ""): void {
            this.name = name;
        }

    }
}