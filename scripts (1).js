// MAP IMAGE URLS – paste your links here
const URL_MAP_MAIN = "https://uploads.onecompiler.io/446rrd6xr/446shm87f/map_main.png.jpg";
const URL_S_GROUND = "https://uploads.onecompiler.io/446rrd6xr/446shm87f/s_ground.png.jpg";
const URL_S_FIRST  = "https://uploads.onecompiler.io/446rrd6xr/446shm87f/s_first.png.jpg";
const URL_S_SECOND = "https://uploads.onecompiler.io/446rrd6xr/446shm87f/s_second.png.jpg";

const URL_R_GROUND = "https://uploads.onecompiler.io/446rrd6xr/446shm87f/r_ground.png.jpg";
const URL_R_FIRST  = "https://uploads.onecompiler.io/446rrd6xr/446shm87f/r_first.png.jpg";
const URL_R_SECOND = "https://uploads.onecompiler.io/446rrd6xr/446shm87f/r_second.png.jpg";

const URL_M_GROUND = "https://uploads.onecompiler.io/446rrd6xr/446shm87f/m_ground.png.jpg";
const URL_M_FIRST  = "https://uploads.onecompiler.io/446rrd6xr/446shm87f/m_first.png.jpg";
const URL_M_SECOND = "https://uploads.onecompiler.io/446rrd6xr/446shm87f/m_second.png.jpg";

//  LOGIN & ROLE HANDLING

let currentRole = "Guest"; // "Guest" | "Student" | "Teacher" | "CR"

const welcomeScreen = document.getElementById("welcomeScreen");
const appScreen = document.getElementById("appScreen");

const guestBtn = document.getElementById("guestBtn");
const loginBtn = document.getElementById("loginBtn");
const loginOptions = document.getElementById("loginOptions");

const studentLoginBtn = document.getElementById("studentLoginBtn");
const teacherLoginBtn = document.getElementById("teacherLoginBtn");
const crLoginBtn = document.getElementById("crLoginBtn");

const studentLoginForm = document.getElementById("studentLoginForm");
const teacherLoginForm = document.getElementById("teacherLoginForm");
const crLoginForm = document.getElementById("crLoginForm");

const studentSubmitBtn = document.getElementById("studentSubmitBtn");
const teacherSubmitBtn = document.getElementById("teacherSubmitBtn");
const crSubmitBtn = document.getElementById("crSubmitBtn");

const currentRoleLabel = document.getElementById("currentRoleLabel");
const loggedInUserLabel = document.getElementById("loggedInUserLabel");
const roleInfoLabel = document.getElementById("roleInfoLabel");
const backToWelcomeBtn = document.getElementById("backToWelcomeBtn");

// form inputs
const studentName = document.getElementById("studentName");
const studentUsn = document.getElementById("studentUsn");
const teacherName = document.getElementById("teacherName");
const teacherPass = document.getElementById("teacherPass");
const crName = document.getElementById("crName");
const crPass = document.getElementById("crPass");

//  ROOM & FILTER ELEMENTS

const floorSelect = document.getElementById("floorSelect");
const typeFilter = document.getElementById("typeFilter");
const vacantFilter = document.getElementById("vacantFilter");
const classFilter = document.getElementById("classFilter");

const roomSearchInput = document.getElementById("roomSearchInput");
const roomSearchBtn = document.getElementById("roomSearchBtn");
const searchResult = document.getElementById("searchResult");

const roomsTableBody = document.getElementById("roomsTableBody");
const importantTableBody = document.getElementById("importantTableBody");

// MAP ELEMENTS
const mapTitle = document.getElementById("mapTitle");
const mapImage = document.getElementById("mapImage");

//  PHASE 2: CR & TEACHER UPDATE ELEMENTS

const crRoomSelect = document.getElementById("crRoomSelect");
const crStatusSelect = document.getElementById("crStatusSelect");
const crUpdateBtn = document.getElementById("crUpdateBtn");

const teacherRoomSelect = document.getElementById("teacherRoomSelect");
const teacherClassInput = document.getElementById("teacherClassInput");
const teacherStatusSelect = document.getElementById("teacherStatusSelect");
const teacherUpdateBtn = document.getElementById("teacherUpdateBtn");

//  DATA: ROOMS (WITH currentClass FIELD)

let selectedBlock = "S";
let selectedFloor = "Ground";

const floorsByBlock = {
  S: ["Ground", "First", "Second"],
  R: ["Ground", "First", "Second"],
  M: ["Ground", "First", "Second"]
};

