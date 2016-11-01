/* This program is free software. It comes without any warranty, to
the extent permitted by applicable law. You can redistribute it
and/or modify it under the terms of the Do What The Fuck You Want
To Public License, Version 2, as published by Sam Hocevar. See
http://www.wtfpl.net/ for more details. */

pragma solidity ^0.4.4;

contract continuity{
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
    /// inactivityTime is the number of seconds to be considered inactive.
    function continuity(uint256 _timeBeforeInactivity, uint256 _timeToClaim) {
        owner=msg.sender;
        timeBeforeInactivity=_timeBeforeInactivity;
        timeToClaim=_timeToClaim;
        lastTimePing=now;
    }
    
    /// Ping the contract without doing anything else.
    function ping() onlyOwner() {} 
    
    /// Change the time before the owner will be considered inactive.
    function changeTimeBeforeInactivity(uint256 _timeBeforeInactivity) onlyOwner { timeBeforeInactivity=_timeBeforeInactivity; }
    
    /// Change the time to claim.
    function changeToClaim(uint256 _timeToClaim) onlyOwner { timeToClaim=_timeToClaim; }
    
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

    /// Change the rank of beneficiary. If the beneficiary is new, it is added to the list.
    /// A rank of 0 indicates someone out of the beneficiary list.
    /// A rank > 0 indicates the order in the beneficiary list (i.e 1 is the one with the highest priority).
    function changeRank(address beneficiary, uint256 rank) onlyOwner { 
        beneficiaries[beneficiary]=rank; 
        BeneficiaryChange(beneficiary, rank);
    }
    
    /// Return true if the owner is inactive for at least.
    function inactive() constant returns (bool) {
        if (now < lastTimePing + timeBeforeInactivity) // Not enough time since last ping
            return false;
        if (lastTimePing + timeBeforeInactivity < lastTimePing) // Overflow
            return false;
        return true; // If nothing is wrong, the owner is inactive.
    }
    
    /// Claim the control of the contract
    function claim() {
        if (!inactive()) // Verify that the owner is inactive
            throw;
        if (beneficiaries[msg.sender]==0) // Verify that the claimer is a beneficiary
            throw; 
        if (beneficiaries[msg.sender]>lowestRank) // Someone with a lower rank already made a claim
            throw;
        if (lowestRank==0) // We are the first one claiming
            timeFirstClaim=now;
        lowestRank=beneficiaries[msg.sender];
        lowestClaimer=msg.sender;
        Claim(lowestClaimer,lowestRank);
    }
    
    /// Return true if we can execute the claim.
    function canExecuteClaim() constant returns (bool) {
        if (now < timeFirstClaim + timeBeforeInactivity) // Not enough time since the first claim
            return false;
        if (timeFirstClaim + timeBeforeInactivity < timeFirstClaim) // Overflow
            return false;
        if (lowestClaimer==0) // No one has made a claim yet
            return false;
        return true;
    }
    
    /// Execute the claim and change the control of the contract
    /// Anyone can execute it. This is made on purpose in order to deal with the possibility that the lowestClaimer dies after its claim but before executing it.
    /// WARNING: This does not clean the list of beneficiaries.
    /// After claiming a contract, you can:
    /// -Move the ether and other tokens.
    /// -Clean manually the list of beneficiaries (you can find it from event logs).
    function excecuteClaim() {
        if (!canExecuteClaim()) // Verify that we can execute the claim
            throw;
        owner=lowestClaimer; // Change the ownership of the contract
        lowestClaimer=0; // No one is claiming anymore
        lowestRank=0;
        lastTimePing=now; // Update the last ping
    }
    
    /// Fallback, allow receiving ether without doing anything else.
    function () payable {} // Accept funds transferts

}
