function getUniqueId(realm) {
    // Generate a simple hash (Adler-32)
    let a = 1,
      b = 0;
    for (let i = 0; i < realm.length; i++) {
      a = (a + realm.charCodeAt(i)) % 65521;
      b = (b + a) % 65521;
    }
    const adler32 = (b << 16) | a;
    // Convert hash to base-36 and pad to 5 characters
    return adler32.toString(36).padStart(32, '0').slice(-32);
  }

  const crypto = require('crypto');

  function getUniqueId32(realm) {
    const MOD = 65521; // Adler-32 modulus
    let a = 1,
      b = 0;
  
    // Generate Adler-32 hash
    for (let i = 0; i < realm.length; i++) {
      a = (a + realm.charCodeAt(i)) % MOD;
      b = (b + a) % MOD;
    }
  
    const adler32 = (b << 16) | a;
  
    // Use the Adler-32 hash to create a 32-character key
    let result = adler32.toString(36); // Convert to base-36
    while (result.length < 32) {
      // Keep extending the hash by rehashing
      result += crypto
        .createHash('sha256')
        .update(result)
        .digest('hex')
        .slice(0, 32 - result.length);
    }
  
    return result.slice(0, 32); // Ensure it's exactly 32 characters
  }

  console.log(getUniqueId32("tennat-1"));
  console.log(getUniqueId32("tennat-1"));
  console.log(getUniqueId32("tennat-1"));
  console.log("");
  console.log(getUniqueId32("tennat-2"));
  console.log(getUniqueId32("tennat-2"));
  console.log(getUniqueId32("tennat-2"));
  console.log("");
  console.log(getUniqueId32("tennat-3"));
  console.log(getUniqueId32("tennat-3"));
  console.log(getUniqueId32("tennat-3"));
  console.log("");
  console.log(getUniqueId32("tennat-4"));
  console.log(getUniqueId32("tennat-4"));
  console.log(getUniqueId32("tennat-4"));
  console.log("");
  console.log(getUniqueId32("tennat-1"));
  console.log(getUniqueId32("tennat-1"));
  console.log(getUniqueId32("tennat-1"));
  console.log(getUniqueId32("tennat-2").length);

  console.log(getUniqueId32("tennat-2") === getUniqueId32("tennat-2"));
  console.log(getUniqueId32("tennat-2") === getUniqueId32("tennat-1"));
  console.log(getUniqueId32("tennat-1") === getUniqueId32("tennat-1"));


  console.log(getUniqueId32("aheevaccs-salt"));
  console.log(getUniqueId32("aheevaccs-salt").slice(0, 16));
  console.log(getUniqueId32("aheevaccs-salt").slice(0, 16).length);