const rooms = [
  // S-Block
  { roomNo: "S101", block: "S", floor: "Ground", type: "Classroom", status: "Vacant", currentClass: "" },
  { roomNo: "S102", block: "S", floor: "Ground", type: "Classroom", status: "Occupied", currentClass: "" },
  { roomNo: "S201", block: "S", floor: "First", type: "Lab", status: "Occupied", currentClass: "" },
  { roomNo: "S202", block: "S", floor: "First", type: "Classroom", status: "Vacant", currentClass: "" },
  { roomNo: "S301", block: "S", floor: "Second", type: "Lab", status: "Vacant", currentClass: "" },

  // R-Block
  { roomNo: "R101", block: "R", floor: "Ground", type: "Classroom", status: "Vacant", currentClass: "" },
  { roomNo: "R102", block: "R", floor: "Ground", type: "Classroom", status: "Occupied", currentClass: "" },
  { roomNo: "R201", block: "R", floor: "First", type: "Lab", status: "Vacant", currentClass: "" },
  { roomNo: "R202", block: "R", floor: "First", type: "Classroom", status: "Vacant", currentClass: "" },
  { roomNo: "R301", block: "R", floor: "Second", type: "Lab", status: "Occupied", currentClass: "" },

  // Main Block
  { roomNo: "M101", block: "M", floor: "Ground", type: "Office", status: "Occupied", currentClass: "" },
  { roomNo: "M102", block: "M", floor: "Ground", type: "Facility", status: "Vacant", currentClass: "" },
  { roomNo: "M201", block: "M", floor: "First", type: "Classroom", status: "Vacant", currentClass: "" },
  { roomNo: "M202", block: "M", floor: "First", type: "Classroom", status: "Occupied", currentClass: "" },
  { roomNo: "M301", block: "M", floor: "Second", type: "Lab", status: "Vacant", currentClass: "" }
];

// IMPORTANT LOCATIONS DATA

const importantLocations = [
  { name: "Principal Office", location: "M101", block: "M", floor: "Ground" },
  { name: "Department Office CSE", location: "S201", block: "S", floor: "First" },
  { name: "Main Library", location: "M201", block: "M", floor: "First" },
  { name: "Auditorium", location: "M102", block: "M", floor: "Ground" },
  { name: "Canteen", location: "Near R-Block", block: "R", floor: "Ground Area" }
];

//  HELPERS

function setRole(role, userLabelText, infoText) {
  currentRole = role;
  currentRoleLabel.textContent = `Role: ${role}`;
  loggedInUserLabel.textContent = userLabelText;
  roleInfoLabel.textContent = infoText;
}

function showAppScreen() {
  welcomeScreen.classList.add("hidden");
  appScreen.classList.remove("hidden");
}

function showWelcomeScreen() {
  appScreen.classList.add("hidden");
  welcomeScreen.classList.remove("hidden");
  loginOptions.classList.add("hidden");
  studentLoginForm.classList.add("hidden");
  teacherLoginForm.classList.add("hidden");
  crLoginForm.classList.add("hidden");
  currentRole = "Guest";
  currentRoleLabel.textContent = "Role: Guest";
  loggedInUserLabel.textContent = "";
  roleInfoLabel.textContent = "";
}

//  MAP LOGIC

function updateMapImage() {
  if (!mapImage || !mapTitle) return;

  let imgFile = URL_MAP_MAIN;
  let titleText = "Campus Map – Overview";

  if (selectedBlock === "S") {
    if (selectedFloor === "Ground") {
      imgFile = URL_S_GROUND;
      titleText = "S-Block – Ground Floor";
    } else if (selectedFloor === "First") {
      imgFile = URL_S_FIRST;
      titleText = "S-Block – First Floor";
    } else if (selectedFloor === "Second") {
      imgFile = URL_S_SECOND;
      titleText = "S-Block – Second Floor";
    }
  } else if (selectedBlock === "R") {
    if (selectedFloor === "Ground") {
      imgFile = URL_R_GROUND;
      titleText = "R-Block – Ground Floor";
    } else if (selectedFloor === "First") {
      imgFile = URL_R_FIRST;
      titleText = "R-Block – First Floor";
    } else if (selectedFloor === "Second") {
      imgFile = URL_R_SECOND;
      titleText = "R-Block – Second Floor";
    }
  } else if (selectedBlock === "M") {
    if (selectedFloor === "Ground") {
      imgFile = URL_M_GROUND;
      titleText = "Main Block – Ground Floor";
    } else if (selectedFloor === "First") {
      imgFile = URL_M_FIRST;
      titleText = "Main Block – First Floor";
    } else if (selectedFloor === "Second") {
      imgFile = URL_M_SECOND;
      titleText = "Main Block – Second Floor";
    }
  }

  mapImage.src = imgFile;
  mapTitle.textContent = titleText;
}

