const keygen = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  
  let block = "";
  for (let i = 0; i < 16; i++) {
    block += chars[Math.floor(Math.random() * chars.length)];
  }
  
  return block;
}

module.exports = keygen;