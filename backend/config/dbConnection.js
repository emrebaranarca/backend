const Sequelize=require('sequelize')

const dbConnection=new Sequelize(
  'demo','root','yourpasswD1!',{
    host:'localhost',
    dialect:'mysql'
  }
)

module.exports=dbConnection;