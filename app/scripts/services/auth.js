'use strict';
app.factory('Auth', function ($rootScope, $q, $location, $timeout, $firebaseAuth, User) {
	// var ref = firebase.database().ref();
	var user;

	// $rootScope.$watch('user', function(value, oldValue){
	// 	// console.log(arguments)
	// 	// if(value != oldValue){
	// 		User.profile(user).then(function(res){
	// 			$rootScope.user = res;
	// 		})
	// 	// }
	// })

	var Model = function(data){
		angular.extend(this, data);
	};

	Model.logout = function(){
		var auth = $firebaseAuth(ref);
		auth.$unauth();
		$location.path("/");
	}

	Model.login = function(){
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function(result) {
			console.log(result)
		});

		// ref.authWithOAuthRedirect("google", authHandler);
		// ref.authWithOAuthPopup("google", authHandler);
	}

	// Create a callback to handle the result of the authentication
	function authHandler(error, authData) {
	  // if (error) {
	  //   console.log("Login Failed!", error);
	  // } else {
	  //   console.log("Authenticated successfully with payload:", authData);
	  // }
	  // $timeout(function(){
	  // })
	}


	function authDataCallback(authData) {
	  if (authData) {
		User.profile(authData).then(function(res){
			if(res.$value === null){
				User.register(authData)
			}else{
				$rootScope.user = res;
			}
		})

	  } else {
	    console.log("User is logged out");
	    $rootScope.user = undefined;
	  }
	}

	// ref.onAuth(authDataCallback);


	return Model;

})
