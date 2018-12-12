// const address = '0x5a64ad89c492ab6349e023812782fa375b9f42c7';
const address = '0x3f650b228a7495a2f3e7f39528245ad5dd24be9a';
const ABI =[
  {
    "constant": false,
    "inputs": [
      {
        "name": "_courseId",
        "type": "uint256"
      }
    ],
    "name": "bookCourse",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_author",
        "type": "string"
      },
      {
        "name": "_name",
        "type": "string"
      },
      {
        "name": "_description",
        "type": "string"
      },
      {
        "name": "_courseDays",
        "type": "uint256"
      },
      {
        "name": "_courseFee",
        "type": "uint256"
      },
      {
        "name": "_coverImage",
        "type": "string"
      },
      {
        "name": "_courseType",
        "type": "uint256"
      },
      {
        "name": "_feeType",
        "type": "uint256"
      }
    ],
    "name": "createCourse",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_courseId",
        "type": "uint256"
      }
    ],
    "name": "punchClock",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_name",
        "type": "string"
      },
      {
        "name": "_avatar",
        "type": "string"
      }
    ],
    "name": "registerMember",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "createTime",
        "type": "uint256"
      }
    ],
    "name": "NewCourse",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "member",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "author",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "message",
        "type": "string"
      }
    ],
    "name": "BookCourse",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "member",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "message",
        "type": "string"
      }
    ],
    "name": "EndCourse",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "message",
        "type": "string"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "member",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "course",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "time",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "punchDays",
        "type": "uint256"
      }
    ],
    "name": "PunchClock",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_name",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "_avator",
        "type": "string"
      }
    ],
    "name": "NewMember",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_now",
        "type": "uint256"
      },
      {
        "name": "_before",
        "type": "uint256"
      }
    ],
    "name": "checkDateDifferent",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_now",
        "type": "uint256"
      },
      {
        "name": "_before",
        "type": "uint256"
      }
    ],
    "name": "checkDateInterval",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "courseIdToCreator",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "courses",
    "outputs": [
      {
        "name": "author",
        "type": "string"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "description",
        "type": "string"
      },
      {
        "name": "courseDays",
        "type": "uint256"
      },
      {
        "name": "courseFee",
        "type": "uint256"
      },
      {
        "name": "coverImage",
        "type": "string"
      },
      {
        "name": "createTime",
        "type": "uint256"
      },
      {
        "name": "courseType",
        "type": "uint8"
      },
      {
        "name": "feeTpye",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getBookCourseLength",
    "outputs": [
      {
        "name": "",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_courseId",
        "type": "uint256"
      }
    ],
    "name": "getCourseById",
    "outputs": [
      {
        "name": "author",
        "type": "string"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "description",
        "type": "string"
      },
      {
        "name": "courseDays",
        "type": "uint256"
      },
      {
        "name": "courseFee",
        "type": "uint256"
      },
      {
        "name": "coverImage",
        "type": "string"
      },
      {
        "name": "createTime",
        "type": "uint256"
      },
      {
        "name": "courseType",
        "type": "uint8"
      },
      {
        "name": "feeType",
        "type": "uint8"
      },
      {
        "name": "isbook",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getCourseLength",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_courseId",
        "type": "uint256"
      }
    ],
    "name": "getCourseRecordById",
    "outputs": [
      {
        "name": "punchDays",
        "type": "uint256"
      },
      {
        "name": "startTime",
        "type": "uint256"
      },
      {
        "name": "lastPunchTime",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "getDay",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "month",
        "type": "uint8"
      },
      {
        "name": "year",
        "type": "uint16"
      }
    ],
    "name": "getDaysInMonth",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "getHour",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getMemberInfo",
    "outputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "avatar",
        "type": "string"
      },
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "getMinute",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "getMonth",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "getSecond",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getTotalBalance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "getWeekday",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "getYear",
    "outputs": [
      {
        "name": "",
        "type": "uint16"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "year",
        "type": "uint16"
      }
    ],
    "name": "isLeapYear",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isMemberOf",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "year",
        "type": "uint256"
      }
    ],
    "name": "leapYearsBefore",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "token",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "year",
        "type": "uint16"
      },
      {
        "name": "month",
        "type": "uint8"
      },
      {
        "name": "day",
        "type": "uint8"
      },
      {
        "name": "hour",
        "type": "uint8"
      },
      {
        "name": "minute",
        "type": "uint8"
      }
    ],
    "name": "toTimestamp",
    "outputs": [
      {
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "year",
        "type": "uint16"
      },
      {
        "name": "month",
        "type": "uint8"
      },
      {
        "name": "day",
        "type": "uint8"
      },
      {
        "name": "hour",
        "type": "uint8"
      }
    ],
    "name": "toTimestamp",
    "outputs": [
      {
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "year",
        "type": "uint16"
      },
      {
        "name": "month",
        "type": "uint8"
      },
      {
        "name": "day",
        "type": "uint8"
      }
    ],
    "name": "toTimestamp",
    "outputs": [
      {
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "year",
        "type": "uint16"
      },
      {
        "name": "month",
        "type": "uint8"
      },
      {
        "name": "day",
        "type": "uint8"
      },
      {
        "name": "hour",
        "type": "uint8"
      },
      {
        "name": "minute",
        "type": "uint8"
      },
      {
        "name": "second",
        "type": "uint8"
      }
    ],
    "name": "toTimestamp",
    "outputs": [
      {
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "pure",
    "type": "function"
  }
];

export {
  address,
  ABI
};
