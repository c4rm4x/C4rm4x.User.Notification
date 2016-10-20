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


'use strict';

var notificationMain = angular.module('angular-notification-main', [
	'angular-notification-services',
	'angular-notification-controllers' ]);
'use strict';

var notificationServices = angular.module('angular-notification-services', [
	'angular-notification-controllers',
	'ngMaterial']);

notificationServices.service('Notify', ['$mdToast', '$mdDialog',
	function($mdToast, $mdDialog) {

	function error(errorDescription, onChanged) {		
		if (onChanged) onChanged(false);
		$mdToast.show({
			hideDelay: 3000,
			position: 'top right',
			locals: {
				errorDescription: errorDescription
			},
			controller: 'notificationToastCtrl',
			template : '<md-toast><span class=\'md-toast-text\' flex>Seems something got wrong</span><md-button class=\'md-highlight\' ng-click=\'openMoreInfo($event)\'>More info</md-button><md-button ng-click=\'closeToast()\'>&times;</md-button></md-toast>'
        });
	};	

	this.loading = function(promise, onChanged) {				
		promise()
			.then(function() {
				onChanged(false);
			})
			.catch(function(response) {				
				error(response.data, onChanged);
			});

		onChanged(true);
	};

	this.confirm = function($event, question, onConfirm, onSuccess, onBadRequest) {
		var confirm = $mdDialog.confirm()
			.title('Are you sure?')
			.textContent(question)
			.ariaLabel('Lucky day')
			.targetEvent($event)
			.ok('Okay!')
			.cancel('Nope');

		$mdDialog.show(confirm).then(function() {
			onConfirm()
				.then(function(data) {
					$mdDialog.hide();
					if (onSuccess) onSuccess(data);					
				})
				.catch(function(response) {					
					$mdDialog.hide();
					error(response.data);

					if (response.config && response.config.errors && onBadRequest)
						onBadRequest(response.config.errors);
				});

			$mdDialog.show({
				template: '<md-dialog style=\'background-color:transparent;box-shadow:none\'><div style=\'min-height:200px;\' layout=\'row\' layout-align=\'center center\' aria-label=\'wait\'><md-progress-circular md-mode=\'indeterminate\' ></md-progress-circular></div></md-dialog>',
				parent: angular.element(document.body),
				clickOutsideToClose: false,
				fullscreen: false
			});
		});
	};
}]);