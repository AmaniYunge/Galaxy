/**
 * Created by leo on 11/11/15.
 */
(function() {
    'use strict';

    angular
        .module('microfinanceApp')
        .controller('groupController', groupController);

    groupController.$inject = ['$scope','$cookies','$timeout','$routeParams','GroupService','$window','$filter','$location','AuthenticationService','DTOptionsBuilder'];

    function groupController($scope,$cookies,$timeout,$routeParams,GroupService,$window,$filter,$location,AuthenticationService,DTOptionsBuilder) {
            var group = this;
                group.groups = [];
                $scope.hideFormToken = false;

        /**
         * Applicant datatables
         * */
            $scope.dtOptions = DTOptionsBuilder.newOptions()
                .withDisplayLength(10)
                .withOption('bLengthChange', true);


        group.saveGroup = function(newGroup){
            GroupService.Create(newGroup).then(function(data){
                if(data=="success"){
                $scope.current = newGroup;
                $scope.success = true;
                $scope.failure = false;
                $timeout(function () {
                    $scope.applicant = null;
                    $scope.success = false;
                    $scope.failure = false;
                }, 1000);
            }
            },function(respense){
                $scope.failure = true;
                $scope.success = false;
                $timeout(function () {
                    $scope.success = false;
                    $scope.failure = false;
                }, 1000);
            });
        }
        group.updateGroup = function(newGroup){
            GroupService.Update(newGroup).then(function(data){
                if(data=="success"){
                $scope.current = newGroup;
                $scope.success = true;
                $scope.failure = false;
                $timeout(function () {
                    $scope.applicant = null;
                    $scope.success = false;
                    $scope.failure = false;
                }, 1000);
            }
            },function(respense){
                $scope.failure = true;
                $scope.success = false;
                $timeout(function () {
                    $scope.success = false;
                    $scope.failure = false;
                }, 1000);
            });
        }
        group.deleteGroup = function(id){
            GroupService.Delete(id).then(function(data){
                if(data=="success"){
                    group.listGroups();
                 }
            },function(respense){

            });
        }
        group.listGroups = function(){
            GroupService.GetAll().then(function(data){
                group.groups = data;
            },function(respense){

            });
        }
        group.getGroup = function(id){
            GroupService.GetById(id).then(function(data){
                group.editedGroup = data;
            },function(respense){

            });
        }

        if($routeParams.id){
            group.getGroup($routeParams.id);
        }

        group.listGroups();





    }

})();