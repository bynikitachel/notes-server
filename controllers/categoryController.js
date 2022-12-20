const { Category } = require('../models/models')

class CategoryController
{
  async create(req, res)
  {
    try {
      const { name, icon } = req.body
      const category = await Category.create({ name, icon })
      return res.json(category)
    } catch (err) {
      console.log('ERROR CREATE :::', err)
    }
  }

  async getAll(req, res)
  {
    console.log('111')
    const categories = await Category.findAll()
    return res.json(categories)
  }

  async deleteOne(req, res)
  {
    try {
      console.log('req :::', req)
      const { id } = req.query
      await Category.destroy({ where: { id } })
      res.status(200).send()
    } catch (err) {
      console.log('zalupa')
    }

  }
}

module.exports = new CategoryController()
