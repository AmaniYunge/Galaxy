/**
 * Created by leo on 11/13/15.
 */


(function () {
    'use strict';

    angular
        .module('microfinanceApp')
        .factory('ApplicantsponsorService', ApplicantsponsorService);

    ApplicantsponsorService.$inject = ['$http'];
    function ApplicantsponsorService($http) {
        var service = {};
        service.largestId = [];
        service.current = null;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        return service;


        function Create(sponsor) {
            return $http.post('public/index.php/applicantsponsor', sponsor).then(handleSuccess, handleError('Error creating sponsor'));
        }

        function Update(sponsor) {
            return $http.put('public/index.php/applicantsponsor/' + sponsor.id, sponsor).then(handleSuccess, handleError('Error updating sponsor'));
        }

        function Delete(id) {
            return $http.delete('public/index.php/applicantsponsor/' + id).then(handleSuccess, handleError('Error deleting sponsor'));
        }



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
