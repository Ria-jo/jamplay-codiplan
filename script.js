// ver6.3 (web) — Timetable generator (front-end only)

// 버튼 이벤트 등록
document
  .getElementById('btn-generate')
  .addEventListener('click', generateTimetable);
document.getElementById('btn-clear').addEventListener('click', () => {
  document.getElementById('tables').innerHTML = '';
});
document.getElementById('btn-download').addEventListener('click', downloadPNG);

function generateTimetable() {
  const num5 = parseInt(document.getElementById('num5').value || '0', 10);
  const num6 = parseInt(document.getElementById('num6').value || '0', 10);
  const num7 = parseInt(document.getElementById('num7').value || '0', 10);

  const dayChecks = [
    ...document.querySelectorAll('.days input[type="checkbox"]'),
  ];
  const days = dayChecks.filter((chk) => chk.checked).map((chk) => chk.value);

  if (days.length === 0) {
    alert('수업 가능한 요일을 하나 이상 선택하세요.');
    return;
  }

  const tables = document.getElementById('tables');
  tables.innerHTML = '';

  const slots = ['1교시', '2교시', '3교시', '4교시'];
  const instr6 = ['카니', '페니', '카니', '로니'];
  const instr7 = ['페니', '카니', '로니', '카니'];

  let alerted = false;

  for (let w = 1; w <= 4; w++) {
    const weekEl = document.createElement('section');
    weekEl.className = 'week';

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = `주간 시간표 (${w}주차)`;
    weekEl.appendChild(title);

    const wrap = document.createElement('div');
    wrap.className = 'table-wrap';

    const table = document.createElement('table');

    // 헤더 행
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    const th0 = document.createElement('th');
    th0.textContent = '';
    th0.className = 'label';
    headRow.appendChild(th0);
    days.forEach((d) => {
      const th = document.createElement('th');
      th.textContent = d;
      th.className = 'label';
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    // 빈 4x(days) 그리드
    const grid = Array.from({ length: slots.length }, () =>
      Array.from({ length: days.length }, () => '')
    );

    // 주차별 강사 배정 규칙 반영 (GAS와 동일)
    const classList = [];
    for (let i = 1; i <= num5; i++) classList.push(`5세 ${i}반 (카니)`);
    for (let i = 1; i <= num6; i++)
      classList.push(`6세 ${i}반 (${instr6[w - 1]})`);
    for (let i = 1; i <= num7; i++)
      classList.push(`7세 ${i}반 (${instr7[w - 1]})`);

    // 왼쪽→오른쪽, 위→아래 순으로 채우기 (GAS의 r/c 계산과 동일)
    classList.forEach((cls, idx) => {
      const r = Math.floor(idx / days.length);
      const c = idx % days.length;
      if (r < slots.length && c < days.length) grid[r][c] = cls;
    });

    // 바디 빌드
    for (let r = 0; r < slots.length; r++) {
      const tr = document.createElement('tr');
      const label = document.createElement('td');
      label.textContent = slots[r];
      label.className = 'label';
      tr.appendChild(label);
      for (let c = 0; c < days.length; c++) {
        const td = document.createElement('td');
        td.textContent = grid[r][c] || '';
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    wrap.appendChild(table);
    weekEl.appendChild(wrap);
    tables.appendChild(weekEl);

    // 경고 로직: 한 요일에 '카니' 3회 이상이면 1회만 alert
    if (!alerted) {
      for (let c = 0; c < days.length; c++) {
        let cnt = 0;
        for (let r = 0; r < slots.length; r++) {
          if ((grid[r][c] || '').includes('카니')) cnt++;
        }
        if (cnt >= 3) {
          alert(
            '하루 수업 시수가 3회 이상입니다. 카니가 1세트 이상 필요한지 확인이 필요합니다.'
          );
          alerted = true;
          break;
        }
      }
    }
  }
}

// 화면의 시간표(#tables)를 PNG로 저장
async function downloadPNG() {
  const target = document.getElementById('tables');
  if (!target || !target.firstChild) {
    alert('먼저 시간표를 생성하세요.');
    return;
  }

  // 해상도 선명하게(scale 2) + 흰 배경
  const canvas = await html2canvas(target, {
    scale: 2,
    backgroundColor: '#ffffff',
    useCORS: true,
  });

  const link = document.createElement('a');
  link.download = 'timetable.png';
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link); // iOS/Safari 대응
  link.click();
  link.remove();
}
