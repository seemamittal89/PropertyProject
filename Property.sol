
pragma solidity ^0.4.0;


contract Property{
    
    struct Party{
        string name;
        string contact;
        }
    
    address public Gov;
    mapping(address => Party) Parties;
    Party newParty;
    
    event AddEvent(uint ID, string price,string propAdd); //event called during adding new property
    event soldEvent(address add, uint indexed Id, string price, string name, string contact); // event called during transfering property
    event failTxn();
    event invalidTxn(address own,address sender);
    
    function Property(){
         Gov = msg.sender;
         Party storage own = Parties[Gov];
         own.name = "Government";
         own.contact = "9999999999";
         
        }
    
	// only owner of contract can call this function
	//is used for adding new properties
	//function generates a event which is later used along with other event data to show available properties
    function addPropSol(uint newProp, string price, string newAdd){
        if(msg.sender != Gov){
            failTxn();
            return;
        } 
        AddEvent(newProp, price,newAdd);
        
    }
    
	//function is used to reister selected property to buyer's address, it also included selling price
	//function generates a event
    function transfer(address currOwn, address txTo,string newName, string newContact, 
    uint selected, string rate){
        if(sha3(msg.sender) != sha3(currOwn) || txTo == 0){
            invalidTxn(currOwn,msg.sender);
            return;
            }
         newParty = Parties[txTo];
		if(bytes(newName).length > 0){
			newParty.name = newName;
		}
		if(bytes(newContact).length > 0){
			newParty.contact = newContact;
		}
		
		soldEvent(txTo,selected, rate, newName,newContact);
    }
	
}    
