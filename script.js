let countries = [];
   

// API'den ülke çekme.
async function fetchCountries() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca2');
    const data = await response.json();
    // Bayrağı ve isim bilgisi olan ülkeleri filtreleme.
    countries = data.filter(country => 
      country.flags && country.flags.png && country.name && country.name.common
    );
    startGame();
  } catch (error) {
    console.error('Ülkeler çekilemedi:', error);
  }
}

function startGame() {
  score = 0;
  nextRound();
}


function nextRound() {
  document.getElementById('result').textContent = '';
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';

  // Rastgele doğru ülkeyi seç.
  const correctIndex = Math.floor(Math.random() * countries.length);
  const correctCountry = countries[correctIndex];

  // Seçilen ülkenin bayrağını göster.
  document.getElementById('flag').src = correctCountry.flags.png;

  // 4 seçenek oluştur.
  let options = [correctCountry.name.common];
  while (options.length < 4) {
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    if (!options.includes(randomCountry.name.common)) {
      options.push(randomCountry.name.common);
    }
  }
  options = shuffleArray(options);

  // Seçenek butonlarını oluştur.
  options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.className = 'option-button';
    button.addEventListener('click', () => checkAnswer(option, correctCountry.name.common));
    optionsDiv.appendChild(button);
  });
}
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Kullanıcının cevabını kontrol eden fonksiyon.
function checkAnswer(selected, correct) {
  const resultDiv = document.getElementById('result');
  if (selected === correct) {
    score++;
    resultDiv.textContent = 'Doğru! 🎉';
  } else {
    resultDiv.textContent = `Yanlış! Doğru cevap: ${correct}`;
  }
 
  setTimeout(nextRound, 1000);
}

fetchCountries();

