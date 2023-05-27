//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract Upload {
    struct File {
        string url;
        string format;
    }

    struct Access {
        address user;
        bool access;
    }

    mapping(address => File[]) private files;
    mapping(address => mapping(address => bool)) private ownership;
    mapping(address => Access[]) private accessList;
    mapping(address => mapping(address => bool)) private previousData;

    function add(
        address _user,
        string memory _url,
        string memory _format
    ) external {
        files[_user].push(File(_url, _format));
    }

    function allow(address _user) external {
        ownership[msg.sender][_user] = true;

        if (previousData[msg.sender][_user]) {
            for (uint256 i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == _user) {
                    accessList[msg.sender][i].access = true;
                }
            }
        } else {
            accessList[msg.sender].push(Access(_user, true));
            previousData[msg.sender][_user] = true;
        }
    }

    function disallow(address _user) public {
        ownership[msg.sender][_user] = false;
        for (uint256 i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == _user) {
                accessList[msg.sender][i].access = false;
            }
        }
    }

    function display(address _user) external view returns (File[] memory) {
        require(
            _user == msg.sender || ownership[_user][msg.sender],
            "You can't see"
        );
        return files[_user];
    }

    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}
