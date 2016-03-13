/**
 * Created by leo on 11/11/15.
 */
(function() {
    'use strict';

    angular
        .module('microfinanceApp')
        .controller('applicationController', applicationController);

    applicationController.$inject = ['$scope','$cookies','$timeout','$routeParams','$window','$filter','$location','AuthenticationService','LoanService','ApplicantService','ApplicationService','GrantService','DTOptionsBuilder'];

    function applicationController($scope,$cookies,$timeout,$routeParams,$window,$filter,$location,AuthenticationService,LoanService,ApplicantService,ApplicationService,GrantService,DTOptionsBuilder) {
        var application = this;
        application.appllications = {};
        $scope.grantApplication = {};
        $scope.loans = {};

        /**
         * Applicant datatables
         * */
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(10)
            .withOption('bLengthChange', true);


        ApplicationService.GetAll().then(function(data){
            application.appllications  = data;
            $scope.appllications  = data;
        });

        LoanService.GetAll().then(function(data){
            $scope.loans  = data;
        });

        $scope.saveLoanApplication = function(newApplication){
            $scope.applicant = null;
            $scope.success = false;
            $scope.failure = false;

            ApplicationService.Create(newApplication).then(function(respense){
                if(respense=="success"){
                    $scope.applicant = null;
                    $scope.success = true;
                    $scope.failure = false;
                    $location.path("/applications");
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

        application.grantLoan = function(grantApplication){


            grantApplication.applicant_id = $routeParams.applicant_id;
            grantApplication.application_id = $routeParams.id;
            grantApplication.loaned_amount = $scope.applicationInfo.applied_amount;
            //grantApplication.amount_to_return = ApplicationService.GetAmountToReturn($scope.applicationInfo,grantApplication);

            GrantService.Create(grantApplication).then(function(resposne){
                 //$location.path("/applicant/"+$routeParams.applicant_id+"/application");
            },function(resposne){

            });
        }


        application.getApplicantWithSponsor = function(){
            ApplicantService.GetWithSponsor().then(function(data){
                $scope.appicantsWithSponsor = data;
            },function(resposne){

            });
        }

        application.getApplicantWithSponsor = function(){
            ApplicantService.GetWithSponsor().then(function(data){
                $scope.appicantsWithSponsor = data;
            },function(resposne){

            });
        }

        application.getApplicantWithSponsor();




        application.info = function(){
            if($routeParams.id){
                $scope.$watch('appllications',function(newValue,oldOne){
                    $scope.applicationInfo = $filter('filterById')($scope.appllications,$routeParams.id);

                });

            }
        }
        application.info();
    }

})();