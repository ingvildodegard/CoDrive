
function UserController($scope){
	$scope.users = [];
	
	$.getJSON('/userdb', function(data){
	     $.each(data, function(){
	        $scope.users.push(this);
            $scope.$apply();
	     });
	});
};