// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.9.0/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.9.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.9.0/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts@4.9.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.9.0/token/ERC721/utils/ERC721Holder.sol";
contract Share is ERC20, Ownable, ERC20Permit ,ERC721Holder{
    IERC721 public collection;
    uint256 public tokenId;
    bool public initialized = false;
    bool public forSale = false;
    uint256 public salePrice;
    bool public canRedeem = false;


    constructor() ERC20("MyToken", "MTK") ERC20Permit("MyToken") {}

    function initialize(address _collection, uint _tokenId,uint256 _amount)external onlyOwner{
        require(!initialized, "already initialized");
        require(_amount >0 , "not possible with this much amount");
        collection = IERC721(_collection);
        collection.safeTransferFrom(msg.sender, address(this),_tokenId);
        tokenId = _tokenId;
        initialized = true;
        _mint(msg.sender, _amount);

    }

    function putForSale(uint256 price) external onlyOwner{
            salePrice = price;
            forSale = true;
    }

    function purchase() external payable{
        require(forSale,"not for sale");
        require(msg.value >= salePrice, "not enough ether sent");
        collection.transferFrom(address(this),msg.sender, tokenId);
        forSale = false;
        canRedeem = true;
    }

    function redeem(uint256 _amount) external{
        require(canRedeem,"redemption not available" );
        uint256 totalEther = address(this).balance;
        uint256 toRedeem = _amount * totalEther/totalSupply();

        _burn(msg.sender,_amount);
        payable(msg.sender).transfer(toRedeem);
    }
    // function mint(address to, uint256 amount) public onlyOwner {
    //     _mint(to, amount);
    // }


}
