function AddTripController($scope){
/*	$.post('/trip/addtrip', $("data").serialize(),function(data){
  //data contains the JSON object
  //textStatus contains the status: success, error, etc
	}, "json");*/
};
/*
function DeleteTripController($scope){
 $scope.submit = function() {
 	alert(this);
      };
};*/

function TripController($scope){
	$scope.date = new Date();
	$scope.trips = [];
	$.getJSON('/trip/all', function(data){
	     $.each(data, function(){
	        $scope.trips.push(this);
            $scope.$apply();
	     });
	});
	
};