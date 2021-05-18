const colors = [
  "Black",
  "Blush",
  "Dark Blue",
  "Light Blue",
  "Eggplant",
  "Kale",
  "Lavender",
  "Licorice",
  "Mustard",
  "Nude",
  "Peach",
  "Pistachio",
  "Platinum",
  "Red",
  "Stone",
  "Tangerine",
  "Terracotta",
  "Turquoise",
  "White",
];

const products = [
  "Atlanta",
  "Boston",
  "Carmel",
  "Chicago",
  "Denver",
  "HD",
  "Houston",
  "Manhattan",
  "Mini Manhattan",
  "Miami",
  "Mini Miami",
  "Michu",
  "Michu Planter",
  "Minima",
  "New York",
  "New York 100",
  "Orlando",
  "Portland",
  "Pheonix",
  "Reno",
  "San Francisco",
  "Mini San Francisco",
  "San Francisco ADA",
  "Texas",
  "Vegas 80",
  "Vegas 60",
  "Venice",
  "Washington",
  "Inner Planter",
  "Outer Planter",
];

let phaseArray = ["In Production", "Produced", "In Stock"];

let orderMap = "";

for (let i = 0, h = 1; i < colors.length; i++) {
  for (let j = 0; j < products.length; j++) {
    for (let k = 0; k < phaseArray.length; k++) {
    orderMap += `'${colors[i]}, ${products[j]}, ${phaseArray[k]}': ${h},\n`;
    h++;
    }
  }
}

console.log(orderMap);

let dataToInsert = "";

// for (let i = 0; i < colors.length; i++) {
//   for (let j = 0; j < products.length; j++) {
//     for (let k = 0; k < phaseArray.length; k++) {
//       dataToInsert += `('${colors[i]}', '${products[j]}', 0, 0, '${phaseArray[k]}'), \n`;
//     }
//   }
// }

console.log(dataToInsert)
// console.log(dataToInsert)
