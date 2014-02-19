module Cash {


    /**
     * Model of Timetable param data
     */
    export interface ParamsInterface {
        group_id: number[];
        tutor_id: number[];
        place_id: number[];
    }
    /**
         * 
         */

    export class Params {
        group_id: number[] = [];
        tutor_id: number[] = [];
        place_id: number[] = [];
    }
}