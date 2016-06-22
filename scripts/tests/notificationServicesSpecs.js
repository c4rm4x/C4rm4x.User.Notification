'use strict';

describe('Notifcation services', function() {

	beforeEach(module('angular-notification-services'));

	describe('Notify', function() {
		var service, SweetAlert, window, deferred, scope;

		beforeEach(inject(function(Notify, _SweetAlert_, $q, $rootScope) {
			service = Notify;
			SweetAlert = _SweetAlert_;
			deferred = $q.defer();
			scope = $rootScope.$new();

			spyOn(SweetAlert, 'swal');
			spyOn(SweetAlert, 'error');
		}));

		describe('loading', function() {

			beforeEach(function() {
				service.loading(function() { return deferred.promise; }, 'anyText');
			});

			it('should invoke swal from SweetAlert with no interaction whatsoever', function() {
				expect(SweetAlert.swal).toHaveBeenCalledWith({
					title: 'anyText',
					type: 'info',
					showCancelButton: false,	
					showConfirmButton: false,	
					closeOnConfirm: false,
					closeOnCancel: false
				});
			});

			it('should show error message when promise ends with errors', function() {
				deferred.reject({
					data: 'anyError'
				});
				scope.$apply();
				expect(SweetAlert.error).toHaveBeenCalledWith('Oops...', 'anyError');
			});
		});

		describe('confirm', function() {

			beforeEach(function() {
				service.confirm('anyQuestion', function() { return deferred.promise; });
			});

			it('should invoke swal from SweetAlert asking the question', function() {
				expect(SweetAlert.swal).toHaveBeenCalledWith({
					title: 'Are you sure?',
					text: 'anyQuestion',
					type: 'warning',
					showCancelButton: true,
					closeOnConfirm: false,
					showLoaderOnConfirm: true
				}, jasmine.any(Function));
			});
		});
	});
});