const { Router } = require('express')
const router = Router()

const { renderNoteForm,
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote } = require('../controllers/notes.controllers');

    const {isAuthenticated} = require('../helpers/auth')

//new note
router.get('/notes/add', isAuthenticated, renderNoteForm);

router.post('/notes/add', isAuthenticated,createNewNote);

//get all note
router.get('/notes',isAuthenticated, renderNotes)

//Edit notes
router.get('/notes/edit/:id',isAuthenticated, renderEditForm)

router.put('/notes/edit/:id',isAuthenticated, updateNote)

//delete notes
router.delete('/notes/delete/:id',isAuthenticated, deleteNote)

module.exports = router