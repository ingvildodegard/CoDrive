
function UserController($scope){
	$scope.users = [];
	
	$.getJSON('/users/all', function(data){
	     $.each(data, function(){
	        $scope.users.push(this);
            $scope.$apply();
	     });
	});
};