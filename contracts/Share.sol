// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Share is ERC721Holder {
    using SafeMath for uint256;

    struct Shareholder {
        address payable shareholder;
        uint256 shares;
    }

    struct ShareholderInfo {
        address shareholder;
        uint256 shares;
    }

    address public nftAddress;
    uint256 public totalShares;
    uint256 public nextShareholderIndex;
    mapping(uint256 => Shareholder) public shareholders;
    mapping(address => uint256) public addressToIndex;

    function addShareholder(
        address payable _shareholder,
        uint256 _shares,
        address _nftAddress
    ) external {
        require(_shareholder != address(0), "Invalid shareholder address");
        require(_shares > 0, "Invalid share value");
        require(_nftAddress != address(0), "Invalid NFT address");

        if (nftAddress == address(0)) {
            nftAddress = _nftAddress;
        } else {
            require(nftAddress == _nftAddress, "NFT address cannot be changed");
        }

        if (addressToIndex[_shareholder] == 0) {
            addressToIndex[_shareholder] = nextShareholderIndex;
            shareholders[nextShareholderIndex] = Shareholder(
                _shareholder,
                _shares
            );
            nextShareholderIndex++;
        } else {
            uint256 index = addressToIndex[_shareholder];
            shareholders[index].shares = shareholders[index].shares.add(
                _shares
            );
        }

        totalShares = totalShares.add(_shares);
    }

    function removeShareholder(address payable _shareholder) external {
        require(_shareholder != address(0), "Invalid shareholder address");

        uint256 index = addressToIndex[_shareholder];
        require(index > 0, "Shareholder does not exist");

        uint256 shares = shareholders[index].shares;

        totalShares = totalShares.sub(shares);
        delete shareholders[index];
        delete addressToIndex[_shareholder];
    }

    function shareNFT(uint256 _tokenId) external {
        IERC721 nft = IERC721(nftAddress);
        require(
            nft.ownerOf(_tokenId) == msg.sender,
            "Caller is not the owner of the NFT"
        );

        uint256 nftShares = shareholders[1].shares;
        require(nftShares > 0, "No shareholders added");

        nft.safeTransferFrom(msg.sender, address(this), _tokenId);

        uint256 shareValue = nftShares.div(totalShares);
        for (uint256 i = 1; i < nextShareholderIndex; i++) {
            address payable shareholder = shareholders[i].shareholder;
            uint256 shares = shareholders[i].shares;
            uint256 amount = shareValue.mul(shares);
            if (amount > 0) {
                shareholder.transfer(amount);
            }
        }

        // Calculate remaining share of the owner
        uint256 ownerShares = totalShares.sub(nftShares);
        address payable owner = payable(nft.ownerOf(_tokenId));
        shareholders[1].shares = ownerShares;
        shareholders[1].shareholder = owner;
    }

    function withdrawNFT(uint256 _tokenId) external {
        IERC721 nft = IERC721(nftAddress);
        require(
            nft.ownerOf(_tokenId) == address(this),
            "Contract does not own the NFT"
        );

        nft.safeTransferFrom(address(this), msg.sender, _tokenId);
    }

    function getShareholderCount() external view returns (uint256) {
        return nextShareholderIndex - 1;
    }

    function getShareholders()
        external
        view
        returns (ShareholderInfo[] memory)
    {
        ShareholderInfo[] memory shareholdersInfo = new ShareholderInfo[](
            nextShareholderIndex - 1
        );

        for (uint256 i = 1; i < nextShareholderIndex; i++) {
            Shareholder storage shareholder = shareholders[i];
            shareholdersInfo[i - 1] = ShareholderInfo(
                shareholder.shareholder,
                shareholder.shares
            );
        }

        return shareholdersInfo;
 }
}
