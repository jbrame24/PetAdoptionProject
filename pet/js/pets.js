class Pets{

/* GET ALL PETS */
static all(){
  return Storage.getArray('pets'); 
}

/* SAVE */
static save(pets){
  Storage.set('pets', pets);
}

/* ADD */
static add(p){

  p.id = Date.now();

  // 🧠 DEFAULT VALUES 
  p.status = "Available";
  p.adoptedBy = null;
  p.adoptedDate = null;

  let pets = this.all();

  pets.push(p);

  this.save(pets);
}

/* UPDATE */
static update(p){

  let pets = this.all().map(x => x.id === p.id ? p : x);

  this.save(pets);
}

/* DELETE */
static delete(id){

  let pets = this.all().filter(p => p.id !== id);

  this.save(pets);
}

}