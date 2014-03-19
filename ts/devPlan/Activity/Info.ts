module devPlan {
    /**
        * 
        */
    export class ActivityInfo {
        /**
         * 
         */
        private id: number;
        /**
         * 
         */
        private numberOfHours: number;
        /**
         * 
         */
        private positionNumberInOrder: number;
        /**
         * 
         */
        constructor(id: number, numberOfHours: number = 0) {
            this.setId(id);
            this.setNumberOfHours(numberOfHours);
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
        private setId(id: number): ActivityInfo {
            this.id = id;
            return this;
        }
        /**
         * 
         */
        public getNumberOfHours(): number {
            return this.numberOfHours;
        }
        /**
         * 
         */
        private setNumberOfHours(numberOfHours: number): ActivityInfo {
            this.numberOfHours = numberOfHours;
            return this;
        }
    }
}