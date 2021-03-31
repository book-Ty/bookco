//const Entity = require('../models/entity.model.js');
//const archChange = require('../models/archchange.model.js');


// Create and Save a new Entity
exports.create = (req, res) => {
    // Validate request
    /*
    if(!req.body.leviKey) {
        return res.status(400).send({
            message: "Description cannot be empty"
        });
    }
    */

    for (key in req.body) {
      if (req.body[key].indexOf(',') > -1) req.body[key] = req.body[key].split(',')
    }


    // Create a Entity

    const entity = new Entity();

    var payLoad = Object.entries(req.body).reduce((outerObj, [key, val]) => {
      if (!key.includes('.')) {
        outerObj[key] = val;
        return outerObj;
      }
      const keys = key.split('.');
      const lastKey = keys.pop();
      const lastObj = keys.reduce((a, key) => {
        // Create an object at this key if it doesn't exist yet:
        if (!a[key]) {
          a[key] = {};
        }
        return a[key];
      }, outerObj);
      // We now have a reference to the last object created (or the one that already existed
      // so, just assign the value:
      lastObj[lastKey] = val;
      return outerObj;
    }, {});

    for (key in payLoad) entity[key] = payLoad[key];

    // Save Entity in the database
    entity.save()
    .then(data => {
        res.send(data);
    /*
        const archchange = new archChange({
    			type: 'Entity',
    			entryType: 'Create',
    			doc: req.params.entityId,
    			changes: req.body
    		});
		    archchange.save();
        */
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Entity."
        });
    });
};

// Retrieve and return all entities from the database.
exports.findAll = (req, res) => {
    db.collection("entities").find()
    .then(entities => {
        res.send(entities);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving entities."
        });
    });
};

// Find a single entity with a entityId
exports.findOne = (req, res) => {
    Entity.findById(req.params.entityId)
    .then(entity => {
        if(!entity) {
            return res.status(404).send({
                message: "! Entity not found with id " + req.params.entityId
            });
        }
        res.send(entity);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Object Id of Entity not found with id " + req.params.entityId
            });
        }
        return res.status(500).send({
            message: "Error retrieving entity with id " + req.params.entityId
        });
    });
};

// Find a single timespace with a key/value pair
exports.getByKeyValPair = (req, res) => {

    var keyValPair = {};
    keyValPair[req.params.keyId] = req.params.valId;

    Timespace.find(keyValPair)
    .then(timespaces => {
        if(!timespaces) {
            return res.status(404).send({
                message: "! Timespace not found with keyValPair {" + req.params.keyId + " : " + req.params.valId + "}"
            });
        }
        res.send(timespaces);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Object Id of Timespace not found with id {" + req.params.keyId + " : " + req.params.valId + "}"
            });
        }
        return res.status(500).send({
            message: "Error retrieving timespace with id {" + req.params.keyId + " : " + req.params.valId + "}"
        });
    });
};

exports.getBetween = (req, res) => {
    //res.send(req.query);
    var sort;
    if (req.query.sort == 'ASC') sort = 1;
    if (req.query.sort == 'DESC') sort = -1;

    Entity.find({ $and: [ { "date": {"$gte": req.query.start}, "date": {"$lt": req.query.end} } ] })
    .sort({date: sort})
    .then(entities => {
        res.send(entities);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving entities."
        });
    });
}

// Update a entity identified by the entityId in the request
exports.update = (req, res) => {
    // Find entity and update it with the request body
    var payLoad = req.body;
    var keyArr = Object.keys(payLoad);

    if ( keyArr[0].indexOf('.') > -1 ) {
    	payLoad = {$set: req.body};
    }

    Entity.findByIdAndUpdate(req.params.entityId, payLoad, {new: true})
    .then(entity => {
        if(!entity) {
            return res.status(404).send({
                message: "update Entity not found with id " + req.params.entityId
            });
        }
        res.send(entity);
    /*
    		const archchange = new archChange({
    			type: 'Entity',
    			entryType: 'Update',
    			doc: req.params.entityId,
    			changes: req.body
    		});

		    archchange.save();
        */
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "update2 Entity not found with id " + req.params.entityId
            });
        }
        return res.status(500).send({
            //message: "Error updating entity with id " + req.params.entityId
            err
        });
    });
};

exports.updateByDate = (req, res) => {
    // Find dayspace and update it with the request body
    //var date = new Date( Date.UTC(req.query.y, req.query.m - 1, req.query.d) )

    //res.send(date)

    var payLoad = req.body;
    var keyArr = Object.keys(payLoad);

    if ( keyArr[0].indexOf('.') > -1 ) {
    	payLoad = {$set: req.body};
    }

    Dayspace.findOneAndUpdate({
      'unixtime.dateAnalog.y': req.query.y,
      'unixtime.dateAnalog.m': req.query.m,
      'unixtime.dateAnalog.d': req.query.d
    }, payLoad, {new: true})
    .then(dayspace => {
        if(!dayspace) {
            return res.status(404).send({
                message: "update Dayspace not found with id " + req.params.dayspaceId
            });
        }
        res.send(dayspace);
        /*
      	const archchange = new archChange({
      		type: 'Dayspace',
      		doc: req.params.dayspaceId,
      		changes: req.body
      	});
      	archchange.save();
        */
          }).catch(err => {
              if(err.kind === 'ObjectId') {
                  return res.status(404).send({
                      message: "update2 Dayspace not found with id " + req.params.dayspaceId
                  });
        }
        return res.status(500).send({
            //message: "Error updating dayspace with id " + req.params.dayspaceId
            err
        });
    });

};

// Delete a entity with the specified entityId in the request
exports.delete = (req, res) => {
    Entity.findByIdAndRemove(req.params.entityId)
    .then(entity => {
        if(!entity) {
            return res.status(404).send({
                message: "delete Entity not found with id " + req.params.entityId
            });
        }
        res.send({message: "Entity deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "delete 2 Entity not found with id " + req.params.entityId
            });
        }
        return res.status(500).send({
            message: "Could not delete entity with id " + req.params.entityId
        });
    });
};
