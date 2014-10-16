var app = angular.module("healthApp");

app.service("userService", function($q, $firebase){

	var ref = new Firebase("https://hcompapp.firebaseio.com/");
	var sync = $firebase(ref);
	var users = sync.$asArray();


//   New User Stuff   //
	var User = function(uid, name, signInService, photo){
		this.name = name;
		this.uid = uid;
		this.signInService = signInService;
		this.nameType = signInService;
		this.photo = photo;
		this.photoType = signInService;
	};

	this.newFirebaseUser = function(email, password){
		var deferred = $q.defer();
		ref.createUser({
			email: email,
			password: password
		}, function(error, data){
			if(error===null){
				deferred.resolve(data);
			} else{
				console.log(error);
			}
		});
		return deferred.promise;
	};



	// LOGIN STUFF //
	this.currentUser = function(id){
		return $firebase(new Firebase('https://hcompapp.firebaseio.com/users/' + id));
	};

	this.googleSignIn = function(cb){
		ref.authWithOAuthPopup('google', function(err, data){
			if(data){
				var newUserCheck;
				ref.child('users').child(data.auth.uid.replace('google:', '')).on('value', function(snapshot){
					newUserCheck = snapshot.val();
				});
				if(!newUserCheck){
					var aUser = new User(data.auth.uid.replace('google:',''), data.google.cachedUserProfile.name, "Google", data.google.cachedUserProfile.picture);
					ref.child('users').child(data.auth.uid.replace('google:','')).set(aUser);
					cb(data);
				}
				else{
					cb(data);
				}
			}
		});
	};
	this.facebookSignIn = function(cb){
		ref.authWithOAuthPopup('facebook', function(err, data){
			if(data){
				var newUserCheck;
				ref.child('users').child(data.auth.uid.replace('facebook:', '')).on('value', function(snapshot){
					newUserCheck = snapshot.val();
				});
				if(!newUserCheck){
					var aUser = new User(data.auth.uid.replace('facebook:',''), data.facebook.displayName, "Facebook", data.facebook.cachedUserProfile.picture.data.url);
					ref.child('users').child(data.auth.uid.replace('facebook:','')).set(aUser);
					cb(data);
				}
				else {
					cb(data);
				}
				
			}
		});
	};




});




