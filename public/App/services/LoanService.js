/**
 * Created by leo on 11/14/15.
 */


(function () {
    'use strict';

    angular
        .module('microfinanceApp')
        .factory('LoanService', LoanService);

    LoanService.$inject = ['$http'];
    function LoanService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.getAmountToReturn = getAmountToReturn;
        service.getAmountPerReturn = getAmountPerReturn;
        service.getDueDate = getDueDate;

        return service;

        function GetAll() {
            return $http.get('public/index.php/loans').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('public/index.php/loans' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function Create(loan) {
            return $http.post('public/index.php/loans', loan).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(loan) {
            return $http.put('public/index.php/loans/' + loan.id, loan).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('public/index.php/loans/' + id).then(handleSuccess, handleError('Error deleting user'));
        }


        function getAmountToReturn(applicationInfo) {
            var duration         = parseInt(applicationInfo.loan.loan_duration);
            var principle_amount = parseInt(applicationInfo.loan.principle_amount);
            var interest_rate    = parseInt(applicationInfo.loan.interest_rate);
            return getAmountPerReturn(applicationInfo)*duration;
        }

        function getAmountPerReturn(applicationInfo) {
            var duration         = applicationInfo.loan.loan_duration;
            var principle_amount = applicationInfo.loan.principle_amount;
            var interest_rate    = applicationInfo.loan.interest_rate;
            return (principle_amount/duration)+(principle_amount*interest_rate/100);
        }
        function getDueDate(applicationInfo) {
            var newdate=new Date();

            return newdate;
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();

