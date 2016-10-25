(function () {
    app = angular.module('mynotes.notestore', ['ionic'])





    app.factory('NoteStore', function ($ionicPopup) {
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
                        if (edited.title != "" && edited.description != "") {
                            notes[i] = edited
                            console.log("Saved!")
                            persist()
                            return true
                        }
                        else {
                            return false
                        }
                    }
                }
                return "No match"
            },
            add: function (note) {
                if (note.title != "" && note.description != "") {
                    notes.push(note)
                    persist()
                    return true
                } else {
                    return false
                }

            },
            delete_note: function (id) {
                for (i = 0; i < notes.length; i++) {

                    if (notes[i].id == id) {
                        var index = notes.indexOf(notes[i]);
                        notes.splice(index, 1);
                        persist()
                        return
                    }
                }
                return "No match"
            },
            move: function (note, fromIndex, toIndex) {
                notes.splice(fromIndex, 1);
                notes.splice(toIndex, 0, note);
                persist()

            },
            showAlert: function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Oops!',
                    template: 'Your note is incomplete.'
                });

                alertPopup.then(function (res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
            }
        }

    })

} ())













