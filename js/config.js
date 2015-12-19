let config = function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('root',{
      url: '/',
      templateUrl: './templates/home.tpl.html',
      controller: 'HomeController as vm'
    });

};

config.$inject= ['$stateProvider', '$urlRouterProvider'];
export default config;