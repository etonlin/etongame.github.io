
let atlas22 = new Image()
atlas22.src = 'images/loginButton.png'
class Login  {
    btnArea = {
        startX: screenWidth/4,
        startY: screenHeight*5/6,
        endX  : screenWidth*3/4,
        endY  : screenHeight*5/6+screenWidth*0.5*67/138
    }
    render(ctx) {
        ctx.drawImage(
            atlas22,
            0, 0, 138, 67,screenWidth/4,screenHeight*5/6,screenWidth*0.5, screenWidth*0.5*67/138
          )
            /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
     

      }

}