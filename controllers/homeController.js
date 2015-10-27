(function (homeController){
	
	var data = require("../data");
	var auth = require("../auth");

	homeController.init = function(app)
	{
		app.get("/", function (req, res){

			data.getNoteCategories(function(err, results)
			{
				var errMessage = req.flash("newCatName");
				console.log(errMessage);

				res.render("index", { 
					title: "The Board", 
					error: err,
					categories: results,					
					newCatError: errMessage,
					user: req.user
				});
			});
		
		});

		app.get("/notes/:categoryName", 
			auth.ensureAutheticated,
			function(req, res){
				var categoryName = req.params.categoryName;
				res.render("notes", {title: categoryName, user: req.user});
			});

		app.post("/newCategory", function(req, res){

			var categoryName = req.body.categoryName;

			data.createNewCategory(categoryName, function (err){
				
				if (err){
					console.log(err);
					req.flash("newCatName", err);
					res.redirect("/");
				} else {
					res.redirect("/notes/" + categoryName);
				}

			});
		});
	};

})(module.exports);