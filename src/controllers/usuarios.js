const model = require("../models/");

module.exports = function(app) {
  app.get("/usuarios/:id", (req, res) => {
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
    usuario.CreateAt = new Date();
    usuario.UpdateAt = new Date();
    console.log("usuario", usuario);

    model.Usuarios.create(usuario)
      .then(_usuario => {
        console.log(_usuario.dataValues);
        res.status(201).json({ usuario: _usuario.dataValues });
      })
      .catch(error => {
        res.status(400);
      });
  });

  app.put("/usuarios/:id", (req, res) => {
    let usuario = req.body;
    usuario.Id = req.params.id;
    usuario.UpdateAt = new Date();
    console.log("usuario", usuario);

    model.Usuarios.create(usuario)
      .then(_usuario => {
        console.log(_usuario.dataValues);
        res.status(202).json({ usuario: _usuario.dataValues });
      })
      .catch(error => {
        res.status(400);
      });
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
