
function UserController($scope){
	$scope.trips = [];
	
	$.getJSON('/db', function(data){
	     $.each(data, function(){
	        $scope.trips.push(this);
            $scope.$apply();
	     });
	});
};