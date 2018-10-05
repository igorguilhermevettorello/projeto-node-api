const model = require("../models/");

module.exports = function(app) {
  app.delete("/usuarios/:id", (req, res) => {
    let id = req.params.id;
    model.Usuarios.findById(id)
      .then(usuario => {
        res.status(200).json({ usuario: usuario.dataValues });
      })
      .catch(error => {
        console.log("error", error);
        res.status(404);
      });
  });

  app.post("/usuarios", (req, res) => {
    let usuario = req.body;
    console.log("__teste", usuario);
    model.Usuarios.create({
      Login: "igor",
      Password: null,
      Email: "igor.vettorello@hotmail.com",
      CreateAt: new Date(),
      UpdateAt: new Date()
    })
      .then(_usuario => {
        console.log(_usuario.dataValues);
        res.status(201).json({ usuario: _usuario.dataValues });
      })
      .catch(error => {
        res.status(400).json({ usuario: _usuario.dataValues });
      });
  });

  app.put("/usuarios/:id", (req, res) => {
    var dados = req.body;
    res.status(200).json();
  });

  app.get("/usuarios/:id", (req, res) => {
    let id = req.params.id;
    model.Usuarios.destroy({
      where: { Id: id }
    })
      .then(rowDeleted => {
        // rowDeleted will return number of rows deleted
        console.log("rowDeleted", rowDeleted);
        if (rowDeleted === 1) {
          console.log("Deleted successfully");
          res.status(204).json();
        } else {
          res.status(404);
        }
      })
      .catch(error => {
        console.log("error", error);
        res.status(404);
      });
  });
};
