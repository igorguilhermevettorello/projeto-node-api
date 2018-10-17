const model = require("../models/");

module.exports = function(app) {

  app.get("/modalidades", (req, res) => {
    let id = req.params.id;
    model.modalidades.findAll()
      .then(modalidades => {
        modalidades = modalidades.map(modalidade => modalidade.dataValues);
        res.status(200).json({ modalidades:modalidades });
      })
      .catch(error => {
        res.status(404).json({ modalidades:null });
      });
  });

  app.get("/modalidades/:id", (req, res) => {
    let id = req.params.id;
    model.modalidades.findById(id)
      .then(modalidade => {
        if (modalidade == null)
          res.status(404).json({ modalidade:modalidade });
        else
          res.status(200).json({ modalidade:modalidade.dataValues });
      })
      .catch(error => {
        res.status(404).json({ modalidade:null });
      });
  });

  app.post("/modalidades", (req, res) => {
    let modalidade = req.body;
    modalidade.createAt = new Date();
    modalidade.updateAt = new Date();

    let error = [];
    if ((typeof(modalidade.descricao) === "undefined") || (modalidade.descricao.trim() === "")) {
      error.push({campo:"descricao", mensagem:"Campo descrição é obrigatório."});
    }

    if (error.length > 0) {
      res.status(400).json({ error:error });
    } else {
      model
        .modalidades
        .create(modalidade)
        .then(_modalidade => {
          res.status(201).json({ modalidade:_modalidade.dataValues });
        })
        .catch(error => {
          res.status(400).json({ error:null });
        });
    }
  });

  app.put("/modalidades/:id", (req, res) => {
    let modalidade = req.body;
    modalidade.updateAt = new Date();

    model
      .modalidades
      .update(modalidade, {where: {id: req.params.id} })
      .then(_modalidade => {
         model.modalidades.findById(req.params.id)
          .then(_modalidade => {
            if (_modalidade == null)
              res.status(404).json({ modalidade:_modalidade });
            else
              res.status(200).json({ modalidade:_modalidade.dataValues });
          })
          .catch(error => {
            res.status(404).json({ modalidade:null });
          });
      })
      .catch(error => {
        res.status(400).json({ modalidade:null });
      });
  });

  app.delete("/modalidades/:id", (req, res) => {
    model
      .modalidades
      .destroy({where: { id: req.params.id }})
      .then(rowDeleted => {
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
