module devPlan {
    /**
     * Class represents response from Cash service when timetable check last version of resources
     * @version 0.8
     */
    export class TimetableVersion {

        /**
         * Timetable id
         * @since 0.8
         */
        private _id: string = "";

        /**
         * Timetable versions
         * @since 0.8
         */
        private versions: {} = {};

        /**
         * @since 0.8
         */
        constructor(_id: string= "", versions: {}= {}) {
            this.setId(_id);
            this.setVersions(versions);
        }

        /**
        * Returns timetable id
        * @since 0.8
        */
        public getId(): string {
            return this._id;
        }

        /**
         * Sets timetable id
         * @since 0.8
         */
        private setId(id: string = ""): devPlan.TimetableVersion {
            this._id = id;
            return this;
        }

        /**
         * Returns timetable version
         * @since 0.8
         */
        public getVersions(): Object {
            return this.versions;
        }

        /**
         * Sets timetable versions
         * @since 0.8
         */
        private setVersions(versions: Object = Object): devPlan.TimetableVersion {
            this.versions = versions;
            return this;
        }
    }
}