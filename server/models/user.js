'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avator: {
      allowNull: true,
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    defaultScope: {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }
    }
  });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Comment, {
      foreignKey: 'u_id'
    });
  };
  return User;
};
