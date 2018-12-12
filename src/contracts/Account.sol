pragma solidity ^0.4.24;
import "./SafeMath.sol";

contract Account{
  using SafeMath for uint256;

  event NewMember(string _name, string _avator);

  struct Member {
    string name;//名字
    string avatar;//头像
    bool isExist;//是否注册
    uint256 balance;//可周转余额
  }

  mapping(address => Member) internal addressToMember;

  address public token;

  constructor() public payable {
    token = msg.sender;
  }

  modifier onlyMemberOf(address _from) {
    require(addressToMember[_from].isExist);
    _;
  }

  // 注册
  function registerMember(string _name, string _avatar) public {
    require(!isMemberOf());
    addressToMember[msg.sender] = Member(_name, _avatar, true, 0);
    emit NewMember(_name, _avatar);
  }

  // 判断是否注册
  function isMemberOf() public view returns (bool) {
    return addressToMember[msg.sender].isExist;
  }

  // 获取个人信息
  function getMemberInfo() public view onlyMemberOf(msg.sender) returns (string name, string avatar, uint256 balance) {
    return (addressToMember[msg.sender].name, addressToMember[msg.sender].avatar, addressToMember[msg.sender].balance);
  }

  function getTotalBalance() public view returns (uint256) {
    return address(this).balance;
  }

  function withdraw(uint256 amount) public onlyMemberOf(msg.sender) returns (uint256) {
    require(address(this).balance >= amount);
    addressToMember[msg.sender].balance = addressToMember[msg.sender].balance.sub(amount);
    msg.sender.transfer(amount);
    return addressToMember[msg.sender].balance;
  }
}
