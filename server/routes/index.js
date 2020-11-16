const todosController = require('../controllers').employee;
const todosDepartment = require('../controllers').department;
const login = require('../controllers').login;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/todos', todosController.create);
  app.get('/api/todos', todosController.list);
  app.get('/api/todos/:Id', todosController.retrieve);
  app.put('/api/todos/:Id', todosController.update);
  app.delete('/api/todos/:Id', todosController.destroy);

  app.get('/api/department', todosDepartment.list);
  app.get('/api/department/:Id', todosDepartment.retrieve);

  app.get('/api/login/:password', login.passwordCheck);

  app.all('/api/todos/:todoId/items', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));
};
