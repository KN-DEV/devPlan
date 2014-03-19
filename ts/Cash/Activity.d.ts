/// <reference path="./Group.d.ts" />
/// <reference path="./Tutor.d.ts" />
/// <reference path="./Place.d.ts" />
/**
 * 
 */
declare module Cash {
    /**
     * 
     */
    export interface ActivityInterface {
        /**
         *
         */
        category: string;
        /**
         *
         */
        date: string;
        /**
         *
         */
        day_of_week: string;
        /**
         *
         */
        ends_at: string;
        /**
         *
         */
        ends_at_timestamp: number;
        /**
         *
         */
        group: Cash.GroupInterface;
        /**
         *
         */
        id: number;
        /**
         *
         */
        name: string;
        /**
         *
         */
        notes: string;
        /**
         *
         */
        place: Cash.PlaceInterface;
        /**
         *
         */
        starts_at: string;
        /**
         *
         */
        starts_at_timestamp: number;
        /**
         *
         */
        state: number;
        /**
         *
         */
        tutor: Cash.TutorInterface;
        /**
        *
        */
        alarms: string[];
    }
}