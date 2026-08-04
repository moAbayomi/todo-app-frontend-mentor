
NEWARRAY = [
  { name: "tunde", age: 12 },
  {name: "taye", age: 14}
]

function addNewObj(obj) {
  NEWARRAY.push(obj)
  savetoLocal(NEWARRAY)
}

function loadArray() {
  const array =  JSON.parse(localStorage.getItem("arr"));
  return array;
}

function savetoLocal(arr) {
  localStorage.setItem("arr", JSON.stringify(arr))
}

addNewObj({name: "dada", age: 15})

console.log(loadArray())
