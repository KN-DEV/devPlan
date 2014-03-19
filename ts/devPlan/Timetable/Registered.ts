/// <reference path="../Params.ts" />
module devPlan {
    /**
     * Class represents response from Cash service when timetable was properly registered
     * @version 0.8
     */
    export class TimetableRegistered {
        /**
         * Timetable id
         * @since 0.8
         */
        private _id: string = "";

        /**
         * Timetable access url
         * @since 0.8
         */
        private access_url: string = "";

        /**
         * Timetable params
         * @since 0.8
         */
        private params: Params = new devPlan.Params();

        /**
         * @since 0.8
         */
        constructor(object = { _id: "", access_url: "", params: new devPlan.Params() }) {
            this.setId(object._id);
            this.setAccessUrl(object.access_url);
            this.setParams(object.params);
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
        private setId(id: string): devPlan.TimetableRegistered {
            this._id = id;
            return this;
        }

        /**
         * Returns timetable access url
         * @since 0.8
         */
        public getAccessUrl(): string {
            return this.access_url;
        }

        /**
         * Sets timetable access url
         * @since 0.8
         */
        private setAccessUrl(access_url: string): devPlan.TimetableRegistered {
            this.access_url = access_url;
            return this;
        }

        /**
         * Returns timetable params
         * @since 0.8
         */
        public getParams(): devPlan.Params {
            return this.params;
        }

        /**
         * Sets timetable params
         * @since 0.8
         */
        private setParams(params: devPlan.Params): devPlan.TimetableRegistered {
            this.params = params;
            return this;
        }
    }
}