let mediaRecorder;
let audioChunks = [];
let stream; // 전역으로 유지

/**
 * 녹음을 시작하는 비동기 함수
 */
async function startRecording() {
    try {
        // 🔹 녹음 시작할 때마다 초기화
        audioChunks = [];

        // 🔹 전역 stream 변수에 할당 (중요)
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // MediaRecorder 생성
        mediaRecorder = new MediaRecorder(stream);

        // 녹음 데이터 수집
        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        // 녹음 종료 시 처리
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            const audioURL = URL.createObjectURL(audioBlob);

            // 👉 나중에 Replay 버튼에서 재생할 수 있도록 저장
            window.recordedAudioURL = audioURL;

            console.log("녹음 완료:", audioURL);
        };

        // 녹음 시작
        mediaRecorder.start();
        console.log("녹음이 시작되었습니다.");

    } catch (err) {
        console.error("마이크 접근 오류:", err);
        alert("마이크 접근 권한이 필요합니다.");
    }
}

/**
 * 녹음을 중지하는 함수
 */
function stopRecording() {
    // MediaRecorder 중지
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
        console.log("레코더가 중지되었습니다.");
    }

    // 마이크 스트림 정리 (OS 표시 제거)
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
        console.log("미디어 스트림 트랙이 중지되었습니다.");
    }
}

// 버튼 연결 예시
document.getElementById('recordBtn').addEventListener('click', startRecording);
document.getElementById('stopBtn').addEventListener('click', stopRecording);
