const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogames', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    parent_platforms: {
      type: DataTypes.ARRAY(Sequelize.STRING),
     allowNull: false 
    },
    released: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.DECIMAL
    },
    background_image: {
      type: DataTypes.STRING,
      defaultValue: "https://www.dafont.com/forum/attach/orig/9/9/997801.gif"
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
};

