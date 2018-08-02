pragma solidity ^0.4.17;
contract Lottery{
    address public manager;
    address[] public players;
    function Lottery() public{
        manager=msg.sender;
    }
    function getManager()public view returns(address){
        return manager;
    }
    //投注
    function enter() public payable{
        require(msg.value == 1 ether);
        players.push(msg.sender);
    }
    //return all players;
    function getAllPlayers()public view returns(address[]){
        return players;
    }
    //return all money
    function getBalance() public view returns(uint){
        return this.balance;
    }
    //return players  lenth
    function getPlayerslenth () public view returns(uint){
        return players.length;
    }
    //random
    function random() public view returns(uint){
        return uint(keccak256(block.difficulty,now,players));
    }
    //winner
    function win() public returns(address){
        require(msg.sender==manager);
        uint index = random()%players.length;
        address winner=players[index];
        players=new address[](0);
        winner.transfer(this.balance);
        return winner;
    }
    //refound
    function back()public{
        require(msg.sender==manager);
        for(uint i=0;i<players.length;i++){
            players[i].transfer(1 ether);
        }
        players=new address[](0);
    }

}
