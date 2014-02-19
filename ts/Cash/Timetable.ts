/// <reference path="Activity.ts" />
/// <reference path="Params.ts" />
module Cash {
    /**
     * 
     */
    export interface TimetableInterface {
        _id: string;
        access_url: string;
        params: Cash.Params;
        activities: Cash.ActivityInterface[];
    }


    export class TimetableStatistics {
        private couter: string[] = [];


    }

    export class Timetable {
        public _id: string = "";
        public access_url: string = "";
        public params: Cash.Params = new Cash.Params();
        public activities: Cash.Activity[] = [];



        constructor(object: Cash.TimetableInterface = { _id: "", access_url: "", params: new Cash.Params(), activities: [] }) {
            this.setId(object._id);
            this.setAccessUrl(object.access_url);
            this.setParams(object.params);
            this.setActivities(object.activities);

        }




        /**
        * 
        */
        public getId(): string {
            return this._id;
        }

        /**
         * 
         */
        private setId(id: string): void {
            this._id = id;
        }
        public getAccessUrl(): string {
            return this.access_url;
        }
        private setAccessUrl(access_url: string): void {
            this.access_url = access_url;
        }

        public getParams(): Cash.Params {
            return this.params;
        }
        private setParams(params: Cash.Params) {
            this.params = params;
        }
        public getActivities(): Cash.Activity[] {
            return this.activities;
        }

        private setActivities(activities: Cash.ActivityInterface[]): void {
            if (activities.length > 0) {
                for (var i = 0; i < activities.length; i++) {


                    this.activities[this.getActivities().length] = new Cash.Activity(activities[i]);
                }
                this.activities = this.getActivities().sort((a: any, b: any) => {return a.getStartsAtTimestamp() - b.getStartsAtTimestamp() });
            }
        }


    }
}