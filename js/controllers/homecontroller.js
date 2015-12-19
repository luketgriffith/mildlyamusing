import $ from 'jquery';
let HomeController = function($http, $scope){
  let vm= this;
  
  let Parse = {
    url: "https://api.parse.com/1/classes/thoughts",
    CONFIG: {
      headers: {
        'X-Parse-Application-Id': 'L1EdTH8j96wH6vR1VbtnDJEvK5oJCoOrebiPUEHy',
        'X-Parse-REST-API-Key': 'HERt4Ldstiy3x3QWr2sZrGaMDRl1JVfY6TrPWp4U'
      }
    }
  };
  
  function getThoughts(){
    $http.get(Parse.url, Parse.CONFIG).then((res)=>{
      console.log(res);
      vm.thoughts= res.data.results.reverse();
    });
  }


  $('.addThought').click(function(){
    $('.thoughts').addClass('displayed');
  });




  getThoughts();
  $scope.$on('newThought', function(){
    getThoughts();
  });
  $scope.$on('liked', function(){
    getThoughts();
  });

  let Thought = function(thought){
    this.thought = thought.thought;
    this.name = thought.name;
    this.likes = 0;
  };
  vm.add= function(thought){
    let t = new Thought(thought);
    console.log(t);
    $http.post(Parse.url, t, Parse.CONFIG).then((res)=>{
      console.log(res);
      $scope.$broadcast('newThought');
      $('.thoughts').removeClass('displayed');
    });
  };
  vm.like= function(thought){
    // console.log(thought);
    console.log('thought: ', thought)
    let t = {
      objectId: thought.objectId,
      likes: Number(thought.likes + 1)
    }
    console.log(t);
    $http.put(Parse.url + '/'+ thought.objectId, t, Parse.CONFIG).then((res)=>{
      // console.log(res);
      $scope.$broadcast('liked');
    })
  }
  vm.sortAmuse = function(){
      vm.orderList= 'likes';
  }
  vm.sortOld = function(){
    vm.orderList = 'createdAt'
  }
};
HomeController.$inject= ['$http', '$scope'];
export default HomeController;