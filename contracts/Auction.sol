// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;

import "./Auth.sol";
import "./Inventory.sol";
import "./SafeMath.sol";

contract AuctionFactory {
    Auction[] public auctions;

    function createAuction(
        string memory _title,
        uint _startPrice,
        string memory _description,
        string memory _itemIpfs
    ) public {
        // set the new instance
        Auction newAuction = new Auction(
            payable(msg.sender),
            _title,
            _startPrice,
            _description,
            _itemIpfs
        );
        // push the auction address to auctions array
        auctions.push(newAuction);
    }

    function returnAllAuctions() public view returns (Auction[] memory) {
        return auctions;
    }
}

contract Auction is Auth {
    using SafeMath for uint256;

    address payable private owner;
    string title;
    uint startPrice;
    string description;
    string itemIpfs;
    uint count;

    struct Buyer {
        address buyerAddress;
        uint256 price;
        string item;
    }

    Buyer[] public buyer;

    enum State {
        Default,
        Running,
        Finalized
    }
    State public auctionState;

    uint public highestPrice;
    address payable public highestBidder;
    mapping(address => uint) public bids;

    /** @dev constructor to creat an auction
     * @param _owner who call createAuction() in AuctionFactory contract
     * @param _title the title of the auction
     * @param _startPrice the start price of the auction
     * @param _description the description of the auction
     */

    constructor(
        address payable _owner,
        string memory _title,
        uint _startPrice,
        string memory _description,
        string memory _itemIpfs
    ) {
        // initialize auction
        owner = _owner;
        title = _title;
        startPrice = _startPrice;
        description = _description;
        itemIpfs = _itemIpfs;
        auctionState = State.Running;
    }

    modifier notOwner() {
        require(msg.sender != owner);
        _;
    }

    /** @dev Function to place a bid
     * @return true
     */

    function placeBid(address _addr) public payable notOwner returns (bool) {
        require(
            checkIsUserLogged(_addr) == true,
            "You need to be sign in before bidding!"
        );
        require(auctionState == State.Running);
        require(msg.value > 0);
        // update the current bid
        // uint currentBid = bids[msg.sender] + msg.value;
        uint currentBid = bids[msg.sender].add(msg.value);

        require(currentBid > highestPrice);
        // set the currentBid links with msg.sender
        bids[msg.sender] = currentBid;
        // update the highest price
        highestPrice = currentBid;
        highestBidder = payable(msg.sender);

        return true;
    }

    function finalizeAuction() public {
        //the owner can finalize the auction.
        require(msg.sender == owner);

        address payable recipiant;
        uint value;

        // owner can get highestPrice
        if (msg.sender == owner) {
            recipiant = owner;
            value = highestPrice;
        }
        // highestBidder can get no money
        else if (msg.sender == highestBidder) {
            recipiant = highestBidder;
            buyer[count].buyerAddress = recipiant;
            buyer[count].price = value;
            buyer[count].item = itemIpfs;
            itemIpfs = "0";
            value = 0;
            count++;
        }
        // Other bidders can get back the money
        else {
            recipiant = payable(msg.sender);
            value = bids[msg.sender];
        }
        // initialize the value
        bids[msg.sender] = 0;
        recipiant.transfer(value);
        auctionState = State.Finalized;
    }

    /** @dev Function to return the contents od the auction
     * @return the title of the auction
     * @return the start price of the auction
     * @return the description of the auction
     * @return the state of the auction
     */

    function returnContents()
        public
        view
        returns (string memory, uint, string memory, Buyer[count] memory)
    {
        return (title, startPrice, description, buyer[count]);
    }

    function returnWinners() public view returns (Buyer[] memory) {;
      return (buyer);
    }
    
}
