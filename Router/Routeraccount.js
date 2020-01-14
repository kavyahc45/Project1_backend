module.exports = function(app) {
    const todoList = require('../Controller/Controlleraccount');
     const isAuth=require('../Middleware/isAuth')
    
   
     app.route('/Account')
    .get(todoList.get_a_data)
    .post(todoList.signup);

    app.route('/Signin')
    .get(todoList.userSignin,isAuth);
    
    

    app.route('/Singup/:SingupId')
    .get(todoList.read_a_task1)
    .put(todoList.update_a_task1)
    .delete(todoList.delete_a_task1);
    };