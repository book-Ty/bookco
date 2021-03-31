module.exports = (app, db) => {

    const entities = require('./book.flo.js');
    const clave = 'RGl2ZXJzaWZ5aW5nIHRoZSBJbnRhbmdpYmlsaXR5IG9mIEhvcml6b25z';

    app.post('/' + clave, function(req, res, next) {

      //res.send(req.body);
      db.collection("entities").save(req.body, function(err, doc) {
        if(err) return next(err);
        res.send(doc);
      });
    });
    app.get('/' + clave, function(req, res, next) {
        db.collection("entities").find({}, function(err, docs) {
          if(err) return next(err);
          docs.each(function(err, doc) {
            if(doc) {
              console.log(doc._id.valueOf());
            }
            else {
              res.end();
            }
          });
        });
    });
    app.get('/' + clave + '/:entityId', entities.findOne);
    app.get('/' + clave + '/between', entities.getBetween);
    app.get('/' + clave + '/:keyId/:valId', entities.getByKeyValPair);
    app.put('/' + clave + '/date', entities.updateByDate);
    app.put('/' + clave + '/:entityId', entities.update);
    app.delete('/' + clave + '/:entityId', entities.delete);


}
