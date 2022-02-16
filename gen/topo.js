const { createCanvas } = require('canvas');

exports.execute = function(n,background,accentColor){
    const canvas = createCanvas(1000, 1000);
    const ctx = canvas.getContext('2d');


    ctx.beginPath();
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = background;
    ctx.fill();

    for(x =0; x < canvas.width; x ++){
        for(y =0; y < canvas.height; y ++){
            let shade = Math.round(n(x / canvas.width * 4,y / canvas.height * 4) * 10);
            if(shade % 4 == 0){
                ctx.beginPath();
                ctx.rect(x,y,1,1);
                ctx.fillStyle = accentColor;
                ctx.fill();
            }
        }
    }



    return canvas
}
