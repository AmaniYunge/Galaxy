/**
 * Created by leo on 11/11/15.
 */
(function() {
    'use strict';

    angular
        .module('microfinanceApp')
        .controller('applicantController', applicantController);

    applicantController.$inject = ['$scope','$cookies','$timeout','$routeParams','AssessmentService','ApplicantsponsorService','GroupService','$window','$filter','$location','AuthenticationService','ApplicantService','ApplicationService','LoanService','DTOptionsBuilder'];

    function applicantController($scope,$cookies,$timeout,$routeParams,AssessmentService,ApplicantsponsorService,GroupService,$window,$filter,$location,AuthenticationService,ApplicantService,ApplicationService,LoanService,DTOptionsBuilder) {
            var applicant = this;
            applicant.appllicants = {};
            $scope.hideFormToken = false;

            //$scope.$parent.breadcumb = $location.path();

        /**
         * Applicant datatables
         * */
            $scope.dtOptions = DTOptionsBuilder.newOptions()
                .withDisplayLength(10)
                .withOption('bLengthChange', true);

            applicant.loadLoans = function(){
                LoanService.GetAll().then(function(data){
                    $scope.loans  = data;
                });
            }
            applicant.loadApplicants = function(){
                ApplicantService.GetAll().then(function(data){
                    applicant.appllicants  = data;
                    $scope.applicants  = data;
                });
            }
            applicant.loadgroups = function(){
                GroupService.GetAll().then(function(data){
                    applicant.groups  = data;
                });
            }

            $scope.sponsor_type = null;
            applicant.individual_form = false;
            applicant.stateSponsor = function(data){
                if(data=='group'){
                    applicant.group_sponsor = true;
                    applicant.individual_form = false;
                }else{
                    applicant.group_sponsor = false;
                    applicant.individual_form = true;
                }
            }


        /**
         * Controlling the applicant registration form
         * */
        $scope.success = false;
        $scope.failure = false;
        $scope.message = "";
        $scope.current = null;
        $scope.applicant_label = "New Applicant";
        $scope.showSponsorForm = false;

        /**
         * save form values
         * */
        applicant.save = function(applicant){
            $scope.applicant = null;
            $scope.success = false;
            $scope.failure = false;
            $scope.applicant_id = null;
            if(applicant){
                $scope.current = applicant;
                ApplicantService.Create(applicant).then(function(respense){
                    if(respense.status=="success"){
                        $scope.applicant = null;
                        $scope.success = true;
                        $scope.failure = false;
                        $scope.applicant_id = respense.id;
                        $timeout(function () {
                            $scope.applicant = null;
                            $scope.success = false;
                            $scope.failure = false;
                            $scope.applicant_label = $scope.current.first_name+" "+$scope.current.last_name+"'s Sponsor";
                            $scope.showSponsorForm = true;
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

        applicant.saveSponsor = function(sponsor){
            angular.extend(sponsor,{type:'individual',applicantid:$scope.applicant_id});

            ApplicantsponsorService.Create(sponsor,function(response){
                if(response=="success"){
                    $scope.applicant = null;
                    $scope.success = true;
                    $scope.failure = false;
                    $timeout(function () {
                        $location.path("/applicants");
                        $scope.applicant = null;
                        $scope.success = false;
                        $scope.failure = false;
                    }, 1000);
                }
            },function(){

            });
        }
        $scope.group_id = null;
        applicant.saveGroupSponsor = function(sponsorGroup){
            var sponsor = {type:'group',id:sponsorGroup,applicantid:$scope.applicant_id};

            ApplicantsponsorService.Create(sponsor,function(response){
                if(response=="success"){
                    $scope.applicant = null;
                    $scope.success = true;
                    $scope.failure = false;
                    $timeout(function () {
                        $location.path("/applicants");
                        $scope.applicant = null;
                        $scope.success = false;
                        $scope.failure = false;
                    }, 1000);
                }
            },function(){

            });

        }



        applicant.updateLoanApplicant = function(updatedUpplicant){

            $scope.applicant = null;
            $scope.success = false;
            $scope.failure = false;
            if(updatedUpplicant){

                ApplicantService.Update(updatedUpplicant).then(function(respense){
                    if(respense=="success"){
                        $scope.applicant = null;
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
        }

        applicant.deleteLoanApplicant = function(application_id){
            ApplicantService.Delete(application_id).then(function(status){
                applicant.loadApplicants();
            },function(status){

            });
        }

        applicant.info = function(){

            $scope.no_application = false;
            $scope.pending = true;
            $scope.hideFormToken = false;
            //scope.$watch('applicant',function(newValue,oldOne){
            //    scope.applicant = newValue;
            //    if(scope.applicant.applications.length>0){
            //        if(newValue!=null&&newValue.applications[0].status=="pending"){
            //            scope.div_class="col-md-12";
            //
            //        }else{
            //            scope.pending = false;
            //        }
            //    }else{
            //        $scope.div_class="col-md-12";
            //        $scope.no_application = true;
            //    }});


            if($routeParams.id){
                $scope.$watch('applicants',function(newValue,oldOne){
                    $scope.applicantInfo = $filter('filterById')($scope.applicants,$routeParams.id);

                    if($scope.applicantInfo!=null&&$scope.applicantInfo.applications.length>0){
                        $scope.pendingApplication = $filter('pendingApplication')($scope.applicantInfo);

                        if($scope.pendingApplication=="no application"){
                            $scope.pending = false;
                            $scope.hideFormToken = false;

                        }else{
                            $scope.pending = true;
                            $scope.hideFormToken = true;
                        }
                    }else{
                        $scope.hideFormToken = false;
                        $scope.no_application = true;
                    }
                });

            }

        }

        applicant.loadApplicantAssessments = function(applicantId){
            //console.log(applicantId);
        }

        applicant.loadApplicant = function(applicantId){
            applicant.applicant = {};
            ApplicantService.GetById(applicantId).then(function(data){
                applicant.applicant = data;
            });
        }

        applicant.prepareScores = function(data,assessments){
            var score_assessment = [];


            angular.forEach(assessments,function(value){
                angular.forEach(data,function(valueAssess){
                    if(valueAssess[value.id]){
                        value.obtained_score = (valueAssess[value.id]/value.minimum_score*100).toFixed(0)+"%";
                        score_assessment.push(value);
                    }
                });

            });



            return score_assessment;
        }

        $scope.vailablequestions = null;
        applicant.getQuestions  =   function(assessment){
           var assessment =  JSON.parse(assessment);
            applicant.selectedAssessment = assessment;
            angular.extend(applicant.selectedAssessment,applicant.getLoan($scope.loans,applicant.selectedAssessment.loan_id));

            $scope.questions = null;
            AssessmentService.Questions(assessment.id).then(function(data){
            $scope.questions = data.questions;
            });

        }
        $scope.interview_scores = null;
        applicant.getAssessmentResponse = function(id){
            AssessmentService.getAssessmentResponse(id).then(function(data){

                AssessmentService.GetAll().then(function(assessments){
                    $scope.interview_scores = applicant.prepareScores(data,assessments);
                });



            });

        }

        applicant.saveQuestion = function(applicant_id,assessment_id,question_id,answer){
            var response = answer.split("_");
            var response = {applicant:applicant_id,assessment:assessment_id,question:question_id,answer:response[0],score:response[1]};
            AssessmentService.saveAssessmentResponse(response).then(function(data){
               if(data=="success"){

               }
            });

        }

        applicant.getLoan = function(loans,loan_id){
            var loan = {};
            angular.forEach(loans,function(value){
                if(value.id == loan_id){
                    loan  = value;
                    return value;
                }
            })

            return loan;
        }

        $scope.assessments = null;
        applicant.loadAssessments = function(){
            AssessmentService.GetAll().then(function(data){
                $scope.assessments = data;
                angular.forEach($scope.assessments,function(value,index){
                    angular.extend($scope.assessments[index],applicant.getLoan($scope.loans,value.loan_id));
                })
            });
        }



        if($routeParams.id){
            applicant.getAssessmentResponse($routeParams.id);
        }


        /// chacke if assesment was requested
        if($location.path().indexOf("interview/add")>=0){
            applicant.loadApplicantAssessments($routeParams.id);
            applicant.loadApplicant($routeParams.id);
        }

        $scope.$watch(applicant.applicant,function(val1,val2){

        });

        applicant.loadLoans();
        applicant.info();
        applicant.loadApplicants();
        applicant.loadAssessments();
        applicant.loadgroups();

    }

})();