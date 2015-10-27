(function (database){

	var mongodb = require("mongodb");
	var monoUrl = "mongodb://mongo:27017/theBoard";
	var theDb = null;

	database.getDb = function(next)
	{
		if (!theDb) {
			mongodb.MongoClient.connect(monoUrl, function(err, db){
				if (err)
				{
					next(err, null);
				}
				else
				{
					theDb = {
						db: db,
						notes: db.collection("notes"),
						users: db.collection("users")
					};
					next(null, theDb);
				}

			});
		} else {
			next(null, theDb);
		}
	}

})(module.exports);
