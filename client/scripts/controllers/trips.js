function TripController($scope){
	$scope.date = new Date();
	$scope.trips = [];
	
	$scope.delete = function (idx) {
        var i = $scope.trips[idx]; 
        $.getJSON('/trip/deletetrip/'+i._id, function(data){
        	$scope.trips.removeById(i._id);
        	$scope.$digest();
        });
    };
    
    	
    
    $scope.addtrip = function (trip) {
        $.post('/trip/addtrip/',trip, function(data){
        	alert("Response: " + data);
        });
        
      /*  $.ajax({
            type: 'POST',
            dataType: 'json',
            data: trip,
			url: '/trip/addtrip/'
        }).done(function( response ) {
            if (response.msg === '') {}
            else {
                alert('Error: ' + response.msg);
            }
        });*/
    };

	$.getJSON('/trip/all', function(data){
	     $.each(data, function(){
	        $scope.trips.push(this);
            $scope.$apply();
	     });
	});
	
};