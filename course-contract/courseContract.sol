// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ownable {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.
     */
    constructor(address initialOwner) {
        _transferOwnership(initialOwner);
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(owner() == msg.sender);
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(owner() == msg.sender);
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

contract CourseContract is Ownable {

    struct Payment {
        address user;
        string email;
        uint256 amount;
    }

    struct Course {
        uint courseFee;
        Payment[] payments;
    }

    mapping(uint => Course) public courses;  // Mapping courseId to Course struct
    uint public courseCount = 0;             // To keep track of the number of courses

    event PaymentMade(uint indexed courseId, address indexed user, string email, uint256 amount);
    event CourseCreated(uint indexed courseId, uint256 courseFee);

    constructor() Ownable(msg.sender) {}

    // Function to create a new course with a specific fee
    function createCourse(uint _courseFee) external onlyOwner {
        courses[courseCount].courseFee = _courseFee;
        emit CourseCreated(courseCount, _courseFee);
        courseCount++;
    }

    // Function to withdraw contract balance
    function withdraw() external payable onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    // Function to pay for a specific course by providing courseId
    function payForCourse(uint _courseId, string memory _email) external payable {
        require(
            msg.value == courses[_courseId].courseFee,
            "Payment must be equal to the course fee"
        );
        courses[_courseId].payments.push(Payment(msg.sender, _email, msg.value));
        emit PaymentMade(_courseId, msg.sender, _email, msg.value);
    }

    // Function to get payments made by a user for a specific course
    function getPaymentsByUser(uint _courseId, address _user) 
        public view returns (Payment[] memory) 
    {
        Course storage course = courses[_courseId];
        uint count = 0;

        for (uint i = 0; i < course.payments.length; i++) {
            if (course.payments[i].user == _user) {
                count++;
            }
        }

        Payment[] memory result = new Payment[](count);
        uint index = 0;

        for (uint i = 0; i < course.payments.length; i++) {
            if (course.payments[i].user == _user) {
                result[index] = course.payments[i];
                index++;
            }
        }

        return result;
    }

    // Function to get all payments for a specific course
    function getAllPayments(uint _courseId) public view returns (Payment[] memory) {
        return courses[_courseId].payments;
    }
}

