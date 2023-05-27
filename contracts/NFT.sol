// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    constructor() ERC721("PDFToken", "PDF") {}

    function mintPDFToken(
        address recipient,
        string memory metadataURI
    ) public onlyOwner returns (uint256) {
        _tokenIdCounter = _tokenIdCounter + 1;
        _mint(recipient, _tokenIdCounter);
        _setTokenURI(_tokenIdCounter, metadataURI);

        return _tokenIdCounter;
    }
}
