var devPlan;
(function (devPlan) {
    var Params = (function () {
        function Params(groups, tutors, places) {
            if (typeof groups === "undefined") { groups = []; }
            if (typeof tutors === "undefined") { tutors = []; }
            if (typeof places === "undefined") { places = []; }
            var _this = this;
            this.group_id = [];
            this.tutor_id = [];
            this.place_id = [];
            this.getGroups = function () {
                return _this.group_id;
            };
            this.setGroups(groups != null ? groups : []);
            this.setTutors(tutors != null ? tutors : []);
            this.setPlaces(places != null ? places : []);
        }
        Params.prototype.setGroups = function (groups) {
            if (typeof groups === "undefined") { groups = []; }
            this.group_id = groups.sort(function (a, b) {
                return a - b;
            });
            return this;
        };

        Params.prototype.checkIfGroupIdExists = function (id) {
            var check = false;
            for (var i = 0; i < this.getGroups().length; i++) {
                if (this.getGroups()[i] == id) {
                    check = true;
                }
            }
            return check;
        };

        Params.prototype.addGroup = function (id) {
            if (!this.checkIfGroupIdExists(id)) {
                this.getGroups().push(id);
                this.setGroups(this.getGroups().sort(function (a, b) {
                    return a - b;
                }));
            }
            return this;
        };

        Params.prototype.removeGroup = function (id) {
            for (var i = 0; i < this.getGroups().length; i++) {
                if (this.getGroups()[i] == id) {
                    this.getGroups().splice(i, 1);
                }
            }
            return this;
        };

        Params.prototype.getTutors = function () {
            return this.tutor_id;
        };

        Params.prototype.setTutors = function (tutors) {
            if (typeof tutors === "undefined") { tutors = []; }
            this.tutor_id = tutors.sort(function (a, b) {
                return a - b;
            });
            return this;
        };

        Params.prototype.checkIfTutorIdExists = function (id) {
            var check = false;
            for (var i = 0; i < this.getTutors().length; i++) {
                if (this.getTutors()[i] == id) {
                    check = true;
                }
            }
            return check;
        };

        Params.prototype.addTutor = function (id) {
            if (!this.checkIfTutorIdExists(id)) {
                this.getTutors().push(id);
                this.setTutors(this.getTutors().sort(function (a, b) {
                    return a - b;
                }));
            }
            return this;
        };

        Params.prototype.removeTutor = function (id) {
            for (var i = 0; i < this.getTutors().length; i++) {
                if (this.getTutors()[i] == id) {
                    this.getTutors().splice(i, 1);
                }
            }
            return this;
        };

        Params.prototype.getPlaces = function () {
            return this.place_id;
        };

        Params.prototype.setPlaces = function (places) {
            if (typeof places === "undefined") { places = []; }
            this.place_id = places.sort(function (a, b) {
                return a - b;
            });
            return this;
        };

        Params.prototype.checkIfPlaceIdExists = function (id) {
            var check = false;
            for (var i = 0; i < this.getPlaces().length; i++) {
                if (this.getPlaces()[i] == id) {
                    check = true;
                }
            }
            return check;
        };

        Params.prototype.addPlace = function (id) {
            if (!this.checkIfPlaceIdExists(id)) {
                this.getPlaces().push(id);
                this.setPlaces(this.getPlaces().sort(function (a, b) {
                    return a - b;
                }));
            }
            return this;
        };

        Params.prototype.removePlace = function (id) {
            for (var i = 0; i < this.getPlaces().length; i++) {
                if (this.getPlaces()[i] == id) {
                    this.getPlaces().splice(i, 1);
                }
            }
            return this;
        };

        Params.prototype.isEmpty = function () {
            return (this.getGroups().length == 0) && (this.getTutors().length == 0) && (this.getPlaces().length == 0);
        };

        Params.prototype.haveOnlyOneTutor = function () {
            return (this.getGroups().length == 0 && this.getTutors().length == 1 && this.getPlaces().length == 0);
        };

        Params.prototype.haveOnlyOneGroup = function () {
            return (this.getGroups().length == 1 && this.getTutors().length == 0 && this.getPlaces().length == 0);
        };

        Params.prototype.toString = function () {
            var data = "";
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
        };

        Params.fromString = function (str) {
            if (typeof str === "undefined") { str = ""; }
            var params = new devPlan.Params();
            var paramsArray = str.match(/[gtp][0-9]*/gi);

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
        };
        return Params;
    })();
    devPlan.Params = Params;
})(devPlan || (devPlan = {}));
//# sourceMappingURL=Params.js.map
