/**
 * Created by leo on 11/11/15.
 */
(function() {
    'use strict';

    angular
        .module('microfinanceApp')
        .controller('assessmentController', assessmentController);

    assessmentController.$inject = ['$scope','$route','$cookies','$timeout','$routeParams','$window','$filter','$location','LoanService','AuthenticationService','AssessmentService','ApplicationService','GrantService','QuestionService','DTOptionsBuilder'];

    function assessmentController($scope,$route,$cookies,$timeout,$routeParams,$window,$filter,$location,LoanService,AuthenticationService,AssessmentService,ApplicationService,GrantService,QuestionService,DTOptionsBuilder) {
        var assessment = this;

        $scope.loans = [];
        $scope.currentAssessment= {};
        assessment.url = "/settings/interview/";
        $scope.leftFormUrl = "public/App/partials/settings/questions/add.html";

        $scope.moreassessment_panelclass = "col-md-12";
        $scope.showleft_form = false;

        assessment.getLoans = function(){
            LoanService.GetAll().then(function(data){
                $scope.loans  = data;
            });
        }

        assessment.getAssessments = function(){
            AssessmentService.GetAll().then(function(data){
                $scope.assessments  = data;
            });
        }

        assessment.getLoanById = function(loan_id){
            var loan = {};
            angular.forEach($scope.loans,function(value){
            if(value.id==loan_id){
                loan = value;
            }
            });
            return loan;
        }

        assessment.getCurrentAssessment  = function(){
            if($location.path().indexOf('/settings/interview/more/')>=0){
                var assessmentId =$routeParams.id;
                AssessmentService.GetById(assessmentId).then(function(data){
                    angular.extend($scope.currentAssessment,data);
                    $scope.getQuestionsFromAssessment(assessmentId);
                    angular.extend($scope.currentAssessment,assessment.getLoanById(data.loan_id));

                });

            }

            if($location.path().indexOf('/edit')>=0){
                var assessmentId =$routeParams.id;
                AssessmentService.GetById(assessmentId).then(function(data){
                    angular.extend($scope.currentAssessment,data);
                    $scope.associatedLoan = assessment.getLoanById($scope.currentAssessment.loan_id);
                    //$scope.getQuestionsFromAssessment(assessmentId);
                    //angular.extend($scope.currentAssessment,assessment.getLoanById(data.loan_id));

                });

            }
        }


        assessment.saveAssessment = function(assessment){

            $scope.assessment = null;
            $scope.success = false;
            $scope.failure = false;
            if(assessment){
                $scope.current = assessment;
                AssessmentService.Create(assessment).then(function(respense){
                    if(respense=="success"){
                        $scope.assessment = null;
                        $scope.success = true;
                        $scope.failure = false;

                        $timeout(function () {
                            $scope.assessment = null;
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
        }

        assessment.cancelAdd = function(){
            $location.path("/settings/interview");
        }

        $scope.loadAddQuestionForm = function(){
            $scope.moreassessment_panelclass = "col-md-7";
            $scope.showleft_form = true;
            $location.path('/settings/interview/more/'+$routeParams.id);
        }

        $scope.cancelAddQuestionForm = function(){
            $route.reload();

            $scope.moreassessment_panelclass = "col-md-12";
            $scope.showleft_form = false;
        }

        $scope.cancelEditQuestionForm = function(){
            $route.reload();

            $scope.moreassessment_panelclass = "col-md-12";
            $scope.showleft_form = false;
        }

        $scope.addQuestion = function(question){
            question.assessment_id = $routeParams.id;
            $scope.failure = false;
            $scope.success = false;
            QuestionService.Create(question).then(function(data){
                $scope.getQuestionsFromAssessment(question.assessment_id);
                $scope.failure = true;
                $scope.success = true;
            },function(response){
                console.log(response);
            });
        }

        $scope.editQuestion = function(question){
            $scope.leftFormUrl = "";
            $scope.editQuestion = question;
            $scope.moreassessment_panelclass = "col-md-7";
            $scope.showleft_form = true;
            $scope.leftFormUrl = "public/App/partials/settings/questions/edit.html";
        }

        $scope.deleteQuestion = function(question){
            QuestionService.Delete(question.id).then(function(response){
                $scope.success = true;
                assessment.getCurrentAssessment();
            },function(response){
                $scope.failure = true;
                //$route.reload();
            });
        }

        $scope.updateQuestion = function(question){
            $scope.failure = false;
            $scope.success = false;
            QuestionService.Update(question).then(function(value){
                $scope.success = true;
            },function(response){
                $scope.failure = true;
            });
        }
        $scope.getQuestionsFromAssessment = function(assessment_id){
            $scope.failure = false;
            $scope.success = false;
            $scope.currentAssessment.questions = [];
            QuestionService.getQuestionByAssessment(assessment_id).then(function(data){
                $scope.currentAssessment.questions = data;
                $scope.success = true;
            },function(response){
                $scope.failure = true;
            });
        }

        assessment.getLoans();
        assessment.getAssessments();
        assessment.getCurrentAssessment();


    }

})();