//  LOGIN FLOW

guestBtn.addEventListener("click", () => {
  setRole("Guest", "Guest user", "Can explore blocks, floors, rooms, map, and important locations.");
  showAppScreen();
});

loginBtn.addEventListener("click", () => {
  loginOptions.classList.toggle("hidden");
});

// choose which login form
studentLoginBtn.addEventListener("click", () => {
  studentLoginForm.classList.remove("hidden");
  teacherLoginForm.classList.add("hidden");
  crLoginForm.classList.add("hidden");
});

teacherLoginBtn.addEventListener("click", () => {
  teacherLoginForm.classList.remove("hidden");
  studentLoginForm.classList.add("hidden");
  crLoginForm.classList.add("hidden");
});

crLoginBtn.addEventListener("click", () => {
  crLoginForm.classList.remove("hidden");
  studentLoginForm.classList.add("hidden");
  teacherLoginForm.classList.add("hidden");
});

// student login (demo)
studentSubmitBtn.addEventListener("click", () => {
  const name = studentName.value.trim();
  const usn = studentUsn.value.trim();

  if (name === "Hruthik" && usn.toLowerCase() === "2025cs0038") {
    setRole("Student", `Student: ${name} (${usn})`, "Student can explore campus details in prototype.");
    showAppScreen();
  } else {
    alert("Invalid demo student credentials. Try: Hruthik / 2025cs0038");
  }
});

// teacher login (demo)
teacherSubmitBtn.addEventListener("click", () => {
  const name = teacherName.value.trim();
  const pass = teacherPass.value.trim();

  if (name.toLowerCase() === "rohan" && pass === "rohan7") {
    setRole("Teacher", `Teacher: ${name}`, "Teacher can update current class and status of rooms (prototype).");
    showAppScreen();
  } else {
    alert("Invalid demo teacher credentials. Try: rohan / rohan7");
  }
});

// CR login (demo)
crSubmitBtn.addEventListener("click", () => {
  const name = crName.value.trim().toLowerCase();
  const pass = crPass.value.trim();

  const valid =
    (name === "messi" && pass === "10") ||
    (name === "ronaldo" && pass === "7");

  if (valid) {
    setRole("CR", `CR: ${crName.value.trim()}`, "CR can update room status (Vacant / Occupied) in prototype.");
    showAppScreen();
  } else {
    alert("Invalid demo CR credentials. Try: messi / 10 or ronaldo / 7");
  }
});

// back button
backToWelcomeBtn.addEventListener("click", showWelcomeScreen);

//  BLOCK & FLOOR HANDLING

const blockButtons = document.querySelectorAll(".block-btn");

blockButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    blockButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    selectedBlock = btn.getAttribute("data-block");
    populateFloors();
    renderRoomsTable(rooms);
    updateMapImage();
  });
});

function populateFloors() {
  floorSelect.innerHTML = "";
  const floors = floorsByBlock[selectedBlock] || [];
  floors.forEach((fl) => {
    const opt = document.createElement("option");
    opt.value = fl;
    opt.textContent = fl;
    floorSelect.appendChild(opt);
  });
  selectedFloor = floors[0] || "Ground";
  updateMapImage();
}

floorSelect.addEventListener("change", () => {
  selectedFloor = floorSelect.value;
  renderRoomsTable(rooms);
  updateMapImage();
});

//  FILTERS & SEARCH

typeFilter.addEventListener("change", () => renderRoomsTable(rooms));
vacantFilter.addEventListener("change", () => renderRoomsTable(rooms));
classFilter.addEventListener("change", () => renderRoomsTable(rooms));

roomSearchBtn.addEventListener("click", searchRoom);
roomSearchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchRoom();
});

function searchRoom() {
  const query = roomSearchInput.value.trim().toLowerCase();
  if (!query) {
    searchResult.textContent = "Type a room number or keyword to search.";
    return;
  }

  const match = rooms.find((r) => {
    const combined =
      `${r.roomNo} ${r.block} ${r.floor} ${r.type} ${r.currentClass}`.toLowerCase();
    return combined.includes(query);
  });

  if (!match) {
    searchResult.textContent = "No matching room found in prototype data.";
    return;
  }

  searchResult.innerHTML = `
    <strong>${match.roomNo}</strong> – ${match.type}
    ${match.currentClass ? ` (${match.currentClass})` : ""}
    | Block ${match.block}, ${match.floor} floor
    | Status: ${match.status}
  `;
}

//  TABLE RENDERING

