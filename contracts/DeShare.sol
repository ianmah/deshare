//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DeShareMember is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    // mapping(address => uint8) private _allowList;
    // uint256 public constant PRICE_PER_TOKEN = 0.001 ether;

    string public baseTokenURI;

    // TODO: Restrict ability to mint via some kind of allowlist
    // TODO: Define max supply

    constructor(string memory baseURI) ERC721("DeShare Member", "DSM") {
        setBaseURI(baseURI);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function mintItem(string memory newTokenURI) public returns (uint256) {
        require(
            balanceOf(msg.sender) < 3,
            "You can only mint three member NFTs"
        );

        _tokenIds.increment();
        uint256 id = _tokenIds.current();
        _mint(msg.sender, id);
        _setTokenURI(id, newTokenURI);

        return id;
    }

    // bafyreie3pxhmo2glhz6knocut227hgyy5o2jumj5uslyle6bwjnc2ujyhi/metadata.json

    // function mintItemOne() public returns (uint256) {
    //     require(balanceOf(msg.sender) < 1, "You can only mint one member NFT");

    //     _tokenIds.increment();

    //     uint256 id = _tokenIds.current();
    //     _mint(msg.sender, id);

    //     return id;
    // }

    // function setAllowList(address[] calldata addresses, uint8 numAllowedToMint)
    //     external
    //     onlyOwner
    // {
    //     for (uint256 i = 0; i < addresses.length; i++) {
    //         _allowList[addresses[i]] = numAllowedToMint;
    //     }
    // }

    // function mintAllowList(uint8 numberOfTokens) external payable {
    //     require(
    //         numberOfTokens <= _allowList[msg.sender],
    //         "Exceeded max available to purchase"
    //     );
    //     require(
    //         PRICE_PER_TOKEN * numberOfTokens <= msg.value,
    //         "Ether value sent is not correct"
    //     );

    //     for (uint256 i = 0; i < numberOfTokens; i++) {
    //         _allowList[msg.sender] -= 1;
    //         mintItem();
    //     }
    // }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        // attempt to break token transfers
        from = address(0);
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

contract DeSharePost is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    DeShareMember memberContract;

    // NFT Post => (NFT Membership Voter => vote status)
    mapping(uint256 => mapping(uint256 => bool)) voteMap;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => Counters.Counter) votes;

    string public baseTokenURI;

    event UpVote(uint256 newVoteCount);

    constructor(address _memberContractAddr, string memory baseURI)
        ERC721("DeShare Post", "DSP")
    {
        memberContract = DeShareMember(_memberContractAddr);
        setBaseURI(baseURI);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function setMemberContract(address _t) public onlyOwner {
        memberContract = DeShareMember(_t);
    }

    function mintItem(string memory newTokenURI) public returns (uint256) {
        require(
            memberContract.balanceOf(msg.sender) > 0,
            "You must own a DeShareMembership"
        );
        _tokenIds.increment();

        uint256 id = _tokenIds.current();
        _mint(msg.sender, id);
        _setTokenURI(id, newTokenURI);

        return id;
    }

    function vote(uint256 postId, uint256 membershipId) public {
        require(
            memberContract.ownerOf(membershipId) == msg.sender,
            "You must own a DeShareMembership"
        );

        require(
            voteMap[postId][membershipId] != true,
            "You have already voted on this DePost"
        );
        voteMap[postId][membershipId] = true;
        votes[postId].increment();
        emit UpVote(votes[postId].current());
    }

    function getVotes(uint256 postId) public view returns (uint256) {
        return votes[postId].current();
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
