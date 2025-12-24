document.onkeydown = function (e) {
  // Mencegah F12 (Inspect Element)
  if (e.keyCode == 123) {
    return false;
  }
  // Mencegah CTRL + U (Lihat Sumber)
  if (e.ctrlKey && e.keyCode == 85) {
    return false;
  }
  // Mencegah CTRL + I (Inspect)
  if (e.ctrlKey && e.keyCode == 73) {
    return false;
  }
};

// Mencegah Klik Kanan
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});
