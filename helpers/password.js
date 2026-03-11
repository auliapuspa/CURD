import bcrypt from "bcryptjs";  //library bcryptjs digunakan untuk hashing password.

const hash = async (password) => {  //mendefinisikan function async bernama hash yang menerima parameter password.
  const salt = await bcrypt.genSalt(10); //menghasilkan salt dengan menggunakan bcrypt.genSalt() dan menetapkan jumlah putaran hashing menjadi 10.
  return await bcrypt.hash(password, salt); //mengembalikan hasil hashing password dengan menggunakan bcrypt.hash() yang menggabungkan password dan salt yang dihasilkan sebelumnya.
};

const compare = async (password, hashedPassword) => { //mendefinisikan function compare yang menerima dua parameter: password (password yang akan dibandingkan) dan hashedPassword (password yang sudah di-hash).
  const isMatch = await bcrypt.compare(password, hashedPassword); //mengembalikan hasil perbandingan antara password yang diberikan dan hashedPassword menggunakan bcrypt.compare().
  return isMatch;
}

export default { hash, compare }; //mengekspor kedua function hash dan compare agar dapat digunakan di file lain dalam proyek.