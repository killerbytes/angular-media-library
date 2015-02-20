'use strict';
app.factory('mdUtils', function ($q, $http, config) {

	var Model = function(data){
		angular.extend(this, data);
	};

	Model.parseFilename = function(filename){
		var strip = [
		/\.mkv/g,
		/\.avi/g,
		/\.mp4/g,
		/\./g,
		]
		var name = filename;
		_.forEach(strip, function(i){
			name = name.replace(i, " ");
		})
		
		return name.split(" ").slice(0, 2).join(" ");
	}


	Model.humanFileSizezx = function(bytes, si) {
	    var thresh = si ? 1000 : 1024;
	    if(bytes < thresh) return bytes + ' B';
	    var units = si ? ['kB','MB','GB','TB','PB','EB','ZB','YB'] : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
	    var u = -1;
	    do {
	        bytes /= thresh;
	        ++u;
	    } while(bytes >= thresh);
	    return bytes.toFixed(1)+' '+units[u];
	}

	Model.humanFileSize = function(size) {
		var i = Math.floor( Math.log(size) / Math.log(1024) );
   	return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
	};


	Model.getBase64FromImageUrl =function (URL) {

	    var img = new Image();
	    img.src = URL;
	    img.onload = function () {

	    	console.log(this)

	    var canvas = document.getElementById('canvas');
	    // console.log(canvas)
	    canvas.width =this.width;
	    canvas.height =this.height;

	    var ctx = canvas.getContext("2d");
	    ctx.drawImage(this, 0, 0);


	    
	    var dataURL = canvas.toDataURL("image/png");

	    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
			
	    }
	}

	return Model;


});
