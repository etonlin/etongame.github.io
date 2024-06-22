// const screenWidth  = window.innerWidth
// const screenHeight = window.innerHeight
// import Element from './element'
let atlas7 = new Image()
atlas7.src = 'images/bg.jpg'
let cloud = new Image()
cloud.src = 'images/cloud.png'
const scalx = canvas.width/375
const scaly=canvas.height/ 667
class GameInfo {
  renderGameScore(ctx, score) {
    this.info = new Element(ctx);
    ctx.font      = "3vh Arial bold"
    ctx.strokeStyle = '#fff';  
    ctx.strokeText('第:'+1+'关',10*scalx,15*scaly)  
    ctx.fillStyle = "#ffcf00"
    ctx.fillText(
      '第:'+1+'关',
      10*scalx,
      15*scaly
    )
  }

  renderImage(ctx,score) {
    // this.info.render(ctx,0,0,148*scalx,5*scaly); 
  
    ctx.font      = "2.5vh Arial bold"
    ctx.strokeStyle = '#ff1106'; 
    ctx.fillStyle = "#bd0d04" 
    let x = 65*scalx,y = 580*scaly;
    let h = 100*scalx;
    ctx.drawImage(cloud,0, 0, 800, 428, x*0.2, y*0.93, h*800/428, h);
    ctx.fillText("得分："+score,x,y)
    ctx.strokeText("得分："+score,x,y)  
    
  }
  renderTime(ctx,time) {
    if(!time) return;
    let x = 150*scalx;
    let y = 420*scaly;
    let h = 100*scalx;
    ctx.drawImage(cloud,0, 0, 800, 428, x*(1-2/6) , y*(1-0.05), h*800/428, h);
    ctx.font      = "3vh Arial bold"
    ctx.strokeStyle = '#fff';  
    ctx.strokeText('时间:'+time,x*1.05,y*1.05)  
    ctx.fillStyle = "#ffcf00"
    ctx.fillText(
      '时间:'+time,
      x*1.05,
      y*1.05
    )
  }
  renderGameOver(ctx, score) {
    ctx.drawImage(atlas7, 0, 0, 119, 108, screenWidth*0.2, screenHeight*0.3, screenWidth*0.6, screenHeight*0.4)

    ctx.fillStyle = "#000000"
    ctx.font    = "3vh Arial"

    ctx.fillText(
      '游戏结束',
      screenWidth*0.37,
      screenHeight*0.4
    )

    ctx.fillText(
      '得分: ' + score,
      screenWidth*0.39,
      screenHeight *0.5
    )

    ctx.drawImage(
      atlas7,
      120, 6, 39, 24,
      screenWidth*0.32,
      screenHeight*0.56,
      screenWidth*0.36, screenHeight*0.05
    )

    ctx.fillText(
      '重新开始',
      screenWidth*0.37,
      screenHeight*0.6
    )

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnArea = {
      startX: screenWidth*0.32,
      startY: screenHeight*0.57,
      endX  : screenWidth*0.36,
      endY  : screenHeight*0.05
    }
  }
}

