/**
 * 
 */
module devPlan {
    /**
     * Class represents Tutor from Cash service
     * @version 0.8
     */
    export class Tutor {
        /**
         * Tutor id
         * @since 0.8
         */
        private id: number = 0;
        /**
         * Tutor name
         * @since 0.8
         */
        public name: string = "";
        /**
         * Tutor url to moodle platform
         * @since 0.8
         */
        public moodle_url: string = "";

        /**
         * @since 0.8
         */
        constructor(id: number= 0, name: string= "", moodle_url: string= "") {
            this.setId(id);
            this.setName(name);
            this.setMoodleUrl(moodle_url);
        }
        /**
         * Returns tutor id
         * @since 0.8
         */
        public getId(): number {
            return this.id;
        }
        /**
         * Sets tutor id
         * @since 0.8
         */
        public setId(id: number = 0): void {
            this.id = id;
        }
        /**
         * Returns tutor name
         * @since 0.8
         */
        public getName(): string {
            return this.name;
        }
        /**
         * Sets tutor name
         * @since 0.8
         */
        public setName(name: string = ""): void {
            this.name = name;
        }
        /**
         * Returns tutor url to moodle platform
         * @since 0.8
         */
        public getMoodleUrl(): string {
            return this.moodle_url;
        }
        /**
         * Sets tutor url to moodle platform
         * @since 0.8
         */
        public setMoodleUrl(moodle_url: string= ""): void {
            this.moodle_url = moodle_url;
        }
    }
}