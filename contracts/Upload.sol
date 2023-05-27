// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
contract Upload{
    struct Access{
        address user;
        bool access;
    }

    mapping (address=>string[]) val;
    mapping (address=>mapping (address=>bool)) ownership;
    mapping (address=>Access[]) acceslist;
    mapping(address=>mapping (address=>bool)) previousData;

    function add(address _user,string memory url) external{
        val[_user].push(url);
    }

    function allow(address user) external{
        ownership[msg.sender][user]=true;

 if(previousData[msg.sender][user]){
     for(uint i=0;i<acceslist[msg.sender].length;i++){
         if(acceslist[msg.sender][i].user==user){
             acceslist[msg.sender][i].access=true;
         }
     }
   
 }
   else {
         acceslist[msg.sender].push(Access(user,true));
         previousData[msg.sender][user]=true;
     }
      

    }


    function disallow(address user)public{
        ownership[msg.sender][user]=false;
        for(uint i=0;i<acceslist[msg.sender].length;i++){
            if(acceslist[msg.sender][i].user==user){
                acceslist[msg.sender][i].access=false;

            }
        }
    }

function display (address _user)external view returns(string[] memory){
    require(_user==msg.sender||ownership[_user][msg.sender],"You can't see");
    return val[_user];
}

function shareAccess() public view returns (Access[] memory){
    return acceslist[msg.sender];
}

}