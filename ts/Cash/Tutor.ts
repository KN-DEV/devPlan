module Cash {


    /**
     * Model of Tutor data
     */
    export interface TutorInterface {
        /**
         * 
         */
        id: number;
        name: string;
        moodle_url: string;
    }
    /**
     * Model of Tutor data
     */
    export class Tutor {
        /**
         * 
         */
        public id: number = 0;
        public name: string = "";
        public moodle_url: string = "";

        /**
         * 
         */
        constructor(object = { id: 0, name: "", moodle_url: "" }) {
            this.setId((object.id == null) ? 0 : object.id);
            this.setName((object.name == null) ? "" : object.name);
            this.setMoodleUrl((object.moodle_url == null) ? "" : object.moodle_url);
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
        /**
         * 
         */
        public getMoodleUrl(): string {
            return this.moodle_url;
        }
        /**
         * 
         */
        public setMoodleUrl(moodleUrl: string): void {
            this.moodle_url = moodleUrl;

        }
    }
}