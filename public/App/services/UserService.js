/**
 * Created by leo on 11/13/15.
 */

(function () {
    'use strict';

    angular
        .module('microfinanceApp')
        .factory('UserService', UserService);

    UserService.$inject = ['$http','UtilityService'];
    function UserService($http,UtilityService) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByEmail = GetByEmail;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get('public/index.php/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            //return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByEmail(email) {

            return $http.get('public/index.php/users/' + email).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return $http.post('public/index.php/users', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put('public/index.php/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('public/index.php/users/' + id).then(handleSuccess, handleError('Error deleting user'));
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