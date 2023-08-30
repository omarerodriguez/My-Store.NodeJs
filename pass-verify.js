const bcrypt = require('bcrypt');

async function verifyPassword(){
  const myPassword = "admin 123 .202";
  const hash = '$2b$10$QlNc/SQ2t7c/InmaqDCrU.YUVdvKA5.JewHQzxmONQf.oktNJEqmG';
  const isMatch = await bcrypt.compare(myPassword,hash);
  console.log(isMatch);
}

verifyPassword();
