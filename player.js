// 화면 요소 한 번만 잡기
const sentenceEl = document.getElementById('sentence');


// 상태 (아주 최소)
let sentences = [];
let currentIndex = 0;

// 문장 데이터 로드
fetch('sentences.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // 1. 데이터 저장
    sentences = data;

    // 2. 첫 문장 화면에 표시
    render();
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

 


// 화면 그리기 (render는 DOM만 만진다)
function render() {
  if (sentences.length === 0) return;

  sentenceEl.textContent = sentences[currentIndex].text;
}

function nextSentence() {
  if (currentIndex < sentences.length - 1) {
    currentIndex++;
    render();
  }
}
function prevSentence(){
  if (currentIndex > 0 ){
    currentIndex--;
    render();
  }
}

document.getElementById('nextBtn').addEventListener('click', nextSentence);
document.getElementById('prevBtn').addEventListener('click', prevSentence)






