/// <reference path="./Params.d.ts" />
/// <reference path="./Activity.d.ts" />
/**
 * 
 */
declare module Cash {
    /**
     * 
     */
    export interface TimetableRegisteredInterface {

        /**
         *
         */
        _id: string;
        /**
         *
         */
        access_url: string;
        /**
         *
         */
        params: Cash.ParamsInterface;
    }
    /**
     * 
     */
    export interface TimetableInterface {


        /**
       * Timetable id
       * @since 0.8
       */
        _id: string;

        /**
         * Timetable params
         * @since 0.8
         */
        params: Cash.ParamsInterface;

        /**
         * Timetable activities
         * @since 0.8
         */
        activities: Cash.ActivityInterface[];

        /**
         * Timetable resources version
         * @since 0.8
         */
        versions: {};

    }
    /**
     * 
     */
    export interface TimetableVersionInterface {
        /**
         * 
         */
        _id: string;
        /**
         * 
         */
        versions: Object;
    }
}