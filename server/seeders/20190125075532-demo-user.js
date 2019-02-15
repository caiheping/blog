'use strict';

const md5 = require('md5');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      username: 'John Doe',
      password: md5('123456'),
      avator: 'http://localhost:8888/static/img/avater.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'cai',
      password: md5('123456'),
      avator: 'http://localhost:8888/static/img/avater.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}).then(data => {
      return queryInterface.bulkInsert('Comments', [{
        u_id: 2,
        s_id: 1,
        content: 'good',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
    }).then(data => {
      return queryInterface.bulkInsert('Says', [{
        u_id: 1,
        content: '牛逼',
        commentNumber: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
    }, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {}).then(data => {
      queryInterface.bulkDelete('Comments', null, {})
    }).then(data => {
      queryInterface.bulkDelete('Says', null, {})
    });
  }
};
