~function(){
  let Background = window.Background = function(){
    this.img = game.R.bg_day
    this.w = 288
    this.h = 512
    this.y = 0.68 * game.canvas.height - 396
    this.x = 0
  }
  Background.prototype.update = function(){
    this.x--
    if(this.x < -this.w) {
      this.x = 0
    } 
  }
  Background.prototype.render = function(){
    game.ctx.drawImage(this.img,this.x,this.y)
    game.ctx.drawImage(this.img,this.x + this.w,this.y)
    game.ctx.drawImage(this.img,this.x + this.w * 2,this.y)
    // 渲染天空矩形
    game.ctx.fillStyle = "#4EC0CA"
    game.ctx.fillRect(0,0,game.canvas.width,this.y+2)
    // 渲染大地矩形
    // game.ctx.fillStyle = "#5EE270"
    // game.ctx.fillRect(0,this.y+this.h,game.canvas.width,game.canvas.height - this.y - this.h)
  }
}()