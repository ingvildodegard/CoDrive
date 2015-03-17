function TripController($scope){
	$scope.trips = [];
	
	$.getJSON('/trips/all', function(data){
	     $.each(data, function(){
	        $scope.trips.push(this);
            $scope.$apply();
	     });
	});
};