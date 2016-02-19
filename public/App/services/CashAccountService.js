

(function () {
    'use strict';

    angular
        .module('microfinanceApp')
        .factory('CashAccountService', CashAccountService);

    CashAccountService.$inject = ['$http'];
    function CashAccountService($http) {
        var cashAccount = {};
        cashAccount.totalGrants = 0;
        cashAccount.totalExpenses = 0;
        cashAccount.totalReturn = 0;
        cashAccount.totalCreditSide = 0;

        cashAccount.totalGrant = function(debits){
            var initialTotal = 0;
            angular.forEach(debits,function(value,index){
                initialTotal= Number(initialTotal) + Number(value.loaned_amount);
            });

            cashAccount.totalGrants = initialTotal;
            return cashAccount.totalGrants;
        }

        cashAccount.sumDebitSide = function(debits){
            var initialTotal = 0;
            angular.forEach(debits,function(value,index){
                initialTotal= Number(initialTotal) + Number(value.amount);
            });
            cashAccount.totalDebitSide = initialTotal;
            return cashAccount.totalDebitSide;
        }

        cashAccount.sumCreditSide = function(expenses){
            var initialTotal = 0;
            angular.forEach(expenses,function(value,index){
                initialTotal= Number(initialTotal) + Number(value.value);
            });
            cashAccount.totalCreditSide = initialTotal;
            return cashAccount.totalCreditSide;
        }

        cashAccount.totalExpense = function(expenses){
            var initialTotal = 0;
            angular.forEach(expenses,function(value,index){
                initialTotal= Number(initialTotal) + Number(value.value);
            });
            cashAccount.totalExpenses = initialTotal;
            return cashAccount.totalExpenses;
        }
        return cashAccount;
    }
})();
