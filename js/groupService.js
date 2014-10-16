var app = angular.module("healthApp");

app.service("groupService", function($firebase, $state){

	var groupRef = new Firebase('https://hcompapp.firebaseio.com/groups');
	var userRef = new Firebase('https://hcompapp.firebaseio.com/users/');
	var currentEditGroup;


	var GroupDraft = function(name, member){
		this.name = name;
		this.members = [member];
	};
	var UserGroupRef = function(id, admin, name){
		this.id = id;
		this.admin = admin;
		this.name = name;
		this.started = false;
		this.score = 0;
	};
	var Member = function(userId, userName){
		this.userId = userId;
		this.userName = userName;
		this.userScore = 0;
	};

	this.makeNewGroupDraft = function(userId, userName, admin, name){
		var aMember = new Member(userId, userName);
		var aGroup = new GroupDraft(name, aMember);
		var id = groupRef.push(aGroup);
		var newGroupObj = new UserGroupRef(id.name(), admin, name);
		userRef.child(userId).child('groups').push(newGroupObj);
	};

	this.joinGroup = function(userId, userName, id, name){
		var aJoinedGroup = new UserGroupRef(id, false, name);
		userRef.child(userId).child('groups').push(aJoinedGroup);
		var aMember = new Member(userId, userName);
		groupRef.child(id).child('members').push(aMember);
	};

	this.currentGroup = function(id){
		return $firebase(new Firebase('https://hcompapp.firebaseio.com/groups/' + id));
	};

});