const buildings = [
  {
    id: 1,
    address: "Calle 44 # 123",
  },
  {
    id: 2,
    address: "Calle 37 # 98",
  },
];

const desktops= [ ];
const newBuilding= {
  id: null,
  address: 'Carrera 1'
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newBuilding,
  buildings,
  desktops
};
