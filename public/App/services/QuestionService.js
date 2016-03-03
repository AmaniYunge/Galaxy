/**
 * Created by leo on 11/13/15.
 */


(function () {
    'use strict';

    angular
        .module('microfinanceApp')
        .factory('QuestionService', QuestionService);

    QuestionService.$inject = ['$http'];
    function QuestionService($http) {
        var service = {};
        service.largestId = [];
        service.current = null;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.getQuestionByAssessment = getQuestionByAssessment;
        service.GetGrantedLoan = GetGrantedLoan;
        service.getLastReturn = getLastReturn;
        //service.GetApplicantYearly = GetApplicantYearly;
        service.max = max;
        return service;

        function GetAll() {
            return $http.get('public/index.php/questions').then(handleSuccess, handleError('Error getting all users'));
        }

        //function GetQuestYearly(year) {
        //    return $http.get('public/index.php/questions/year/'+year+'/get').then(handleSuccess, handleError('Error getting all users'));
        //}

        function GetById(id) {
            return $http.get('public/index.php/questions/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function getQuestionByAssessment(id) {
            return $http.get('public/index.php/questions/' + id+'/interview_questions').then(handleSuccess, handleError('Error getting user by id'));
        }

        function Create(applicant) {
            return $http.post('public/index.php/questions', applicant).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(applicant) {
            return $http.put('public/index.php/questions/' + applicant.id, applicant).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('public/index.php/questions/' + id).then(handleSuccess, handleError('Error deleting user'));
        }


         function max (values) {
             var largest= 0;

             for (var i=0; i<=largest;i++){
                 if (values[i]>largest) {
                     var largest=values[i];
                 }
             }

             return largest;
            };


        function CheckLoanReturns(applicant) {
            if(applicant!=null){
                if(applicant.loan_returns.length>0){
                    return true;
                }
            }
            }

        function getLastReturn(applicant) {


            if(applicant!=null){
                if(applicant.loan_returns.length>0){
                    angular.forEach(applicant.loan_returns,function(value,index){
                        service.largestId.push(Number(value.id));

                    });

                    angular.forEach(applicant.loan_returns,function(value,index){

                        if(service.largestId.length>0&&service.max(service.largestId)==value.id){
                            service.current = value;
                            console.log(service.current);
                        }
                    });


                    return service.current;
                }
            }

            }

        function GetAmountReturnedArleady(applicant) {
            var largestId = 0;
            if(applicant!=null){
                if(applicant.loan_returns.length>0){
                    angular.forEach(applicant.loan_returns,function(value,index){
                        largestId +=Number(value.amount);
                    });
                    return largestId;
                }
            }

            }

        function GetGrantedLoan(granted_loans,application_id) {
            var granted = null;
            angular.forEach(granted_loans,function(value,index){
                if(application_id==value.application_id){
                    granted = value;
                }
            });
                return granted;
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
