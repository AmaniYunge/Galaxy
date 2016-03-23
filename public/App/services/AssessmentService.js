/**
 * Created by leo on 11/13/15.
 */


(function () {
    'use strict';

    angular
        .module('microfinanceApp')
        .factory('AssessmentService', AssessmentService);

    AssessmentService.$inject = ['$http'];
    function AssessmentService($http) {
        var service = {};
        service.largestId = [];
        service.current = null;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.Questions = Questions;
        service.CheckLoanReturns = CheckLoanReturns;
        service.GetGrantedLoan = GetGrantedLoan;
        service.getLastReturn = getLastReturn;
        service.GetApplicantYearly = GetApplicantYearly;
        service.saveAssessmentResponse = saveAssessmentResponse;
        service.getAssessmentResponse = getAssessmentResponse;
        service.getQuestionResponse = getQuestionResponse;
        service.max = max;
        return service;

        function GetAll() {
            return $http.get('public/index.php/assessments').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetApplicantYearly(year) {
            return $http.get('public/index.php/assessments/year/'+year+'/get').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('public/index.php/assessments/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function Create(assessment) {
            return $http.post('public/index.php/assessments', assessment).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(assessment) {
            return $http.put('public/index.php/assessments/' + assessment.id, assessment).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('public/index.php/assessments/' + id).then(handleSuccess, handleError('Error deleting user'));
        }


        function Questions(id) {
            return $http.get('public/index.php/assessments/' + id+'/questions').then(handleSuccess, handleError('Error deleting user'));
        }

        function saveAssessmentResponse(response) {
            return $http.post('public/index.php/assessments/'+response.assessment+'/response', response).then(handleSuccess, handleError('Error creating user'));
        }

        function getAssessmentResponse(response) {
            return $http.post('public/index.php/assessments/'+response+'/qestionresponse', response).then(handleSuccess, handleError('Error creating user'));
        }

        function getQuestionResponse(applicant_id,assessment_id) {
            return $http.post('public/index.php/assessments/'+applicant_id+'/getQuestionresponse/'+assessment_id).then(handleSuccess, handleError('Error Loading response'));
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


        function CheckLoanReturns(assessment) {
            if(assessment!=null){
                if(assessment.loan_returns.length>0){
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
