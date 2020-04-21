const buildings = [
  {
    id: 1,
    name: "Aguacatala",
  },
  {
    id: 2,
    name: "Milla de Oro",
  },
];

const desktops= [ ];
const newBuilding= {
  id: null,
  name: ''
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newBuilding,
  buildings,
  desktops
};
