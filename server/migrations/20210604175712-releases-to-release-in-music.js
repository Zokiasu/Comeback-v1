/*'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // music belongsTo release
    /* return queryInterface
      .addColumn(
        'music', // name of Source model
        'releaseId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'releases', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
      )
      .then(() => {
        // Release hasMany Music
        return queryInterface.addColumn(
          'music', // name of Target model
          'releaseId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'music', // name of Source model
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        );
      });*/
  },

  down: async (queryInterface, Sequelize) => {
    /*return queryInterface.dropTable('Music_Release'),*/
  },
};*/
