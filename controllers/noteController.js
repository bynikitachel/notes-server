const {Note} = require('../models/models')
const ApiError = require('../errors/ApiError')

class NoteController {
    async create(req, res) {
        try {
            const {name, text = 'default text', categoryId} = req.body
            const note = await Note.create({name, text, categoryId})

            return res.json(note)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async edit(req, res) {
        try {
            const {name, text, id} = req.body
            const note = await Note.update({name, text}, {where: {id}})
            return res.json(note)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        try {
            const {categoryId} = req.query
            let notes
            if (categoryId) {
                notes = await Note.findAll({where: {categoryId}})
            } else {
                notes = await Note.findAll()
            }
            return res.json(notes)
        } catch (e) {
            console.log('error')
        }
    }

    async deleteOne(req, res) {
        try {
            const {id} = req.query
            await Note.destroy({where: {id}})
            res.status(200).send()
        } catch (err) {
            console.log('error')
        }

    }

    async getOne(req, res) {

    }
}

module.exports = new NoteController()
