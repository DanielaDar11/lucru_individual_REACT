export function salveazaInLocalStorage(nume, scor, istoricCuvinte) {
  const scoruriSalvate = JSON.parse(
    localStorage.getItem("scoruriSalvate") || "[]"
  );

  scoruriSalvate.push({ nume, scor, istoricCuvinte });
  localStorage.setItem("scoruriSalvate", JSON.stringify(scoruriSalvate));
}

export function stergeScorurileSalvate() {
  localStorage.removeItem("scoruriSalvate");
  window.location.reload();
}
