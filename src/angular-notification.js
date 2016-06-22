'use strict';

var notificationMain = angular.module('angular-notification-main', [
	'angular-notification-services' ]);
'use strict';

var notificationServices = angular.module('angular-notification-services', ['oitozero.ngSweetAlert']);

notificationServices.service('Notify', ['SweetAlert', '$window', '$rootScope', 
	function(SweetAlert, $window, $rootScope) {

	function close() {
		$rootScope.$evalAsync(function() {
			$window.swal.close();
		});
	}

	function error(errorDescription) {
		SweetAlert.error('Oops...', errorDescription);
	};	

	this.loading = function(promise, text) {				
		promise()
			.then(function() {
				close();				
			})
			.catch(function(response) {
				error(response.data);
			});

		SweetAlert.swal({
			title: text || 'Loading...',
			type: 'info',
			showCancelButton: false,	
			showConfirmButton: false,	
			closeOnConfirm: false,
			closeOnCancel: false
		});
	};

	this.confirm = function(question, onConfirm, onSuccess, onBadRequest) {
		SweetAlert.swal({
			title: 'Are you sure?',
			text: question,
			type: 'warning',
			showCancelButton: true,
			closeOnConfirm: false,
			showLoaderOnConfirm: true
		}, function(isConfirm) {
			if (!isConfirm) return;
			
			onConfirm()
				.then(function(data) {
					if (onSuccess) {						
						SweetAlert.swal('Sweet!', onSuccess.text || 'Everything went well', 'success');
						if (onSuccess.action) onSuccess.action(data);
					}
				})
				.catch(function(response) {
					error(response.data);

					if (response.config && response.config.errors && onBadRequest)
						onBadRequest(response.config.errors);
				});
		});
	};
}]);