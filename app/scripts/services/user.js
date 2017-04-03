'use strict';
app.factory('User', function ($rootScope, $q, $firebaseArray, $firebaseObject) {
	// var ref = firebase.database().ref();
	// console.log(ref)
	var uid;

	var Model = function(data){
		angular.extend(this, data);
	};

	Model.profile = function(user){
		var d = $q.defer();
		uid = user.uid;
		$firebaseObject(ref.child(user.uid)).$loaded(function(res){
			d.resolve(res);
		})
		return d.promise;
	}

	Model.favorites = function(){
		var d = $q.defer();
		if(uid){
			$firebaseArray( ref.child(uid).child('favorites') ).$loaded(function(res){
				d.resolve(res);
			})
		}else{
			d.resolve([])
		}
		return d.promise;
	}

	Model.isFavorite = function(id){
		var d = $q.defer();
		if(uid){
			$firebaseObject( ref.child(uid).child('favorites').child(id) ).$loaded(function(res){
				d.resolve(res);
			})
		}
		return d.promise;
	}

	Model.favorite = function(video, remove){
		var d = $q.defer();
		if(uid){
			var favorite = ref.child(uid).child('favorites').child(video.id);
			if(remove){
				$firebaseObject(favorite).$remove().then(function(res){
					d.resolve(res);
				})
			}else{
				favorite.set({
					video: video.id
				}, function(res){
					d.resolve(res);
				})
			}
		}
		return d.promise;
	}

	Model.register = function(authData){
		var users = ref.child(authData.uid);
		users.set({
			name: authData.google.displayName,
			id: authData.google.id,
			avatar: authData.google.profileImageURL
		})
		Model.profile(authData).then(function(res){
			$rootScope.user = res;
		})
	}



	return Model;

})
