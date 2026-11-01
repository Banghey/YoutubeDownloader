(() => {
  const { units, events } = window.WORLD_HISTORY;
  const unitMap = Object.fromEntries(units.map((u) => [u.id, u]));

  const YEAR_MIN = -12000;
  const YEAR_MAX = 2030;
  const BASE_WIDTH = 3200;

  const rail = document.getElementById("rail");
  const railScroll = document.getElementById("railScroll");
  const eraTrack = document.getElementById("eraTrack");
  const tickTrack = document.getElementById("tickTrack");
  const eventTrack = document.getElementById("eventTrack");
  const nowMarker = document.getElementById("nowMarker");
  const detailInner = document.getElementById("detailInner");
  const unitFilter = document.getElementById("unitFilter");
  const unitChips = document.getElementById("unitChips");
  const unitList = document.getElementById("unitList");
  const zoomLabel = document.getElementById("zoomLabel");

  let zoom = 1;
  let activeId = null;
  let filterUnit = "all";

  /* 선사~고대는 압축, 근현대는 넓게 — 수업용으로 읽기 쉬운 비선형 스케일 */
  function yearToRatio(year) {
    const clamped = Math.max(YEAR_MIN, Math.min(YEAR_MAX, year));
    const anchors = [
      { y: -12000, r: 0 },
      { y: -3500, r: 0.08 },
      { y: -500, r: 0.2 },
      { y: 500, r: 0.34 },
      { y: 1000, r: 0.44 },
      { y: 1500, r: 0.56 },
      { y: 1800, r: 0.68 },
      { y: 1914, r: 0.8 },
      { y: 1945, r: 0.88 },
      { y: 2030, r: 1 }
    ];

    for (let i = 0; i < anchors.length - 1; i += 1) {
      const a = anchors[i];
      const b = anchors[i + 1];
      if (clamped >= a.y && clamped <= b.y) {
        const t = (clamped - a.y) / (b.y - a.y);
        return a.r + t * (b.r - a.r);
      }
    }
    return 1;
  }

  function yearToX(year) {
    return yearToRatio(year) * BASE_WIDTH * zoom;
  }

  function formatYear(year) {
    if (year < 0) return `기원전 ${Math.abs(year).toLocaleString("ko-KR")}년경`;
    return `${year.toLocaleString("ko-KR")}년`;
  }

  function formatRange(start, end) {
    if (end == null || end === start) return formatYear(start);
    return `${formatYear(start)} ~ ${formatYear(end)}`;
  }

  function railWidth() {
    return BASE_WIDTH * zoom;
  }

  function buildUnitsUI() {
    units.forEach((unit) => {
      const option = document.createElement("option");
      option.value = String(unit.id);
      option.textContent = `${unit.id}. ${unit.title}`;
      unitFilter.appendChild(option);

      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.style.setProperty("--chip", unit.color);
      chip.textContent = `${unit.id}단원`;
      chip.title = unit.title;
      chip.addEventListener("click", () => {
        filterUnit = String(unit.id);
        unitFilter.value = filterUnit;
        syncFilterUI();
        renderEvents();
        scrollToUnit(unit.id);
      });
      unitChips.appendChild(chip);

      const item = document.createElement("li");
      item.className = "unit-item";
      item.style.setProperty("--unit", unit.color);
      item.innerHTML = `
        <div class="unit-num">${unit.id}</div>
        <div>
          <h3>${unit.title}</h3>
          <p>${unit.summary}</p>
          <span class="unit-range">${unit.range}</span>
        </div>
      `;
      item.addEventListener("click", () => {
        filterUnit = String(unit.id);
        unitFilter.value = filterUnit;
        syncFilterUI();
        renderEvents();
        document.getElementById("timelineSection").scrollIntoView({ behavior: "smooth", block: "center" });
        scrollToUnit(unit.id);
      });
      unitList.appendChild(item);
    });

    const allChip = document.createElement("button");
    allChip.type = "button";
    allChip.className = "chip active";
    allChip.dataset.all = "1";
    allChip.textContent = "전체";
    allChip.addEventListener("click", () => {
      filterUnit = "all";
      unitFilter.value = "all";
      syncFilterUI();
      renderEvents();
    });
    unitChips.prepend(allChip);
  }

  function syncFilterUI() {
    [...unitChips.querySelectorAll(".chip")].forEach((chip) => {
      if (chip.dataset.all === "1") {
        chip.classList.toggle("active", filterUnit === "all");
      } else {
        const id = chip.textContent.replace("단원", "");
        chip.classList.toggle("active", filterUnit === id);
      }
    });
  }

  function buildEras() {
    const eras = [
      { unit: 2, start: YEAR_MIN, end: 500, title: "고대 세계" },
      { unit: 3, start: 500, end: 1300, title: "종교·지역 문화" },
      { unit: 4, start: 1300, end: 1750, title: "교류와 변화" },
      { unit: 5, start: 1750, end: 1914, title: "국민 국가·제국주의" },
      { unit: 6, start: 1914, end: 1945, title: "세계 대전" },
      { unit: 7, start: 1945, end: YEAR_MAX, title: "현대 세계" }
    ];

    eraTrack.innerHTML = "";
    eras.forEach((era) => {
      const left = yearToX(era.start);
      const width = Math.max(40, yearToX(era.end) - left);
      const seg = document.createElement("div");
      seg.className = "era-seg";
      seg.dataset.unit = String(era.unit);
      seg.style.flex = `0 0 ${width}px`;
      seg.style.width = `${width}px`;
      seg.style.background = `linear-gradient(160deg, ${unitMap[era.unit].color}, color-mix(in srgb, ${unitMap[era.unit].color} 65%, #0f201a))`;
      seg.innerHTML = `<span>${era.title}</span>`;
      eraTrack.appendChild(seg);
    });
  }

  function buildTicks() {
    const years = [-10000, -3000, -500, 1, 500, 1000, 1500, 1800, 1900, 1945, 2000, 2026];
    tickTrack.innerHTML = "";
    years.forEach((y) => {
      const x = yearToX(y);
      const tick = document.createElement("div");
      tick.className = "tick";
      tick.style.left = `${x}px`;
      tickTrack.appendChild(tick);

      const label = document.createElement("div");
      label.className = "tick-label";
      label.style.left = `${x}px`;
      label.textContent = y < 0 ? `BC ${Math.abs(y)}` : String(y);
      tickTrack.appendChild(label);
    });
  }

  function renderEvents() {
    eventTrack.innerHTML = "";
    const sorted = [...events].sort((a, b) => a.year - b.year);

    sorted.forEach((ev, index) => {
      const unit = unitMap[ev.unit];
      const visible = filterUnit === "all" || Number(filterUnit) === ev.unit;
      const mid = ev.endYear != null ? (ev.year + ev.endYear) / 2 : ev.year;
      const x = yearToX(mid);

      if (ev.endYear != null) {
        const span = document.createElement("div");
        span.className = "event-span";
        span.style.setProperty("--span", unit.color);
        span.style.left = `${yearToX(ev.year)}px`;
        span.style.width = `${Math.max(8, yearToX(ev.endYear) - yearToX(ev.year))}px`;
        if (!visible) span.style.opacity = "0.12";
        eventTrack.appendChild(span);
      }

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `event-dot${visible ? "" : " hidden"}`;
      btn.style.setProperty("--dot", unit.color);
      btn.style.left = `${x}px`;
      btn.style.top = `${42 + (index % 3) * 8}px`;
      btn.dataset.id = ev.id;
      btn.innerHTML = `<div class="pin"></div><span class="name">${ev.label}</span>`;
      btn.setAttribute("aria-label", `${ev.title}, ${formatRange(ev.year, ev.endYear)}`);
      btn.addEventListener("click", () => selectEvent(ev.id, true));
      if (activeId === ev.id) btn.classList.add("active");
      eventTrack.appendChild(btn);
    });

    [...eraTrack.children].forEach((seg) => {
      const match = filterUnit === "all" || seg.dataset.unit === filterUnit;
      seg.classList.toggle("dim", !match);
    });

    nowMarker.style.left = `${yearToX(2026)}px`;
  }

  function selectEvent(id, scroll) {
    activeId = id;
    const ev = events.find((e) => e.id === id);
    if (!ev) return;
    const unit = unitMap[ev.unit];

    detailInner.innerHTML = `
      <p class="detail-kicker" style="color:${unit.color}">${ev.unit}단원 · ${unit.title}</p>
      <h2 class="detail-title">${ev.title}</h2>
      <p class="detail-year">${formatRange(ev.year, ev.endYear)}</p>
      <p class="detail-summary">${ev.summary}</p>
      <ul class="keywords" style="--tag:${unit.color}">
        ${ev.keywords.map((k) => `<li>${k}</li>`).join("")}
      </ul>
    `;

    [...eventTrack.querySelectorAll(".event-dot")].forEach((dot) => {
      dot.classList.toggle("active", dot.dataset.id === id);
    });

    if (scroll) {
      const mid = ev.endYear != null ? (ev.year + ev.endYear) / 2 : ev.year;
      centerOnX(yearToX(mid));
    }
  }

  function centerOnX(x) {
    const target = x - railScroll.clientWidth / 2 + 24;
    railScroll.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }

  function scrollToUnit(unitId) {
    const first = events.find((e) => e.unit === unitId);
    if (!first) return;
    centerOnX(yearToX(first.year));
    selectEvent(first.id, false);
  }

  function applyZoom(next) {
    const prevZoom = zoom;
    const center =
      (railScroll.scrollLeft + railScroll.clientWidth / 2) / (railWidth() || 1);
    zoom = Math.max(0.6, Math.min(2.4, next));
    zoomLabel.textContent = `${Math.round(zoom * 100)}%`;
    layout();
    railScroll.scrollLeft = center * railWidth() - railScroll.clientWidth / 2;
    if (prevZoom !== zoom && activeId) {
      const ev = events.find((e) => e.id === activeId);
      if (ev) {
        const mid = ev.endYear != null ? (ev.year + ev.endYear) / 2 : ev.year;
        centerOnX(yearToX(mid));
      }
    }
  }

  function layout() {
    rail.style.width = `${railWidth()}px`;
    buildEras();
    buildTicks();
    renderEvents();
  }

  /* 드래그로 막대 이동 */
  let dragging = false;
  let startX = 0;
  let startScroll = 0;

  railScroll.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".event-dot")) return;
    dragging = true;
    railScroll.classList.add("dragging");
    startX = e.clientX;
    startScroll = railScroll.scrollLeft;
    railScroll.setPointerCapture(e.pointerId);
  });

  railScroll.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    railScroll.scrollLeft = startScroll - (e.clientX - startX);
  });

  const endDrag = () => {
    dragging = false;
    railScroll.classList.remove("dragging");
  };

  railScroll.addEventListener("pointerup", endDrag);
  railScroll.addEventListener("pointercancel", endDrag);

  unitFilter.addEventListener("change", () => {
    filterUnit = unitFilter.value;
    syncFilterUI();
    renderEvents();
    if (filterUnit !== "all") scrollToUnit(Number(filterUnit));
  });

  document.getElementById("zoomIn").addEventListener("click", () => applyZoom(zoom + 0.2));
  document.getElementById("zoomOut").addEventListener("click", () => applyZoom(zoom - 0.2));
  document.getElementById("btnToday").addEventListener("click", () => {
    centerOnX(yearToX(2026));
    const last = events[events.length - 1];
    selectEvent(last.id, false);
  });
  document.getElementById("btnStart").addEventListener("click", () => {
    document.getElementById("timelineSection").scrollIntoView({ behavior: "smooth", block: "center" });
    centerOnX(yearToX(-3500));
    selectEvent("civilizations", false);
  });
  document.getElementById("btnUnits").addEventListener("click", () => {
    document.getElementById("unitsSection").scrollIntoView({ behavior: "smooth" });
  });

  buildUnitsUI();
  layout();
  selectEvent("civilizations", false);

  window.addEventListener("resize", () => layout());
})();
