/* This program is free software. It comes without any warranty, to
the extent permitted by applicable law. You can redistribute it
and/or modify it under the terms of the Do What The Fuck You Want
To Public License, Version 2, as published by Sam Hocevar. See
http://www.wtfpl.net/ for more details. */

pragma solidity ^0.4.2;

contract continuity{
    address public owner;
    uint256 public lastPing;
    uint256 public timeBeforeInactivity; // Time 
    uint256 constant maxTime=2**250;
    
    struct Beneficiary{
        address addr; // Beneficiary address
        uint256 timeAfterInactivity; // Number of seconds required after the owner is inactive to allow the beneficiary take control of the contract
    }
    
    Beneficiary[] public beneficiaries;
    
    // Verify that the function is called by the owner and update lastPing.
    modifier onlyOwner() {
        if (msg.sender!=owner)
            throw;
        _;
        lastPing=now; // Always set lastPing when the owner interacts with the contract;
    }
    
    /// Contract creation.
    /// inactivityTime is the number of seconds to be considered inactive
    function continuity(uint256 inactivityTime) {
        owner=msg.sender;
        changeTimeBeforeInactivity(inactivityTime); // Ask a time before inactivity when creating the contract in order to avoid the mistake of setting beneficiaries before it.
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
    function () payable {} // Accept funds transferts

}
