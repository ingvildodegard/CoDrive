function TripController($scope){
	$scope.trips = [];
	
	$.getJSON('/trip/all', function(data){
	     $.each(data, function(){
	        $scope.trips.push(this);
            $scope.$apply();
	     });
	});
};