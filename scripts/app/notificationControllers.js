'use strict';

var notificationControllers = angular.module('angular-notification-controllers', ['ngMaterial']);

notificationControllers.controller('notificationToastCtrl', ['$scope', '$mdToast', '$mdDialog', 'errorDescription',
	function($scope, $mdToast, $mdDialog, errorDescription) {

	var isDlgOpen = false;

	function closeDlg() {
		isDlgOpen = false;
	};

	function openDgl() {
		isDlgOpen = true;
	};
	
	$scope.closeToast = function() {
		if (isDlgOpen) return;

        $mdToast.hide().then(closeDlg);
    };

	$scope.openMoreInfo = function(e) {
        if (isDlgOpen) return;

        openDgl();

        $mdDialog.show(
        	$mdDialog
        		.alert()
        		.title('Oops...')
        		.textContent(errorDescription || 'Something witty.')
        		.ariaLabel('More info')
        		.ok('Got it')
        		.targetEvent(e)
		)
		.then(closeDlg);
	};

}]);

