
/**
 * This is the main microfinance application controller
 * Created by leo on 11/13/15.
 */

(function() {
    'use strict';

    angular
        .module('microfinanceApp')
        .controller('userController', userController);

    userController.$inject = ['$scope','$window','$rootScope','UserService','AuthenticationService','ApplicationDetailService','CompanyService'];

    function userController($scope,$window,$rootScope,UserService,AuthenticationService,ApplicationDetailService,CompanyService) {
        var user = this;

        user.getUsers = function(){
            user.users = null;
            UserService.GetAll().then(function(data){
                user.users  = data;
            },function(){

            });
        }

        user.saveUser = function(user){
            UserService.Create(user).then(function(data){
                console.log(user);
            },function(){

            });
        }



        user.deleteUser = function(user_id){
            UserService.Delete(user_id).then(function(data){
                user.getUsers();
            },function(){

            });
        }

        user.getUsers();

        if($routeParams.id){

        }



    }

})();