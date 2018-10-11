const model = require("../models/");

module.exports = function(app) {

  app.get("/jogos", (req, res) => {
    let id = req.params.id;
    model.jogos.findAll()
      .then(jogos => {
        jogos = jogos.map(jogo => jogos.dataValues);
        res.status(200).json({ jogos });
      })
      .catch(error => {
        res.status(404).json({ jogos: null });
      });
  });

  app.get("/jogos/:id", (req, res) => {
    let id = req.params.id;
    model.jogos.findById(id)
      .then(jogo => {
        if (jogo == null)
          res.status(404).json({ jogo: jogo });
        else
          res.status(200).json({ jogo: jogo.dataValues });
      })
      .catch(error => {
        res.status(404).json({ jogo: null });
      });
  });

  app.post("/jogos", (req, res) => {
    let jogo = req.body;
    jogo.createAt = new Date();
    jogo.updateAt = new Date();
    console.log(jogo);
    console.log(typeof(jogo.datahora));
    
    let error = [];
    if ((typeof(jogo.modalidade) === "undefined") || (jogo.modalidade.trim() === "")) {
      error.push({campo:"modalidade", mensagem:"Campo Modalidade é obrigatório."});
    }

    if ((typeof(jogo.campeonato) === "undefined") || (jogo.campeonato.trim() === "")) {
      error.push({campo:"campeonato", mensagem:"Campo Campeonato é obrigatório."});
    }

    if ((typeof(jogo.rodada) === "undefined") || (jogo.rodada.trim() === "") || (isNaN(jogo.rodada)) || (parseInt(jogo.rodada) <= 0)) {
      error.push({campo:"rodada", mensagem:"Campo Rodada é obrigatório."});
    }

    if ((typeof(jogo.datahora) === "undefined") || (jogo.datahora.trim() === "")) {
      error.push({campo:"datahora", mensagem:"Campo Data / hora é obrigatório."});
    }

    if ((typeof(jogo.partida) === "undefined") || (jogo.partida.trim() === "") || (isNaN(jogo.partida)) || (parseInt(jogo.partida) <= 0)) {
      error.push({campo:"partida", mensagem:"Campo Partida é obrigatório."});
    }

    if ((typeof(jogo.casa) === "undefined") || (jogo.casa.trim() === "")) {
      error.push({campo:"casa", mensagem:"Campo Time da casa é obrigatório."});
    }

    if ((typeof(jogo.visitante) === "undefined") || (jogo.visitante.trim() === "")) {
      error.push({campo:"visitante", mensagem:"Campo Time visitante é obrigatório."});
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