function renderRoomsTable(data) {
  roomsTableBody.innerHTML = "";

  const filtered = data.filter((r) => {
    if (r.block !== selectedBlock) return false;
    if (r.floor !== selectedFloor) return false;

    if (typeFilter.value && r.type !== typeFilter.value) return false;
    if (vacantFilter.checked && r.status !== "Vacant") return false;
    if (classFilter.checked && !r.currentClass) return false;

    return true;
  });

  filtered.forEach((r) => {
    const tr = document.createElement("tr");

    const tdNo = document.createElement("td");
    tdNo.textContent = r.roomNo;

    const tdType = document.createElement("td");
    tdType.textContent = r.currentClass
      ? `${r.type} (${r.currentClass})`
      : r.type;

    const tdStatus = document.createElement("td");
    tdStatus.textContent = r.status;
    tdStatus.className =
      r.status === "Vacant" ? "status-vacant" : "status-occupied";

    const tdBlock = document.createElement("td");
    tdBlock.textContent = r.block;

    const tdFloor = document.createElement("td");
    tdFloor.textContent = r.floor;

    tr.appendChild(tdNo);
    tr.appendChild(tdType);
    tr.appendChild(tdStatus);
    tr.appendChild(tdBlock);
    tr.appendChild(tdFloor);

    roomsTableBody.appendChild(tr);
  });
}

// IMPORTANT LOCATIONS TABLE

function renderImportantTable() {
  importantTableBody.innerHTML = "";
  importantLocations.forEach((loc) => {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = loc.name;

    const tdLoc = document.createElement("td");
    tdLoc.textContent = loc.location;

    const tdBlock = document.createElement("td");
    tdBlock.textContent = loc.block;

    const tdFloor = document.createElement("td");
    tdFloor.textContent = loc.floor;

    tr.appendChild(tdName);
    tr.appendChild(tdLoc);
    tr.appendChild(tdBlock);
    tr.appendChild(tdFloor);

    importantTableBody.appendChild(tr);
  });
}

//  PHASE 2: CR UPDATE LOGIC

function populateCrRoomSelect() {
  crRoomSelect.innerHTML = "";
  rooms.forEach((r) => {
    const opt = document.createElement("option");
    opt.value = r.roomNo;
    opt.textContent = `${r.roomNo} (${r.block}, ${r.floor})`;
    crRoomSelect.appendChild(opt);
  });
}

function crUpdateRoom() {
  if (currentRole !== "CR") {
    alert("Only CR can use this panel in the prototype (login as CR).");
    return;
  }

  const roomNo = crRoomSelect.value;
  const newStatus = crStatusSelect.value;

  const room = rooms.find((r) => r.roomNo === roomNo);
  if (!room) {
    alert("Selected room not found in rooms list.");
    return;
  }

  room.status = newStatus;
  renderRoomsTable(rooms);

  searchResult.innerHTML = `
    <p>CR updated <strong>${room.roomNo}</strong> status to
      <strong>${newStatus}</strong>.
    </p>
  `;
}

crUpdateBtn.addEventListener("click", crUpdateRoom);

//  PHASE 2: TEACHER CLASS & STATUS UPDATE LOGIC

function populateTeacherRoomSelect() {
  teacherRoomSelect.innerHTML = "";
  rooms.forEach((r) => {
    const opt = document.createElement("option");
    opt.value = r.roomNo;
    opt.textContent = `${r.roomNo} (${r.block}, ${r.floor})`;
    teacherRoomSelect.appendChild(opt);
  });
}

function teacherUpdateRoom() {
  if (currentRole !== "Teacher") {
    alert("Only Teacher can use this panel in the prototype (login as Teacher).");
    return;
  }

  const roomNo = teacherRoomSelect.value;
  const classText = teacherClassInput.value.trim();
  const newStatus = teacherStatusSelect.value;

  const room = rooms.find((r) => r.roomNo === roomNo);
  if (!room) {
    alert("Selected room not found in rooms list.");
    return;
  }

  room.currentClass = classText;
  room.status = newStatus;

  renderRoomsTable(rooms);

  searchResult.innerHTML = `
    <p>Teacher updated <strong>${room.roomNo}</strong>:
      status = <strong>${newStatus}</strong>
      ${classText ? `, class = <strong>${classText}</strong>` : ""}
    </p>
  `;
}

teacherUpdateBtn.addEventListener("click", teacherUpdateRoom);

//  INITIAL SETUP

function init() {
  const defaultBtn = document.querySelector('.block-btn[data-block="S"]') || blockButtons[0];
  if (defaultBtn) defaultBtn.classList.add("active");

  populateFloors();
  renderRoomsTable(rooms);
  renderImportantTable();
  populateCrRoomSelect();
  populateTeacherRoomSelect();
  updateMapImage();
}

init();
