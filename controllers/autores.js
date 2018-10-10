const model = require("../models/");

module.exports = function(app) {

  app.get("/autores", (req, res) => {
    let id = req.params.id;
    model.autores.findAll()
      .then(autores => {
        autores = autores.map(autor => autor.dataValues);
        res.status(200).json({ autores });
      })
      .catch(error => {
        res.status(404).json({ autor: null });
      });
  });

  app.get("/autores/:id", (req, res) => {
    let id = req.params.id;
    model.autores.findById(id)
      .then(autor => {
        if (autor == null)
          res.status(404).json({ autor: autor });
        else
          res.status(200).json({ autor: autor.dataValues });
      })
      .catch(error => {
        res.status(404).json({ autor: null });
      });
  });

  app.post("/autores", (req, res) => {
    let autor = req.body;
    autor.createAt = new Date();
    autor.updateAt = new Date();

    let error = [];
    if ((typeof(autor.nome) === "undefined") || (autor.nome.trim() === "")) {
      error.push({campo:"nome", mensagem:"Campo nome é obrigatório."});
    }
    
    if ((typeof(autor.email) === "undefined") || (autor.email.trim() === "")) {
      error.push({campo:"email", mensagem:"Campo e-mail é obrigatório."});
    }
    
    if ((typeof(autor.password) === "undefined") || (autor.password.trim() === "")) {
      error.push({campo:"senha", mensagem:"Campo senha é obrigatório."});
    }
    
    if (error.length > 0) {
      res.status(400).json({ error: error });
    } else {
      model
        .autores
        .create(autor)
        .then(_autor => {
          res.status(201).json({ autor: _autor.dataValues });
        })
        .catch(error => {
          res.status(400).json({ error: null });
        });
    }
  });

  app.put("/autores/:id", (req, res) => {
    let autor = req.body;
    autor.updateAt = new Date();

    model.autores.update(autor, {where: {id: req.params.id} })
      .then(_autor => {
         model.autores.findById(req.params.id)
          .then(autor => {
            if (autor == null)
              res.status(404).json({ autor: autor });
            else
              res.status(200).json({ autor: autor.dataValues });
          })
          .catch(error => {
            res.status(404).json({ autor: null });
          });
      })
      .catch(error => {
        res.status(400).json({ autor: null });
      });
  });

  app.delete("/autores/:id", (req, res) => {
    model
      .autores
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
