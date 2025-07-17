const express = require('express');
const app = express();
const PORT = 3000;

// 현재 시간 기반으로 스쿨존 시간인지 판단
function isSchoolZoneTime() {
  const now = new Date();
  const hour = now.getHours();
  const weekday = now.getDay(); // 일=0, 월=1, ..., 토=6

  return (weekday >= 1 && weekday <= 5) && ((hour >= 8 && hour <= 9) || (hour >= 13 && hour <= 16));
}

// 정적 파일 제공 (index.html 포함)
app.use(express.static(__dirname + '/public'));

// API 엔드포인트
app.get('/api/check', (req, res) => {
  const isSchool = isSchoolZoneTime();
  res.json({ isSchoolZoneTime: isSchool });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중`);
});
