const colors = [
  'Black',
  'Blush',
  'Dark Blue',
  'Light Blue',
  'Eggplant',
  'Kale',
  'Lavender',
  'Licorice',
  'Mustard',
  'Nude',
  'Peach',
  'Pistachio',
  'Platinum',
  'Red',
  'Stone',
  'Tangerine',
  'Terracotta',
  'Turquoise',
  'White'
];

const products = [
  'Atlanta',
  'Boston',
  'Carmel',
  'Charleston',
  'Chicago',
  'Concrete Drain Covers',
  'Denver',
  'HD Round',
  'Houston',
  'Manhattan',
  'Mini Manhattan',
  'Miami',
  'Mini Miami',
  'Michu',
  'Michu Planter',
  'Minima',
  'New York',
  'New York 100',
  'Orlando',
  'Portland',
  'Phoenix',
  'Reno',
  'San Francisco New Mold',
  'San Francisco Old Mold',
  'San Francisco ADA',
  'Mini San Francisco',
  'Seattle',
  'Texas',
  'Vegas 80',
  'Vegas 60',
  'Venice',
  'Washington',
  'Inner Planter',
  'Outer Planter'
];

let phaseArray = ["In Production", "Produced", "In Stock"];

let orderMap = "";

// for (let i = 0, h = 1; i < colors.length; i++) {
//   for (let j = 0; j < products.length; j++) {
//     for (let k = 0; k < phaseArray.length; k++) {
//     orderMap += `'${colors[i]}, ${products[j]}, ${phaseArray[k]}': ${h},\n`;
//     h++;
//     }
//   }
// }

// console.log(orderMap);

let dataToInsert = "";

for (let i = 0; i < colors.length; i++) {
  for (let j = 0; j < products.length; j++) {
    for (let k = 0; k < phaseArray.length; k++) {
      dataToInsert += `('${colors[i]}', '${products[j]}', 0, 0, '${phaseArray[k]}'), \n`;
    }
  }
}

console.log(dataToInsert)
// console.log(dataToInsert)

//USE DATATOINSERT FOR BACKEND SEEDING
//USE ORDERMAP FOR FRONTEND SEEDING