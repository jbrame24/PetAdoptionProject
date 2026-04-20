class Admin{

static panel(){
  let user = Auth.current();

  if(!user || user.role !== 'admin'){
    UI.toast("Admins only 🚫");
    UI.navigate('home');
    return;
  }

  let pets = Pets.all();

  let html = `
    <div class="admin-container">

      <h2>👑 Admin Dashboard</h2>

      <!-- ACTION BUTTONS -->
      <div class="admin-actions">
        <button class="primary-btn" onclick="UI.navigate('add')">
          ➕ Add New Pet
        </button>

        <button class="secondary-btn" onclick="Admin.viewAdopted()">
          📂 Adopted Pets
        </button>
      </div>

      <!-- PET GRID -->
      <div class="grid">
  `;

  if(pets.length === 0){
    html += "<p style='text-align:center'>No pets available</p>";
  }

pets.forEach(p=>{

  html += `
    <div class="card" onclick="UI.navigate('details', ${p.id})" style="cursor:pointer">

      <img src="${p.image}">

      <div class="card-content">
        <h3>${p.name || "Unnamed"}</h3>
        <p>${p.type || "-"}</p>

        <span class="badge ${p.status?.toLowerCase() || "available"}">
          ${p.status || "Available"}
        </span>

        ${
          p.status === "Pending"
          ? `
            <p><b>Requested by:</b> ${p.adoptedBy || "-"}</p>

            <button class="approve"
              onclick="event.stopPropagation(); Admin.approve(${p.id})">
              ✔ Approve
            </button>

            <button class="deny"
              onclick="event.stopPropagation(); Admin.deny(${p.id})">
              ✖ Deny
            </button>
          `
          : ""
        }

        <br>

        <button class="edit-btn"
          onclick="event.stopPropagation(); UI.navigate('edit', ${p.id})">
          ✏ Edit
        </button>

        <button class="delete-btn"
  onclick="event.stopPropagation(); UI.deletePet(${p.id})">
          🗑 Delete
        </button>

      </div>

    </div>
  `;
});

  html += "</div></div>";

  app.innerHTML = html;
}

/* ✅ APPROVE REQUEST */
static approve(id){
  let pets = Pets.all();
  let p = pets.find(x=>x.id===id);

  p.status = "Adopted";
  p.adoptedDate = new Date().toLocaleDateString();

  Pets.update(p);

  UI.toast("Adoption approved ✅");
  UI.navigate('admin');
}

/* ❌ DENY REQUEST */
static deny(id){
  let pets = Pets.all();
  let p = pets.find(x=>x.id===id);

  p.status = "Available";
  p.adoptedBy = null;

  Pets.update(p);

  UI.toast("Request denied ❌");
  UI.navigate('admin');
}

/* 🔄 MANUAL MARK */
static markAdopted(id){
  let p = Pets.all().find(x=>x.id===id);

  p.status = "Adopted";
  p.adoptedDate = new Date().toLocaleDateString();

  Pets.update(p);

  UI.navigate('admin');
}

static markAvailable(id){
  let p = Pets.all().find(x=>x.id===id);

  p.status = "Available";
  p.adoptedBy = null;
  p.adoptedDate = null;

  Pets.update(p);

  UI.navigate('admin');
}

/* 📂 VIEW ADOPTED */
static viewAdopted(){
  let pets = Pets.all().filter(p => p.status === "Adopted");

  let html = `
    <h2 style="text-align:center">Adopted Pets 🏠</h2>

    <div style="text-align:center;margin-bottom:20px;">
      <button onclick="UI.navigate('admin')">⬅ Back</button>
    </div>

    <div class="grid">
  `;

  if(pets.length === 0){
    html += "<h3 style='text-align:center'>No adopted pets yet</h3>";
  }

pets.forEach(p=>{
  html += `
    <div class="card" onclick="UI.navigate('details', ${p.id})" style="cursor:pointer">

      <img src="${p.image}">

      <div class="card-content">
        <h3>${p.name || "Unnamed"}</h3>
        <p>${p.type || "-"}</p>

        <p>${p.desc ? p.desc.substring(0,60) + "..." : "No description"}</p>

        <span class="badge adopted">Adopted</span>

        <p><b>By:</b> ${p.adoptedBy || "-"}</p>
        <p><b>Date:</b> ${p.adoptedDate || "-"}</p>
      </div>

    </div>
  `;
});

  html += "</div>";

  app.innerHTML = html;
}

/* 🗑️ CLEAR */
static clearPets(){
  if(confirm("Delete ALL pets?")){
    Storage.set('pets',[]);
    UI.navigate('home');
  }
}

/* ✅ APPROVE */
static approve(id){
  let pets = Pets.all();
  let p = pets.find(x=>x.id===id);

  p.status = "Adopted";
  p.adoptedDate = new Date().toLocaleDateString();

  Pets.update(p);

  UI.toast("Adoption approved ✅");

  UI.navigate('admin');
}

/* ❌ DENY */
static deny(id){
  let pets = Pets.all();
  let p = pets.find(x=>x.id===id);

  p.status = "Available";
  p.adoptedBy = null;

  Pets.update(p);

  UI.toast("Request denied ❌");

  UI.navigate('admin');
}
}