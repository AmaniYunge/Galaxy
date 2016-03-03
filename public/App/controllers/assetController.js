/**
 * Created by leo on 11/14/15.
 */

(function() {
    'use strict';

    angular
        .module('microfinanceApp')
        .controller('assetController',assetController);

    assetController.$inject = ['$scope','$cookies','$timeout','$routeParams','$window','$filter','AuthenticationService','AssetService','DTOptionsBuilder'];

    function assetController($scope,$cookies,$timeout,$routeParams,$window,$filter,AuthenticationService,AssetService,DTOptionsBuilder) {


        var assetC = this;

            assetC.formUrl = "public/App/partials/settings/assets/add.html";
        /**
         * Applicant datatables
         * */
        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDisplayLength(10)
            .withOption('bLengthChange', true);


        assetC.loadAssets = function(){
            AssetService.GetAll().then(function(data){
                $scope.assets = data;
            },function(){

            });
        }
        assetC.loadAssets();

        assetC.saveAssets = function(Assets){

            $scope.success = false;
            $scope.failure = false;
            if(Assets){
                $scope.current = Assets;
                AssetService.Create(Assets).then(function(respense){
                    if(respense=="success"){
                        $scope.assetOb = null;
                        $scope.success = true;
                        $scope.failure = false;
                        assetC.loadAssets();
                        $timeout(function () {
                            $scope.assetOb = null;
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

        $scope.edit_assets = false;
        $scope.add_assets = true;
        assetC.editAssets = function(id){
            $scope.asset_to_edit = $filter('filterById')($scope.assets,id);
            assetC.formUrl = "public/App/partials/settings/assets/edit.html";
        }
        assetC.updateAssets = function(Assets){

            AssetService.Update(Assets).then(function(response){
                if(response=="success"){
                    assetC.loadAssets();
                    assetC.formUrl = "public/App/partials/settings/assets/add.html";
                }
            },function(){

            });
        }
        assetC.deleteAssets = function(id){
            AssetService.Delete(id).then(function(response){
                if(response=="success"){
                    assetC.loadAssets();
                    assetC.formUrl = "public/App/partials/settings/assets/add.html";
                }
            },function(){

            });

        }


        assetC.cancelUpdate = function(){
            assetC.formUrl = "public/App/partials/settings/assets/add.html";
        }

        assetC.cancelAdd = function(){
            console.log("CANCEL UPDATE EXECUTED");
            assetC.formUrl = "public/App/partials/settings/assets/add.html";
            //$window.location.reload();
        }

        console.log(assetC);
    }

})();
