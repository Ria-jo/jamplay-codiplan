function generateTimetable() {
  const timetable = document.getElementById('timetable');
  timetable.innerHTML = `
    <table border="1" style="margin: 0 auto;">
      <tr><th>요일</th><th>수업</th></tr>
      <tr><td>월</td><td>카니</td></tr>
      <tr><td>화</td><td>페니</td></tr>
      <tr><td>수</td><td>카니</td></tr>
      <tr><td>목</td><td>로니</td></tr>
    </table>
  `;
}
