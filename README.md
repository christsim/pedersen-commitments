# pedersen-commitments
Implementation of pedersen commitments in node.js.

These commitments are used to commit to a value now, but not reveal the actual value til later (or never).

Commitments can then be added together or subtracted from each other using homomorphic encryption without revealing the values committed to.

For example, lets say Alice wants to send Bob some private coins:
 - Alice has already committed to a balance of *a* using function:
     - Where H is a random point on the curve chosen for this system
     - ra is the blinding factor used to hide the transaction
     
```
    Ca = perdersen.commitTo(H, ra, a);
```
 - Bob has also committed to a balance of *b*:

 ```
    Cb = perdersen.commitTo(H, rb, b);
 ```
 - Alice commits to send bob *t* coins.  

 ```
    Ct = perdersen.commitTo(H, rt, t);
 ```
 - To conserve the total number of coins in the system, Alice's balance needs to be decreased by *t* and Bob's balance need to increase by *t*.  
    - This will allow any third party looking at the system to conclude that no coins were created or destroyed. (however, this does not cater for negative numbers, which need to be handled in a difference way)
 - Now we can use the homomorphic encryption properties to elliptic curve add and subtract from the original committed balances:
 
 ```
    var Caf = pedersen.subCommitments(Ca, Ct);
    var Cbf = pedersen.addCommitments(Cb, Ct);
 ```
- Now that we have the final balances of both parties we can verify
that their balances are correct by privately checking it with:
    - Where ra, rb and rt are the private blinding keys
```
    pedersen.verifyCommitment(H, Caf, ra.sub(rt), a - t);
    pedersen.verifyCommitment(H, Cbf, rb.add(rt), b + t);
```

Alice and Bob's balances are now completely hidden from prying eyes.  We are also convinced that no coins were added or removed from the ecosystem.  However, we still don't know if the balances and transfer amount are negative.  A further proof needs to be added to the commitment to prove that all values are positive.






