function getUniqueBookName(bookName) {
  let MathNumber = Math.random(1000000000000000);

  let randomBookName = bookName.replace(" ", "") + MathNumber;

  return randomBookName;
}

export { getUniqueBookName };

// string functions

// trim    => trailing spaces removal  (start and end  koi space h to wo remove hojygi )
// strip  => new trimmer h (spaceBar, Tabs ke spaces , etc )
// replace => tell it what to change into what  ("q", 'm')
