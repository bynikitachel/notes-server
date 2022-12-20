const sequelize = require('../db')
const { DataTypes } = require('sequelize')


const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

const Note = sequelize.define('note', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  text: { type: DataTypes.STRING },
  done: { type: DataTypes.BOOLEAN },
})

const Category = sequelize.define('category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
  icon: { type: DataTypes.STRING },
})

User.hasMany(Note)
Note.belongsTo(User)

Category.hasMany(Note)
Note.belongsTo(Category)

module.exports = {
  User, Note, Category,
}
