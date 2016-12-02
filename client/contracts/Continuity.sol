/* This program is free software. It comes without any warranty, to
the extent permitted by applicable law. You can redistribute it
and/or modify it under the terms of the Do What The Fuck You Want
To Public License, Version 2, as published by Sam Hocevar. See
http://www.wtfpl.net/ for more details. */

pragma solidity ^0.4.4;

contract Continuity{
    address public owner;

    uint256 public lastTimePing;
    uint256 public timeBeforeInactivity; // Number of seconds to be considered inactive
    uint256 public timeToClaim; // Number of seconds starting with the first claim
    uint256 public timeFirstClaim; // Time of the first claim
    uint256 public lowestRank=0; // Lowest rank of the claimers
    address public lowestClaimer; // Address of the claimer with the lowest rank
    mapping(address => uint256) public beneficiaries;

    event BeneficiaryChange (
        address beneficiary,
        uint256 rank
    );

    event Claim (
        address claimer,
        uint256 rank
    );

    // Verify that the function is called by the owner and update lastPing.
    modifier onlyOwner() {
        if (msg.sender!=owner)
            throw;
        _;
        lastTimePing=now; // Always set lastTimePing when the owner interacts with the contract
    }

    /// Contract creation.
    /// inactivityTime is the number of seconds to be considered inactive
    function Continuity(uint256 inactivityTime) {
        owner=msg.sender;
        timeBeforeInactivity=_timeBeforeInactivity;
        timeToClaim=_timeToClaim;
        lastTimePing=now;
    }

    /// Ping the contract without doing anything else.
    function ping() onlyOwner() {}

    /// Change the time before the owner will be considered inactive
    function changeTimeBeforeInactivity(uint256 r) onlyOwner{
        checkReasonableValue(r); // Incoherent values are forbidden to avoid overflow
        timeBeforeInactivity=r;

    }

    /// Withdrow amount wei.
    function withdraw(uint amount) onlyOwner {
        // With amount wei to the owner
        if (!owner.send(amount))
            throw;
    }

    /// Execute a call to recipient sending amount wei.
    /// transactionData contains binary data to specify the function to be called and the argument for more info see Ethereum ABI.
    function execute(address recipient,uint amount,bytes transactionData) onlyOwner {
        // With amount wei to the owner
         if (!recipient.call.value(amount)(transactionData))
                throw;
    }

    /// Forbid very high values to unsure that it is impossible to overflow.
    function checkReasonableValue(uint256 v) private {
        if (v>maxTime)
            throw;
    }

    /// Add the address addr to the list of beneficiaries.
    /// It will be able to take control of the contract timeAfterInactivity after the owner is inactive.
    function addBeneficiary(address addr,uint256 timeAfterInactivity) onlyOwner {
        checkReasonableValue(timeAfterInactivity); // Incoherent values are forbidden to avoid overflow
        beneficiaries.push(Beneficiary(addr,timeAfterInactivity));
    }

    /// Change the timeAfterInactivity, amount of seconds needed after the owner is inactive to take control of the contract.
    /// beneficiaryID is the position of the beneficiary in the beneficiary list.
    function changeTimeAfterInactivity(uint beneficiaryID, uint256 timeAfterInactivity) onlyOwner {
        checkReasonableValue(timeAfterInactivity);
        beneficiaries[beneficiaryID].timeAfterInactivity=timeAfterInactivity;
    }

    /// Remove the beneficiary at position beneficiaryID.
    function removeBeneficiary(uint beneficiaryID) onlyOwner {
        beneficiaries[beneficiaryID].timeAfterInactivity=maxTime; // Put the time at the maxTime (which will never be reached)
    }

    /// Take control of the contract.
    /// beneficiaryID is your position in the beneficiary list.
    function claim(uint beneficiaryID) {
        if (beneficiaries[beneficiaryID].addr!=msg.sender)
            throw; // The beneficiary is not the good one
        if (lastPing+timeBeforeInactivity+beneficiaries[beneficiaryID].timeAfterInactivity > now)
            throw; // Funds can't be inactivityd yet

        owner=msg.sender; // Take possesion of the contract
        lastPing=now;
    }

    /// Fallback, allow receiving ether without doing anything else.
    /*function () payable {} // Accept funds transferts*/

}
