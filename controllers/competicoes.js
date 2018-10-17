const model = require("../models/");

module.exports = function(app) {

  let validarFormulario = competicao => {
    let error = [];
    if ((typeof(competicao.descricao) === "undefined") || (competicao.descricao.trim() === "")) {
      error.push({campo:"descricao", mensagem:"Campo descrição é obrigatório."});
    }

    if ((typeof(competicao.modalidadeId) === "undefined")
      || (isNaN(parseInt(competicao.modalidadeId)))
      || (parseInt(competicao.modalidadeId) <= 0)) {
      error.push({campo:"modalidade", mensagem:"Campo modalidade é obrigatório."});
    }

    return error;
  }


  app.get("/competicoes", (req, res) => {
    let id = req.params.id;
    model.competicoes.findAll()
      .then(competicoes => {
        competicoes = competicoes.map(competicao => competicao.dataValues);
        res.status(200).json({ competicoes:competicoes });
      })
      .catch(error => {
        res.status(404).json({ competicoes:null });
      });
  });

  app.get("/competicoes/:id", (req, res) => {
    let id = req.params.id;
    model
      .competicoes
      .findById(id)
      .then(competicao => {
        if (competicao == null)
          res.status(404).json({ competicao:competicao });
        else
          res.status(200).json({ competicao:competicao.dataValues });
      })
      .catch(error => {
        res.status(404).json({ competicao:null });
      });
  });

  app.post("/competicoes", (req, res) => {
    let competicao = req.body;
    competicao.createAt = new Date();
    competicao.updateAt = new Date();

    let error = validarFormulario(competicao);

    if (error.length > 0) {
      res.status(400).json({ error:error });
    } else {
      model
        .competicoes
        .create(competicao)
        .then(_competicao => {
          res.status(201).json({ competicao:_competicao.dataValues });
        })
        .catch(error => {
          res.status(400).json({ error:null });
        });
    }
  });

  app.put("/competicoes/:id", (req, res) => {
    let competicao = req.body;
    competicao.updateAt = new Date();

    let error = validarFormulario(competicao);

    if (error.length > 0) {
      res.status(400).json({ error:error });
    } else {
      model
        .competicoes
        .update(competicao, {where: {id: req.params.id} })
        .then(_competicao => {
          model
            .competicoes
            .findById(req.params.id)
            .then(_competicao => {
              if (_competicao == null)
                res.status(404).json({ competicao:_competicao });
              else
                res.status(200).json({ competicao:_competicao.dataValues });
            })
            .catch(error => {
              res.status(404).json({ competicao:null });
            });
        })
        .catch(error => {
          res.status(400).json({ competicao:null });
        });
    }
  });

  app.delete("/competicoes/:id", (req, res) => {
    model
      .competicoes
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
