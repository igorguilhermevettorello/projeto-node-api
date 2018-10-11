const model = require("../models/");

module.exports = function(app) {

  app.get("/jogos", (req, res) => {
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

  app.get("/jogos/:id", (req, res) => {
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

  app.post("/jogos", (req, res) => {
    let jogo = req.body;
    jogo.createAt = new Date();
    jogo.updateAt = new Date();

    let error = [];
    if ((typeof(jogo.modalidade) === "undefined") || (autor.modalidade.trim() === "")) {
      error.push({campo:"modalidade", mensagem:"Campo modalidade é obrigatório."});
    }

    if ((typeof(autor.campeonato) === "undefined") || (autor.campeonato.trim() === "")) {
      error.push({campo:"campeonato", mensagem:"Campo campeonato é obrigatório."});
    }

    if ((typeof(autor.rodada) === "undefined") || (autor.rodada.trim() === "")) {
      error.push({campo:"rodada", mensagem:"Campo rodada é obrigatório."});
    }

    if ((typeof(autor.datahora) === "undefined") || (autor.datahora.trim() === "")) {
      error.push({campo:"datahora", mensagem:"Campo data é obrigatório."});
    }

    if ((typeof(autor.partida) === "undefined") || (autor.partida.trim() === "")) {
      error.push({campo:"partida", mensagem:"Campo partida é obrigatório."});
    }

    if ((typeof(autor.casa) === "undefined") || (autor.casa.trim() === "")) {
      error.push({campo:"casa", mensagem:"Campo time da casa é obrigatório."});
    }

    if ((typeof(autor.visitante) === "undefined") || (autor.visitante.trim() === "")) {
      error.push({campo:"visitante", mensagem:"Campo time visitante é obrigatório."});
    }

    if (error.length > 0) {
      res.status(400).json({ error: error });
    } else {
      model
        .jogos
        .create(jogo)
        .then(_jogo => {
          res.status(201).json({ jogo: _jogo.dataValues });
        })
        .catch(error => {
          res.status(400).json({ error: null });
        });
    }
  });

  app.put("/jogos/:id", (req, res) => {
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

  app.delete("/jogos/:id", (req, res) => {
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
