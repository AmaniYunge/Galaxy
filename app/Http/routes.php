<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/','HomeController@index');
Route::get('home','HomeController@authenticated');
Route::resource('app', 'ApplicationDetailsController');
Route::resource('company', 'CompanyController');
Route::resource('expenses', 'ExpensesController');
Route::resource('liabilities', 'LiabilityController');
Route::resource('assets', 'AssetController');
Route::resource('applications', 'ApplicationController');
Route::resource('recentApplications/{period}/{value}/get', 'ApplicationController@recentApplication');
Route::resource('loans', 'LoanController');
Route::resource('groups', 'GroupController');
Route::resource('sponsors', 'SponsorController');
Route::resource('applicantsponsor', 'ApplicantsponsorController');
Route::resource('accounts', 'AccountController');
Route::resource('company_profits', 'CompanyProfitController');
Route::resource('granted_loans', 'GrantedLoanController');
Route::resource('loan_returns', 'LoanReturnController');
Route::resource('logs', 'LogsController');
Route::resource('applicants', 'ApplicantController');
Route::resource('sponsored', 'ApplicantController@sponsored');
Route::resource('applicants/{filter}/{value}/get', 'ApplicantFiltersController');
Route::resource('questions', 'QuestionController');
Route::resource('questions/{id}/interview_questions', 'QuestionController@loadByAssessment');
Route::resource('answers', 'AnswersController');
Route::resource('assessments', 'AssessmentController');
Route::resource('assessments/{id}/questions', 'AssessmentController@question');
Route::resource('assessments/{id}/response', 'AssessmentController@response');
Route::resource('assessments/{id}/qestionresponse', 'AssessmentController@qestionresponse');
Route::resource('assessments/{applicantId}/getQuestionresponse/{assessment_id}', 'AssessmentController@getQuestionresponse');
Route::resource('finances', 'FinancialTransactionController');
Route::resource('finances/{period}/{value}/get', 'FinancialTransactionController@recentTransaction');
Route::resource('homeprint', 'HomeController@getPdf');
Route::resource('users', 'UserController');
//Route::resource('users/{id}', 'UserController');
Route::resource('authenticate', 'Auth\AuthController@authenticate');