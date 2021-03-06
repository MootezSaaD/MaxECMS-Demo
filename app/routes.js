// app/routes.js


module.exports = function(app,passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });

	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
	//================================
	app.get('/upload_qzs', isLoggedIn, function(req, res) {
		res.render('upload_qzs.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
	//================================
	app.get('/upload_bks', isLoggedIn, function(req, res) {
		res.render('upload_bks.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
	//================================
	app.get('/upload_mids', isLoggedIn, function(req, res) {
		res.render('upload_mids.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
	//================================
	app.get('/upload_finals', isLoggedIn, function(req, res) {
		res.render('upload_finals.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
	//================================
	app.get('/midterms', isLoggedIn, function(req, res) {
		res.render('midterms.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
	//FileManager
	app.get('/filemanager', isLoggedIn, function(req, res) {
		res.render('filemanager.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
	//Settings
	app.get('/settings', isLoggedIn, function(req, res) {
		res.render('settings.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
	//Uploads folder



//Schedule
app.get('/schedule', isLoggedIn, function(req, res) {
	res.render('schedule.ejs', {
		user : req.user // get the user out of session and pass to template
	});
});
//Community
app.get('/community', isLoggedIn, function(req, res) {
	res.render('community.ejs', {
		user : req.user // get the user out of session and pass to template
	});
});
//Contact
app.get('/contact', isLoggedIn, function(req, res) {
	res.render('contact.ejs', {
		user : req.user // get the user out of session and pass to template
	});
});
	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};



// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/login');
}
