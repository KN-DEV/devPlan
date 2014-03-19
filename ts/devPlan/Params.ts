module devPlan {
    /**
     * 
     */
    export class Params {
        /**
         * Group id collection
         */
        private group_id: number[] = [];
        /**
         * Tutor id collection
         */
        private tutor_id: number[] = [];
        /**
         * Place id collection
         */
        private place_id: number[] = [];
        /**
         * 
         */
        constructor(groups: number[]= [], tutors: number[]= [], places: number[]= []) {
            this.setGroups(groups != null ? groups : []);
            this.setTutors(tutors != null ? tutors : []);
            this.setPlaces(places != null ? places : []);
        }
        /**
         * 
         */
        public getGroups = (): number[]=> {
            return this.group_id;
        }
        /**
         * 
         */
        public setGroups(groups: number[]= []): devPlan.Params {
            this.group_id = groups.sort((a, b) => {return a - b });
            return this;
        }
        /**
         * 
         */
        public checkIfGroupIdExists(id: number): boolean {
            var check: boolean = false;
            for (var i = 0; i < this.getGroups().length; i++) {
                if (this.getGroups()[i] == id) {
                    check = true;
                }
            }
            return check;
        }
        /**
         * 
         */
        public addGroup(id: number): devPlan.Params {
            if (!this.checkIfGroupIdExists(id)) {
                this.getGroups().push(id);
                this.setGroups(this.getGroups().sort((a, b) => {return a - b }));
            }
            return this;
        }
        /**
         * 
         */
        public removeGroup(id: number): devPlan.Params {

            for (var i = 0; i < this.getGroups().length; i++) {
                if (this.getGroups()[i] == id) {
                    this.getGroups().splice(i, 1);
                }
            }
            return this;
        }
        /**
         * 
         */
        public getTutors(): number[] {
            return this.tutor_id;
        }
        /**
         * 
         */
        public setTutors(tutors: number[]= []): devPlan.Params {
            this.tutor_id = tutors.sort((a, b) => {return a - b });
            return this;
        }
        /**
         * 
         */
        public checkIfTutorIdExists(id: number): boolean {
            var check: boolean = false;
            for (var i = 0; i < this.getTutors().length; i++) {
                if (this.getTutors()[i] == id) {
                    check = true;
                }
            }
            return check;
        }
        /**
         * 
         */
        public addTutor(id: number): devPlan.Params {
            if (!this.checkIfTutorIdExists(id)) {
                this.getTutors().push(id);
                this.setTutors(this.getTutors().sort((a, b) => {return a - b }));
            }
            return this;
        }
        /**
         * 
         */
        public removeTutor(id: number): devPlan.Params {


            for (var i = 0; i < this.getTutors().length; i++) {
                if (this.getTutors()[i] == id) {
                    this.getTutors().splice(i, 1);
                }
            }
            return this;
        }
        /**
         * 
         */
        public getPlaces(): number[] {
            return this.place_id;
        }
        /**
         * 
         */
        public setPlaces(places: number[]= []): devPlan.Params {
            this.place_id = places.sort((a, b) => {return a - b });
            return this;
        }
        /**
         * 
         */
        public checkIfPlaceIdExists(id: number): boolean {
            var check: boolean = false;
            for (var i = 0; i < this.getPlaces().length; i++) {
                if (this.getPlaces()[i] == id) {
                    check = true;
                }
            }
            return check;
        }
        /**
         * 
         */
        public addPlace(id: number): devPlan.Params {
            if (!this.checkIfPlaceIdExists(id)) {
                this.getPlaces().push(id);
                this.setPlaces(this.getPlaces().sort((a, b) => {return a - b }));
            }
            return this;
        }
        /**
         * 
         */
        public removePlace(id: number): devPlan.Params {
            for (var i = 0; i < this.getPlaces().length; i++) {
                if (this.getPlaces()[i] == id) {
                    this.getPlaces().splice(i, 1);
                }
            }
            return this;
        }

        /**
         * @since 0.8
         */
        public isEmpty() {
            return (this.getGroups().length == 0) && (this.getTutors().length == 0) && (this.getPlaces().length == 0);
        }

        /**
         * Checks if object contains only one element in tutor_id and nothing else
         * @since 0.8
         */
        public haveOnlyOneTutor(): boolean {
            return (this.getGroups().length == 0 && this.getTutors().length == 1 && this.getPlaces().length == 0);
        }
        
        /**
         * Checks if object contains only one element in tutor_id and nothing else
         * @since 0.8
         */
        public haveOnlyOneGroup(): boolean {
            return (this.getGroups().length == 1 && this.getTutors().length == 0 && this.getPlaces().length == 0);
        }
        /**
         * 
         */
        public toString() {
            var data: string = "";
            for (var i = 0; i < this.getGroups().length; i++) {
                data = data + 'g' + this.getGroups()[i];
            }
            for (var i = 0; i < this.getTutors().length; i++) {
                data = data + 't' + this.getTutors()[i];
            }
            for (var i = 0; i < this.getPlaces().length; i++) {
                data = data + 'p' + this.getPlaces()[i];
            }
            return data;
        }
        /**
         * Creates new devPlan.Params object from given query
         */
        public static fromString(str: string = ""): devPlan.Params {
            var params = new devPlan.Params();
            var paramsArray: string[] = str.match(/[gtp][0-9]*/gi);

            if (paramsArray != null) {
                for (var i = 0; i < paramsArray.length; i++) {
                    if (paramsArray[i].toString().toLowerCase().indexOf("g") != -1) {
                        params.addGroup(parseInt(paramsArray[i].slice(1).toString()));
                    }
                    if (paramsArray[i].toString().toLowerCase().indexOf("t") != -1) {
                        params.addTutor(parseInt(paramsArray[i].slice(1).toString()));
                    }
                    if (paramsArray[i].toString().toLowerCase().indexOf("p") != -1) {
                        params.addPlace(parseInt(paramsArray[i].slice(1).toString()));
                    }
                }
            }
            return params;
        }
    }
}