const model = require("../models/");

module.exports = function(app) {

  app.get("/times", (req, res) => {
    let id = req.params.id;
    model.times.findAll()
      .then(times => {
        times = times.map(time => time.dataValues);
        res.status(200).json({ times:times });
      })
      .catch(error => {
        res.status(404).json({ times:null });
      });
  });

  app.get("/times/:id", (req, res) => {
    let id = req.params.id;
    model.times.findById(id)
      .then(time => {
        if (time == null)
          res.status(404).json({ time:time });
        else
          res.status(200).json({ time:time.dataValues });
      })
      .catch(error => {
        res.status(404).json({ time:null });
      });
  });

  app.post("/times", (req, res) => {
    let time = req.body;
    time.createAt = new Date();
    time.updateAt = new Date();

    let error = [];
    if ((typeof(time.descricao) === "undefined") || (time.descricao.trim() === "")) {
      error.push({campo:"descricao", mensagem:"Campo descrição é obrigatório."});
    }

    if (error.length > 0) {
      res.status(400).json({ error:error });
    } else {
      model
        .times
        .create(time)
        .then(_time => {
          res.status(201).json({ time:_time.dataValues });
        })
        .catch(error => {
          res.status(400).json({ error:null });
        });
    }
  });

  app.put("/times/:id", (req, res) => {
    let time = req.body;
    time.updateAt = new Date();

    model
      .times
      .update(time, {where: {id: req.params.id} })
      .then(_time => {
         model.times.findById(req.params.id)
          .then(_time => {
            if (_time == null)
              res.status(404).json({ time:_time });
            else
              res.status(200).json({ time:_time.dataValues });
          })
          .catch(error => {
            res.status(404).json({ time:null });
          });
      })
      .catch(error => {
        res.status(400).json({ time:null });
      });
  });

  app.delete("/times/:id", (req, res) => {
    model
      .times
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
