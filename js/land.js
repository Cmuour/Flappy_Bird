~function(){
  let Land = window.Land = function(){
    this.img = game.R.land
    this.x = 0
    this.y = game.canvas.height * 0.7
    this.w = 336
    this.h = 112
  }
  Land.prototype.update = function(){
    this.x -= 2
    if(this.x < -this.w) {
      this.x = 0
    }
    
  }
  Land.prototype.render = function(){
    game.ctx.drawImage(this.img,this.x,this.y)
    game.ctx.drawImage(this.img,this.x + this.w,this.y)
    game.ctx.drawImage(this.img,this.x + this.w * 2,this.y)

    game.ctx.fillStyle = "#DED895"
    game.ctx.fillRect(0,this.y + this.h-2,game.canvas.width,game.canvas.height * 0.3)
  }
}()