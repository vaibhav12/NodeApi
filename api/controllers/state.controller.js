const State = require("../models/state.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const state = new State({
    state_code: req.body.state_code,
    name: req.body.name,
    status: req.body.status,
    created_at: req.body.created_at,
    modified_at: req.body.modified_at
  });

  // Save Customer in the database
  State.create(state, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  State.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
  
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  State.findById(req.params.stateId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.stateId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving State2 with id " + req.params.stateId
        });
      }
    } else res.send(data);
  });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  State.updateById(
    req.params.stateId,
    new State(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.stateId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.stateId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  
};

exports.findAll = (req, res) => {
	
	//console.log("Server is running on port 3000."+req.query.name);
	State.getAll(req, (err, data) => {
		if (err)
		  res.status(500).send({
			message:
			  err.message || "Some error occurred while retrieving customers."
		  });
		else res.send(data);
	});
};


exports.findAllSearch = (req, res) => {
	
  State.getAll(req,(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};



