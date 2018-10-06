const model = require("../models/");

module.exports = function(app) {

  app.get("/usuarios", (req, res) => {
    let id = req.params.id;
    model.usuarios.findAll()
      .then(usuarios => {
        usuarios = usuarios.map(usuario => usuario.dataValues);
        res.status(200).json({ usuarios });
      })
      .catch(error => {
        res.status(404).json({ usuario: null });
      });
  });

  app.get("/usuarios/:id", (req, res) => {
    let id = req.params.id;
    model.usuarios.findById(id)
      .then(usuario => {
        if (usuario == null)
          res.status(404).json({ usuario: usuario });
        else
          res.status(200).json({ usuario: usuario.dataValues });
      })
      .catch(error => {
        res.status(404).json({ usuario: null });
      });
  });

  app.post("/usuarios", (req, res) => {
    let usuario = req.body;
    usuario.createAt = new Date();
    usuario.updateAt = new Date();

    model.usuarios.create(usuario)
      .then(_usuario => {
        res.status(201).json({ usuario: _usuario.dataValues });
      })
      .catch(error => {
        res.status(400).json({ usuario: null });
      });
  });

  app.put("/usuarios/:id", (req, res) => {
    let usuario = req.body;
    usuario.updateAt = new Date();

    model.usuarios.update(usuario, {where: {id: req.params.id} })
      .then(_usuario => {
         model.usuarios.findById(req.params.id)
          .then(usuario => {
            if (usuario == null)
              res.status(404).json({ usuario: usuario });
            else
              res.status(200).json({ usuario: usuario.dataValues });
          })
          .catch(error => {
            res.status(404).json({ usuario: null });
          });
      })
      .catch(error => {
        res.status(400).json({ usuario: null });
      });
  });

  app.delete("/usuarios/:id", (req, res) => {
    model
      .usuarios
      .destroy({where: { id: req.params.id }})
      .then(rowDeleted => {
        console.log("rowDeleted", rowDeleted);
        if (rowDeleted === 1) {
          res.status(204).json(null);
        } else {
          res.status(404).json(null);
        }
      })
      .catch(error => {
        console.log("error", error);
        res.status(404).json(null);
      });
  });
};
