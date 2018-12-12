pragma solidity ^0.4.24;
import "./Account.sol";
import "./DateTime.sol";

// 在线在课程发布网站
contract ECourse is Account, DateTime {

  event NewCourse(address creator, string name, uint createTime);
  event BookCourse(address member, string name, string author, string message);
  event EndCourse(address member, string name, string message);
  event Transfer(address indexed from,address indexed to,uint256 value, string message);
  event PunchClock(address member, string course, uint time, uint punchDays);

  enum CourseTypes {BlockChain, ComputerScience, Database,Frontend,Backend,Programinglanguage,Technicalexperience,Other}
  enum FeeTypes {Free, NoRefund, RefundIfSuccess}
  // 课程结构
  struct Course {
    string author;
    string name;
    string description;
    uint courseDays;
    uint256 courseFee;
    string coverImage;
    uint createTime;
    CourseTypes courseType;
    FeeTypes feeTpye;
  }
  // 课程学习记录
  struct CourseRecord {
    bool isSuccess;
    uint punchDays;
    uint startTime;
    uint lastPunchTime;
  }

  Course[] public courses;
  mapping(uint => address) public courseIdToCreator;
  mapping(address => mapping(uint => bool)) private isBook;
  mapping(address => mapping(uint => CourseRecord)) private memberToCourseRecord;

  /**
  * @dev 创建课程.
  */
  function createCourse(
    string _author,
    string _name,
    string _description,
    uint _courseDays,
    uint256 _courseFee,
    string _coverImage,
    uint _courseType,
    uint _feeType) public
  onlyMemberOf(msg.sender) {
    require(_courseFee >= 0);
    require(_courseDays >= 1);
    uint _createTime = now;
    uint index = courses.push(Course( _author,_name,_description,_courseDays,_courseFee,_coverImage,_createTime,CourseTypes(_courseType),FeeTypes(_feeType))) - 1;
    courseIdToCreator[index] = msg.sender;
    emit NewCourse(msg.sender, _name, _createTime);
  }
  /**
  * @dev 获得所有课程长度.
  */
  function getCourseLength() external view returns (uint) {
    return courses.length;
  }

  function getBookCourseLength() external view onlyMemberOf(msg.sender) returns (uint[] memory) {
    uint[] ids;
    for(uint i = 0; i < courses.length; i++) {
      if(isBook[msg.sender][i]) {
        ids.push(i);
      }
    }
    return ids;
  }

  function getCourseRecordById(uint _courseId) external view onlyMemberOf(msg.sender)
  returns (
    uint punchDays,
    uint startTime,
    uint lastPunchTime
  ) {
    require(isBook[msg.sender][_courseId]);
    return (memberToCourseRecord[msg.sender][_courseId].punchDays, memberToCourseRecord[msg.sender][_courseId].startTime, memberToCourseRecord[msg.sender][_courseId].lastPunchTime);
  }

  /**
  * @dev 根据课程Id获得课程主要信息.
  */
  function getCourseById(uint _courseId) external view
  returns (
    string author,
    string name,
    string description,
    uint courseDays,
    uint256 courseFee,
    string coverImage,
    uint createTime,
    CourseTypes courseType,
    FeeTypes feeType,
    bool isbook
  ) {
    require(courses.length >= _courseId);
    Course memory c = courses[_courseId];
    isbook = isBook[msg.sender][_courseId];
    return (c.author, c.name, c.description, c.courseDays, c.courseFee, c.coverImage, c.createTime, c.courseType, c.feeTpye, isbook);
  }

  /**
  * @dev 订阅课程.
  */
  function bookCourse(uint _courseId) public payable onlyMemberOf(msg.sender)  {
    require(isBook[msg.sender][_courseId] == false);
    require(courses.length > _courseId);
    require(msg.value == courses[_courseId].courseFee);
    if(courses[_courseId].feeTpye == FeeTypes.NoRefund) {
      address _to = courseIdToCreator[_courseId];
      require(_to != address(0));
      addressToMember[_to].balance = addressToMember[_to].balance.add(msg.value);
      emit Transfer(msg.sender,_to,msg.value,"paid norefund course succeed.");
    }
    if(courses[_courseId].feeTpye == FeeTypes.RefundIfSuccess) {
      emit Transfer(msg.sender,address(this),msg.value,"paid refund course succeed.");
    }
    CourseRecord storage record = memberToCourseRecord[msg.sender][_courseId];
    record.isSuccess = true;
    record.startTime = now;
    record.punchDays = 0;
    record.lastPunchTime = 0;
    isBook[msg.sender][_courseId] = true;
    emit BookCourse(msg.sender, courses[_courseId].name, courses[_courseId].author, "ok");
  }
  /**
  * @dev 课程打卡.
  */
  function punchClock(uint _courseId) public returns (uint) {
    require(isBook[msg.sender][_courseId] == true);
    uint _now = now;
    require(checkDateDifferent(_now, memberToCourseRecord[msg.sender][_courseId].lastPunchTime));
    CourseRecord storage record = memberToCourseRecord[msg.sender][_courseId];
    if(!checkDateInterval(_now, record.lastPunchTime)) {
      record.isSuccess = false;
    }
    record.lastPunchTime = _now;
    record.punchDays++;
    emit PunchClock(msg.sender, courses[_courseId].name, _now, record.punchDays);
    if(record.punchDays == courses[_courseId].courseDays) {
      _checkRefund(msg.sender, _courseId);
    }
    return record.punchDays;
  }

  /**
  * @dev 检查是否需要退回学费
  */
  function _checkRefund(address _member, uint _courseId) private returns (bool) {
    FeeTypes feeTpye = courses[_courseId].feeTpye;
    if(feeTpye == FeeTypes.Free) {
      emit EndCourse(_member, courses[_courseId].name, "congratulation! finish course.");
      return false;
    }
    if(feeTpye == FeeTypes.NoRefund) {
      emit EndCourse(_member, courses[_courseId].name, "congratulation! finish course.");
      return false;
    }
    if(feeTpye == FeeTypes.RefundIfSuccess) {
      bool success = memberToCourseRecord[msg.sender][_courseId].isSuccess;
      uint256 fee = courses[_courseId].courseFee;
      address creator = courseIdToCreator[_courseId];
      require(getTotalBalance() >= fee);
      if(success) {
        addressToMember[_member].balance = addressToMember[_member].balance.add(fee);
        emit EndCourse(_member, courses[_courseId].name, "congratulation! finish course. fee will send back to wallet.");
        return true;
      } else {
        addressToMember[creator].balance = addressToMember[creator].balance.add(fee);
        emit EndCourse(_member, courses[_courseId].name, "congratulation! finish course. but you fail punch everyday. fee will not send back.");
        return false;
      }
    }
    return false;
  }

}
