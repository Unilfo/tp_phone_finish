const Department = require('../models').Department;


module.exports = {

  retrieve(req, res) {
    return Department
      .findByPk(req.params.Id)
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: 'Department Not Found',
          });
        }
        return res.status(200).send(data);
      })
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return Department
      .findAll()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => res.status(400).send(error));
  },
};
