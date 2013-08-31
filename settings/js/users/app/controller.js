/*
 * ownCloud - Core
 *
 * @author Raghu Nayyar
 * @copyright 2013 Raghu Nayyar <raghu.nayyar.007@gmail.com>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU AFFERO GENERAL PUBLIC LICENSE for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

usersmanagement.controller('prioritygroupController',
	['$scope', '$routeParams', 'GroupService', 'UserService',
	function($scope, $routeParams, GroupService, UserService){
		
		/*Returns everyone. */
		$scope.getEveryone = function() {
			
		}
		
		/* Returns the list of Subadmins on the Userlist */
		$scope.getSubadmins = function() {
			
		}
	}
]);

/* Controller for Creating Groups - Left Sidebar */

usersmanagement.controller('creategroupController',
	['$scope', '$http', 'GroupService',
	function($scope, $http, GroupService) {
		var newgroup = {};
		$scope.savegroup = function() {
			GroupService.creategroup().save({ groupname : $scope.newgroup });
			$scope.showgroupinput = false;
			$scope.showbutton = true;
			$scope.newgroup = '';
		}
	}
]);

/* Fetches the List of All Groups - Left Sidebar */

usersmanagement.controller('grouplistController',
	['$scope', '$resource', '$routeParams', 'GroupService', 'UserService', 'GroupModel',
	function($scope, $resource, $routeParams, GroupService, UserService, GroupModel) {
		$scope.loading = true;
		$scope.groups = GroupModel.getAll();
		
		$scope.routeParams = $routeParams;
		GroupService.getAllGroups().then(function(response) {
			$scope.loading = false;
			
			// Deletes the group.
			$scope.deletegroup = function(group) {
				$scope.groups.splice($scope.groups.indexOf(group), 1);
				GroupService.removegroup(group);
			}
		});
	}
]);

/* Asynchronously creates user */

usersmanagement.controller('addUserController',
	['$scope', '$http', 'UserService', 'GroupService',
	function($scope, $http, UserService, GroupService) {
		
		// Takes Out all groups for the Mutiselect dropdown
		$scope.allgroups = GroupService.getByGroupId().get();
		var newuser = $scope.newuser;
		var password = $scope.password;
		var selectedgroup = $scope.addGroup;
		$scope.saveuser = function(newuser,password,selectedgroup) {
			UserService.createuser(newuser,password,selectedgroup);
		}
	}
]);

usersmanagement.controller('setQuotaController',
	['$scope', 'QuotaService',
	function($scope, QuotaService) {
		$scope.quotavalues =[
								{show : '5 GB'},
								{show : '10 GB'},
								{show : '10 GB'},
								//{show : '10 GB', quotaval : 'Unlimited'},
								//{show : 'Custom', quotaval : 'Custom'}
							];
		// Default Quota
		$scope.selectdefaultQuota = function(defaultquota) {
			console.log(defaultquota.show);
			QuotaService.setDefaultQuota(defaultquota.show);
		}
	}
]);

/* Fetches the List of All Users and details on the Right Content */

usersmanagement.controller('userlistController',
	['$scope', 'UserService', 'GroupService', 'QuotaService','$routeParams',
	function($scope, UserService, GroupService, QuotaService, $routeParams) {
		$scope.loading = true;
		UserService.getAllUsers().then(function(response) {
			$scope.users = UserService.getUsersInGroup($routeParams.groupId);
			$scope.loading = false;
			$scope.userquotavalues = [
									{ show : '5 GB' },
									{ show : '10 GB' },
									{ show : '15 GB' },
									//{show : 'Unlimited'},
									//{show : 'Custom'}
			];			

			/* Takes Out all groups for the Chosen dropdown */
			$scope.allgroups = GroupService.getByGroupId().get();
			/* Updates Display name */
			$scope.updateDisplayName = function(userid,displayname) {
				UserService.updateName(userid,displayname);
			}
			
			/* Updates Password */
			$scope.updatePassword = function(userid,password) {
				UserService.updatePass(userid,password);
			}
			
			/* Updates User Quota */
			$scope.updateUserQuota = function(userid,userQuota) {
				console.log(userid);
				QuotaService.setUserQuota(userid,userQuota.show);
			}
			
			/* Deletes Users */
			$scope.deleteuser = function(user) {
				$scope.users.splice($scope.users.indexOf(user), 1);
				UserService.removeuser(user);
			};
			
			/* To Toggle User Groups */
			$scope.toggleGroup = function() {
				UserService.groupToggle({ username : userid });
			}
			
			/* To Add a User to a New Group */
			$scope.addGroup = function() {
				
			}
			
		});
	}
]);
