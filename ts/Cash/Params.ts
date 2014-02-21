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

        toString() {
            var data: string = "";
            if (this.group_id != null) {
                for (var i = 0; i < this.group_id.length; i++) {
                    data = data + this.group_id[i];
                }
            }
            if (this.tutor_id != null) {
                for (var i = 0; i < this.tutor_id.length; i++) {
                    data = data + this.tutor_id[i];
                }
            }
            return data;
        }
    }
}