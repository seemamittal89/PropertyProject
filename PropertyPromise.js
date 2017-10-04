var abi;

var myContractInstance;

var MyContract;

function startApp(abi2,MyContract2,myContractInstance2){

		console.error("startup");

	    abi=abi2;

	    MyContract=MyContract2;

	    myContractInstance=myContractInstance2;

}



//function called for adding property, can only be used by Owner of contract 

function addProp(){

	var addID = document.getElementById('propID').value;

	var addPrice = document.getElementById('cost').value;

	var addAddress = document.getElementById('propAdd').value;

	var addProp = myContractInstance.addPropSol(addID,addPrice,addAddress,function(err,res){

	console.log("inside aprop");

		if(err){

			console.log(err);

		} else {

			console.log(res);

		}

	});

	

	var fail = myContractInstance.failTxn({},function(err1,res1){

 	document.getElementById('callback').innerHTML = ""+"transaction failed, you are not Government";

	});



	var addEvent = myContractInstance.AddEvent({},function(err1,res1){

			if(!err1){

				var msg = "Added property "+res1.args.ID +" located at "+ res1.args.propAdd+" added for price $"+ res1.args.price;

				document.getElementById('callback').innerHTML = ""+msg;

				console.log(msg);

			} else{

				console.log(err1);

			}

	});



}



function transferProp(){

	var currOwn = "0xfa9C571173fA53430964bc95f56e9E839404039d"; //Government's address

	var propBuyer = document.getElementById('buyer').value;

	var propSoldPrice = document.getElementById('soldPrice').value;

	var propInterested = document.getElementById('soldPropID').value;

	var partyName = document.getElementById('parName').value;

	var partyContact = document.getElementById('parContact').value;

	//var done = false;

	









 function call1(){

 return new Promise(function(resolve, reject){
	console.log("inside call1 "+propInterested);

	 

 var current = myContractInstance.soldEvent({Id: propInterested},{fromBlock:1700000,toBlock :'latest'}, function(err2,res2){



		if(!err2){



		currOwn = res2.args.add;



                console.log("inside" +currOwn);
		return resolve(currOwn);



		//break;



		} else{



			console.log(err2);
		return reject(err2);



		}



	});



	current.stopWatching();
	return resolve("with Gov");

 });

 }





		

function call2(){
		console.log("inside call2 "+currOwn);

	return new Promise(function(resolve, reject){

	var iniTransfer = myContractInstance.transfer(currOwn,propBuyer,partyName,partyContact,propInterested,propSoldPrice, function(err3,res3){

			console.log("inside initransfer");

		if(err3){



			console.log(err3);



		} else{



			console.log(res3);
	return resolve("Success");



		}



	});



	});
	return resolve();

}



	call1()

	.then(call2);



	//event to add		

	var transferEvent = myContractInstance.soldEvent({}, function (err4,res4){
		console.log("inside event");

		if(!err4){

			var msg4 = "Property "+res4.args.Id+" sold to "+res4.args.name+" for price $"+res4.args.price;

			document.getElementById('callback1').innerHTML = ""+msg4;

			console.log(msg4);

		} else{

			console.log(err4);

		}

	});



	var fail1 = myContractInstance.invalidTxn({},function(err11,res11){

	document.getElementById('callback1').innerHTML = " "+"transaction failed, owner of property is "+res11.args.own+", "+res11.args.sender+" is trying to transfer.";

	});

}


function allProp(){

	var sold = [];

	console.log("inside all prop");	

	function allSold(){
	return new Promise(function(resolve,reject){

		var soldProp = myContractInstance.soldEvent({},{fromBlock:1700000, toBlock : 'latest'}, function(err5,res5){

			console.log("inside all prop loop");

		console.log("---"+sold.indexOf((res5.args.Id).valueOf()));

			if(!err5 && sold.indexOf((res5.args.Id).valueOf()) == -1){

			sold.push((res5.args.Id).valueOf());

			console.log((res5.args.Id).valueOf());
			return resolve();

			} else{

			console.log(err5);
			return reject();

			}

		});

	//console.log("----"+sold.length);

	soldProp.stopWatching();
	});
	
	}


	console.log("inside all prop");
	
	function allAdd(){
		return new Promise(function(resolve,reject){


	var allProp = myContractInstance.AddEvent({},{fromBlock : 170000, toBlock : 'latest'},function(err6,res6){

console.log("inside event loop");

	console.log(sold.indexOf((res6.args.ID)).valueOf());

	console.log(sold.length);

		if(!err6 && sold.indexOf((res6.args.ID).valueOf()) == -1){

		var msg6 = "Property "+res6.args.ID+" located at "+ res6.args.propAdd+" available for $"+res6.args.price;

		document.getElementById('propertiesback').innerHTML += "<hr>"+msg6;

		console.log(msg6);

		} else{

			console.log(err6);

		}

	});

	allProp.stopWatching();
	});

}

	 allSold()
	.then(allAdd);
}



//fetching property history using events

function propHistory(){

	var forProp = document.getElementById('intPropID').value;

	var hisMsg = "SHOWING HISTORY FROM OLDEST TO CURRENT OWNER";

	document.getElementById('currentOwn').innerHTML += ""+hisMsg;

	var propHis = myContractInstance.soldEvent({Id:forProp},{fromBlock :0, toBlock : 'latest'},function (err7,res7){

		if(!err7){

			hisMsg = res7.args.Id+" Owned by "+ res7.args.name + "("+res7.args.add+")" +",you can contact him/her at "+res7.args.contact;

			document.getElementById('currentOwn').innerHTML += "<hr>"+hisMsg;

		} else{

			console.log(err7);

		}

	});

	propHis.stopWatching();

}

	

// fetching all sold properties using events

function allSoldProp(){

console.log("inside all sold");

	var allSoldProp = myContractInstance.soldEvent({},{fromBlock:0, toBlock : 'latest'}, function(err8,res8){

		if(!err8){

			var msg8 = res8.args.Id;

			document.getElementById('allSold').innerHTML = ""+msg8;

		} else{

			console.log(err8);

		}

	});

	allSoldProp.stopWatching();

	

}

	