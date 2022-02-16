const { createCanvas } = require('canvas');
const { makeNoise2D } =  require("open-simplex-noise");

exports.newPfp = function (params,req){
    var seed = params.seed;
    var background = params.background;
    var accent = params.accent;

    let seedNum = '';
    if(seed != null){
        for(i =0; i < seed.length; i ++){
            seedNum += seed.charCodeAt(i);
        }
        seedNum = parseFloat(seedNum);
    }else{
        let temp = Math.random();
        seedNum = temp * (Math.pow(10,(temp + '').length));
    }  
    var backgroundColor = background;
    if(backgroundColor == null) backgroundColor = "000000";
    var accentColors = null
    if(accent == null){ accentColors = [
        `F7D094`,
        `D5F7C6`,
        `F8DBAE`,
        `94CDF7`,
        `F783EE`
    ]
    }else{
        accentColors = accent.split(",");
    }

    let accentColor = getColor(seedNum,accentColors);
    let n = makeNoise2D(seedNum);

    let reqStr = req.split("/")[1].replace("new","").replace("Pfp","").toLowerCase();
    let file = require(`./gen/${reqStr}.js`);

    return file.execute(n,'#' + backgroundColor,accentColor);;
};

function getColor(seed,colors){
    return '#' + colors[seed % colors.length];
}

// exports.newGridPfp = function(params){
//     let image = generateGridPfp();

//     return image;
// }

// function generateGridPfp(){
//     let res = 62.5;
//     let n = makeNoise2D();
//     const canvas = createCanvas(1000, 1000);
//     const ctx = canvas.getContext('2d');
//     let grid = [];


//     ctx.beginPath();
//     ctx.rect(0,0,canvas.width,canvas.height);
//     ctx.fill();

//     class Point{
//         constructor(x,y,noise){
//             this.x = x;
//             this.y = y;
//             this.noise = noise;
//             this.taken = false;
//         } 
//     }

    

//     for(x = 0; x < canvas.width / res; x ++){
// 		grid[x] = [];
// 		for(y = 0; y < canvas.height / res; y ++){
// 			grid[x][y] = new Point(x,y,Math.round(mapRange(n(x / 10,y / 10),-1,1,0,1) * 5) / 5);
// 		}
// 	}

//     for(let i of grid){
// 		for(let j of i){
//             if(!j.taken){
			
//                 let v = [];
//                 let preV = [];
//                 for(let c = 0; c < 16; c ++){
//                     for(let k = 0; k <= c * 2; k ++){
//                         v.push([constrain(k,0,c),parseInt(constrain(mapRange(k,0,c * 2,c * 2,0),0,c)) || 0])
//                     }
//                     let n = neighbors(grid, j.x,j.y,v);
                    
//                     if(n.every((element) => !element.taken && element.noise == j.noise)){        
//                     }else{
//                         neigh = neighbors(grid,j.x,j.y,preV);
//                         for(let element of neigh){
//                             element.taken = true;
//                         }
//                         ctx.beginPath();
//                         ctx.fillStyle = `rgb(${Math.round(j.noise * 137)},${Math.round(j.noise * 207)},${Math.round(j.noise * 200)})`
//                         ctx.strokeStyle = `rgb(${Math.round(0.4 * 137)},${Math.round(0.4 * 207)},${Math.round(0.4 * 200)})`;
//                         ctx.lineWidth = 4;
//                         ctx.rect(j.x * res,j.y * res, res * (c),res * (c))
//                         ctx.fill();
//                         ctx.stroke();
//                         break;		
//                     }
//                     preV = [...v];
//                 }
                    
            
        
//             }


                
// 		}
// 	}
// 	for(let i of grid){
// 		for(let j of i){
//             if(!j.taken){
//                 ctx.beginPath();
//                 ctx.fillStyle = `rgb(${Math.round(j.noise * 137)},${Math.round(j.noise * 207)},${Math.round(j.noise * 200)})`
//                 ctx.strokeStyle = `rgb(${Math.round(0.4 * 137)},${Math.round(0.4 * 207)},${Math.round(0.4 * 200)})`;
//                 ctx.lineWidth = 4;
//                 ctx.rect(j.x * res, j.y * res, res,res);
//                 ctx.fill();
//                 ctx.stroke();
//             }
// 		}
// 	}



//     return canvas

//}

// function mapRange (value, a, b, c, d) {
//     value = (value - a) / (b - a);
//     return c + value * (d - c);
// }

// function neighbors(arr, m, num, v) {
//     return v.filter(([h, jam]) => h + m >= 0 && h + m < arr.length && jam + num >= 0 && jam + num < arr[0].length)
//       .map(([h, jam]) => arr[h + m][jam + num])
  
// }

// function constrain(num, min, max){
//     const MIN = min;
//     const MAX = max;
//     const parsed = parseInt(num)
//     return Math.min(Math.max(parsed, MIN), MAX)
//   }