
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Upload {
    struct Access {
        address user;
        bool access;
    }

    struct Data {
        string url;
        string date;
        string time;
    }

    mapping(address => Data[]) private val;
    mapping(address => mapping(address => bool)) private ownership;
    mapping(address => Access[]) private acceslist;
    mapping(address => mapping(address => bool)) private previousData;

    function add(address _user, string memory url, string memory date, string memory time) external {
        val[_user].push(Data(url, date, time));
    }

    function allow(address user) external {
        ownership[msg.sender][user] = true;

        if (previousData[msg.sender][user]) {
            for (uint256 i = 0; i < acceslist[msg.sender].length; i++) {
                if (acceslist[msg.sender][i].user == user) {
                    acceslist[msg.sender][i].access = true;
                }
            }
        } else {
            acceslist[msg.sender].push(Access(user, true));
            previousData[msg.sender][user] = true;
        }
    }

    function disallow(address user) public {
        ownership[msg.sender][user] = false;
        for (uint256 i = 0; i < acceslist[msg.sender].length; i++) {
            if (acceslist[msg.sender][i].user == user) {
                acceslist[msg.sender][i].access = false;
            }
        }
    }

    function display(address _user) external view returns (Data[] memory) {
        require(_user == msg.sender || ownership[_user][msg.sender], "You can't see");
        return val[_user];
    }

    function shareAccess() public view returns (Access[] memory) {
        return acceslist[msg.sender];
    }
}
