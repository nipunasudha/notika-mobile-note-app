(function () {
    app = angular.module('mynotes.notestore', ['ionic'])





    app.factory('NoteStore', function () {
        var notes = angular.fromJson(window.localStorage['notes'] == undefined ? "[]" : window.localStorage['notes'])

        function persist() {
            window.localStorage['notes'] = angular.toJson(notes)
        }


        return {
            list: function () {
                return notes
            },
            get: function (id) {
                for (i = 0; i < notes.length; i++) {

                    if (notes[i].id == id) {
                        return notes[i]
                    }
                }
                return "No match"
            },
            update: function (edited) {
                for (i = 0; i < notes.length; i++) {

                    if (notes[i].id == edited.id) {
                        notes[i] = edited
                        console.log("Saved!")
                        persist()
                    }
                }
                return "No match"
            },
            add: function (note) {
                notes.push(note)
                persist()
            },
            delete_note: function (id) {
                for (i = 0; i < notes.length; i++) {

                    if (notes[i].id == id) {
                        var index = notes.indexOf(notes[i]);
                        notes.splice(index, 1);
                        persist()
                    }
                }
                return "No match"
            }
        }

    })

} ())













