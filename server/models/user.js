
export default (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: { 
        type: DataTypes.STRING,
         allowNull: false,
         validate:
            { 
                isEmail: true,
                notEmpty: true,
            } 
    },
    username: { 
          type: DataTypes.STRING,
          allowNull: false,
          validate:
            { 
                notEmpty: true,
                len: [3,30] 
            } 
      },
    password: { 
        type: DataTypes.STRING,
         allowNull: false,
         validate:{ 
                  notEmpty: true,
                  len: [8,40] 
                } 
         },
    membership: { 
        type: DataTypes.STRING,
          allowNull: false,
          validate:
            { 
                notEmpty: true,
                len: [3,30] 
            } 
     },
  }, {
    classMethods: {
        associate: (models) => { // eslint-disable-line
        // associations can be defined here
      }
    }
  });
  return user;
};
