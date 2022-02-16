const { createCanvas } = require('canvas');

exports.execute = function(n,background,accentColor){
    const canvas = createCanvas(1000, 1000);
    const ctx = canvas.getContext('2d');
    let res = 10;
    let intesnsity = 150;


    ctx.beginPath();
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = background;
    ctx.fill();


    let points = [];

    for(x = 0; x < canvas.width + intesnsity / res; x ++){
        points[x] = [];
        for(y = 0; y < canvas.height +  intesnsity / res; y ++){
            let noise = (n(x / 40,y / 40) + 1) / 2 * Math.PI * 2;
            points[x][y] = {x: (x - intesnsity / 2) * res + Math.cos(noise) * intesnsity,y: (y - intesnsity / 2) * res + Math.sin(noise) * intesnsity}
        }
    }


    for(y = 0; y < points.length; y ++){
        ctx.beginPath();
        ctx.moveTo(points[0][y].x, points[0][y].y);


        for(x = 1; x < points.length - 2; x ++){
            var xc = (points[x][y].x + points[x + 1][y].x) / 2;
            var yc = (points[x][y].y + points[x + 1 ][y].y) / 2;
            ctx.quadraticCurveTo(points[x][y].x, points[x][y].y, xc, yc);
        }

        ctx.quadraticCurveTo(points[points.length - 2][y].x, points[points.length - 2][y].y, points[points.length - 1][y].x,points[points.length - 1][y].y);

        ctx.strokeStyle = accentColor + '80';
        ctx.lineWidth = 1;
        ctx.stroke();
    }


    for(x = 0; x < points.length; x ++){
        ctx.beginPath();
        ctx.moveTo(points[x][0].x, points[x][0].y);


        for(y = 1; y < points.length - 2; y ++){
            var xc = (points[x][y].x + points[x][y + 1].x) / 2;
            var yc = (points[x][y].y + points[x][y + 1].y) / 2;
            ctx.quadraticCurveTo(points[x][y].x, points[x][y].y, xc, yc);
        }

        ctx.quadraticCurveTo(points[x][points.length - 2].x, points[x][points.length - 2].y, points[x][points.length - 1].x,points[x][points.length - 1].y);

        ctx.strokeStyle = accentColor + '80';
        ctx.lineWidth = 1;
        ctx.stroke();
    }









    return canvas 
}
