
function UserController($scope){
	$scope.users = [];
	
	$.getJSON('/user/all', function(data){
	     $.each(data, function(){
	        $scope.users.push(this);
            $scope.$apply();
	     });
	});
};