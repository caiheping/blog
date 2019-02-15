'use strict';
let moment = require('moment')
module.exports = (sequelize, DataTypes) => {
  const Say = sequelize.define('Say', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: "Comment",
        key: 's_id'
      }
    },
    u_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: 'id'
      }
    },
    commentNumber: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    content: {
      type:DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue("createdAt")).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue("updatedAt")).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {});
  Say.associate = function(models) {
    // associations can be defined here
    Say.belongsTo(models.User, {
      foreignKey: 'u_id'
    });
    Say.hasMany(models.Comment, {
      foreignKey: 's_id'
    });
  };
  return Say;
};
