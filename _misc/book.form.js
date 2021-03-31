const mongoose = require('mongoose');

const EntitySchema = mongoose.Schema({
    kind: {},
    content: String,
    TyTags: [String],
    enterpriseTags: [String],
    timespace: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Entity', EntitySchema);

/*

const UndividualSchema = mongoose.Schema({
    sequence: Number, // mass
    TyKey: String, // bow
    hexID: String, // form
    hextID: String, // form
    fullName: String, // spin
    mDOB: Date, // book.form
    email: [String], // co
    accounts: {
    	LI: { address: String, email: String, password: String, doC: Date, stat: String },
    	Hbtc: { address: String, email: String, password: String, doC: Date, stat: String },
    	FB: { address: String, email: String, password: String, loginURL: String, doC: Date, stat: String },
    },
    enterprises: [String], // nu
    mLoc: { // book.bow
    	description: String,
        imageURL: String
    }
}, {
    timestamps: true
});


const VortexSchema = mongoose.Schema({
  field: String, // i.e. paraDiv // bow.spin
  zone: { // i.e. subDiv // book.bow.spin
    eng: String,
    esp: String
  },
	plane: String, // i.e. undividual // Ty
  class: String, // el typo de vortice // form
	leviKey: {}, // the name of the vortex/task // spin
	masterContour: String, // Main task // flo.spin
	floContours: [String], // routes, or subtasks // flo.form
  //parent: String,
	range: { // book.Ty.bow
    dur: String,
    qScope: String,
    hours: String,
    weeks: String,
    days: String,
    orientation: String
  }, // crontab style time designation
	prox: Number, // current proximity, or percent complete estimate // book.bow.mass
	opp: Number, // current operativity (average from child route productivity) flo.mass
	arrival: { // book.Ty.un
		state: { // are we there yet?
			type: String,
        	enum: ["there", "notThere"]
		},
		date: Date // date of arrival, only filled out if state == there
	}
}, {
    timestamps: true
});


const TimespaceSchema = mongoose.Schema({
  guid: String,
  from: Number, // book.form
  to: Number, // book.un
  comment: String, //
  tsBridge: String,
  atype: String, // bow
  userGuid: String,
  revision: Number
}, {
    timestamps: true
});




*/
