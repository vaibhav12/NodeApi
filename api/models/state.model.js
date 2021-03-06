const sql = require("./db.js");

// constructor
const State = function(state) {
  this.name = state.name;
  this.state_code = state.state_code;
  this.status = state.status;
  this.created_at = state.created_at;
  this.modified_at = state.modified_at;    
};

State.create = (newState, result) => {
  sql.query("INSERT INTO dgnote_trailer_state SET ?", newState, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created state: ", { id: res.insertId, ...newState });
    result(null, { id: res.insertId, ...newState });
  });
};

State.findById = (stateId, result) => {
  sql.query(`SELECT * FROM dgnote_trailer_state WHERE id = ${stateId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found state: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

State.getAll = (req, result) => {
	
	//let sqlQuery = `select * from dgnote_trailer_state
      //  where name like  ${req.query.name}`;
    var sql1 = "select * from dgnote_trailer_state ";
    
    console.log("Server is running on port 3000."+sql1);
    
    var existingParams = ["id","name"].filter(field => req.query[field]);
	console.log("Server is running on port 3000."+existingParams);
	if (existingParams.length) {
		sql1 += " WHERE ";
		sql1 += existingParams.map(field => `${field} = ${req.query[existingParams]}`).join(" AND ");
	}    

    sql.query(sql1, (err, res) => {
		console.log("Server is running on port 3000."+sql1);
		if (err) {
		  console.log("error: ", err);
		  result(err, null);
		  return;
		}

		if (res.length) {
		  console.log("found customer: ", res);
		  result(null, res);
		  return;
		}

		// not found Customer with the id
		result({ kind: "not_found" }, null);
	});  
};

State.updateById = (id, state, result) => {
  sql.query(
    "UPDATE dgnote_trailer_state SET state_code = ?, name = ?, status = ? WHERE id = ?",
    [state.state_code, state.name, state.status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Status with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated status: ", { id: id, ...state });
      result(null, { id: id, ...customer });
    }
  );
};

State.remove = (id, result) => {
  sql.query("DELETE FROM dgnote_trailer_state WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found State with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted state with id: ", id);
    result(null, res);
  });
};

State.removeAll = result => {
  sql.query("DELETE FROM dgnote_trailer_state", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} states`);
    result(null, res);
  });
};


module.exports = State;
