const types = require('pg').types;
types.setTypeParser(1114,
	function(stringValue){
		return new Date(Date.parse(stringValue + "+0000"));;
	})
let cn = process.env.RDS_URL;

module.exports = {
	cn: cn,
};