const Employee = require("../models").Employee;
const Department = require("../models").Department;

module.exports = {
  create(req, res) {
    return Employee.create({
      fio: req.body.fio,
      departmentId: req.body.departmentId,
      position: req.body.position,
      phone: req.body.phone,
      additionalPhone: req.body.additionalPhone,
      email: req.body.email,
      note: req.body.note,
      img: req.body.img,
    })
      .then((data) => res.status(201).send(data))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return Employee.findAll({
      where: {},
      order: [["fio", "ASC"]],
      include: [Department],
    })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Employee.findByPk(req.params.Id)
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: "Employee Not Found",
          });
        }
        return res.status(200).send(data);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Employee.findByPk(req.params.Id)
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: "Employee Not Found",
          });
        }
        return data
          .update({
            fio: req.body.fio,
            departmentId: req.body.departmentId,
            position: req.body.position,
            phone: req.body.phone,
            additionalPhone: req.body.additionalPhone,
            email: req.body.email,
            note: req.body.note,
            img: req.body.img,
            include: [Department],
          })
          .then(() => res.status(200).send(data))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Employee.findByPk(req.params.Id)
      .then((data) => {
        if (!data) {
          return res.status(400).send({
            message: "Employee Not Found",
          });
        }
        return data
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
