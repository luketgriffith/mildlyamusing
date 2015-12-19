import angular from 'angular';
import 'angular-ui-router';
import config from './config';
import HomeController from './controllers/homecontroller';

angular
  .module('app', ['ui.router'])
  .controller('HomeController', HomeController)
  .config(config);
