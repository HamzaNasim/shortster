'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class urltable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  urltable.init({
    longUrl: DataTypes.TEXT,
    shortUrl: DataTypes.STRING,
    shortCode: DataTypes.STRING,
    click: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'urltable',
  });
  return urltable;
};