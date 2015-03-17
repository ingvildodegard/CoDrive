function TripController($scope){
	$scope.trips = [];
	
	$.getJSON('/tripdb', function(data){
	     $.each(data, function(){
	        $scope.trips.push(this);
            $scope.$apply();
	     });
	});
};