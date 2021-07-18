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
    "San Diego",
    "Atlanta -NF"
  ]

let phaseArray = ["In Production", "Produced", "In Stock"];

let orderMap = "";

let startValue = 1939

// for (let i = 0, h = startValue; i < colors.length; i++) {
//     for (let j = 0; j < products.length; j++) {
//       for (let k = 0; k < phaseArray.length; k++) {
//       orderMap += `'${colors[i]}, ${products[j]}, ${phaseArray[k]}': ${h},\n`;
//       h++;
//       }
//     }
//   }
  
//   console.log(orderMap);
  
  let dataToInsert = "";
  
  for (let i = 0; i < colors.length; i++) {
    for (let j = 0; j < products.length; j++) {
      for (let k = 0; k < phaseArray.length; k++) {
        dataToInsert += `('${colors[i]}', '${products[j]}', 0, 0, '${phaseArray[k]}'), \n`;
      }
    }
  }

  console.log(dataToInsert)