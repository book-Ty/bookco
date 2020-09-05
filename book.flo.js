/*::::
Routes for BookCo
::::*/

module.exports = (app, bookCo, dbConfig) => {

    // GET all
    app.get('/', (req, res, next) => {
      bookCo.readCollection(dbConfig.collection).toArray(function(err, docs) {
    		res.json(docs);
    	});
    });

    // GET by _id
    app.get('/:id', (req, res, next) => {
      var doc = {_id: req.params.id};
      bookCo.printDocument(dbConfig.collection, doc, function(err, docs) {
    		res.json(docs[0]);
    	});
    });

    // GET by { key: value } pair
    app.get('/:key/:value', (req, res, next) => {
      var doc = {};
      doc[req.params.key] = req.params.value;
      bookCo.printDocument(dbConfig.collection, doc, function(err, docs) {
    		res.json(docs[0]);
    	});
    });

    // POST one
    app.post('/', (req, res, next) => {
      bookCo.insertDocument(dbConfig.collection, req.body, function(err, docs) {
        res.json(docs[0]);
      });
    });

    // PUT one
    app.put('/:id', (req, res, next) => {
      var doc = {_id: req.params.id};
    	var updateDoc = {"$set": req.body};
    	bookCo.updateDocument(dbConfig.collection, doc, updateDoc, function(err, docs) {
        res.json(docs);
      });
    });

    // DELETE one
    app.delete('/:id', (req, res, next) => {
      var doc = {_id: req.params.id};
    	bookCo.deleteDocument(dbConfig.collection, doc, function(err, result) {
        res.json(result.result.ok + " document deleted successfully");
      });
    });

    //////////////////////////////// Custom routes here -vvvvv

}
