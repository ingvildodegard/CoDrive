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
    
    $scope.addtrip = function (idx) {
      var i = $scope.trips[idx]; 
        $.getJSON('/trip/deletetrip/'+i._id, function(data){
        	$scope.trips.removeById(i._id);
        	$scope.$digest();
        });
    };

	$.getJSON('/trip/all', function(data){
	     $.each(data, function(){
	        $scope.trips.push(this);
            $scope.$apply();
	     });
	});
	
};