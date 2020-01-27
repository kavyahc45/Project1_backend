module.exports = function(app) {
    const todoList = require('../Controller/Controller');
    const account = require('../Controller/Controlleraccount');
    // const price = require('../Controller/Controller');
     const isAuth=require('../Middleware/isAuth');
    
   
     app.route('/Signup')
    .get(todoList.get_a_data)
    .post(todoList.signup);

    // app.route('/Account')
    // .get(account.get_a_data_account)
    // .post(account.acount_signup);

    app.route('/Signin')
        .post(todoList.userSignin);
    app.route('/account')
        .post(account.accounts)
        .get(account.get_data)
    // app.route('/account/:id')
    //     .put(account.update_a_task)
    //     .delete(account.delete_a_task);
    app.route('/vinsurencedetiles')
        .post(todoList.price)
        .get(todoList.get_data)
    // app.route('/vehicle/:id')
    //     .put(todoList.update_a_task)
    //     .delete(todoList.delete_a_task);
    app.route('/cinsurencedetiles')
        .post(todoList.cropPrice)
        .get(todoList.get_cropdetailes)
    // app.route('/Singup/:SingupId')
    // .get(todoList.read_a_task)
    // .put(todoList.update_a_task)
    // .delete(todoList.delete_a_task);

    // app.route('/reset')
    // .put(todoList.changepassword)

    };
  