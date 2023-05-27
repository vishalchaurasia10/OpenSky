// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    // constructor() ERC721("MyNFT", "MTK") {}

    // function safeMint(address to, uint256 tokenId) public onlyOwner {
    //     _safeMint(to, tokenId);


    mapping(uint256 => address) private customApprovals;

    constructor() ERC721("MyNFT", "MNFT") {}

    function getCustomApproved(uint256 _tokenId) external view returns (address) {
        return customApprovals[_tokenId];
    }

    function approveCustomTransfer(address _approved, uint256 _tokenId) external {
        customApprovals[_tokenId] = _approved;
    }
    
    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
}