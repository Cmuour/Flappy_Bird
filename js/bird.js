~function(){
  let Bird = window.Bird = function(){
    this.random = parseInt(Math.random() * 3)
    this.img = [
      game.R["bird"+ this.random +"_0"],
      game.R["bird"+ this.random +"_1"],
      game.R["bird"+ this.random +"_2"]
    ]
    this.x = game.canvas.width * (1-0.618) - 24
    this.y = game.canvas.height/2 - 80
    this.d = 0
    this.dprof = 0
    this.isFly = false
    this.wingStep = 0
  }
  Bird.prototype.update = function(){
    this.wing()
    // 小鸟飞行状态控制
    if(!this.isFly){
      this.y += 0.22 * this.dprof
    }else{
      this.y -= 0.22 * (23 - this.dprof)
      if(this.dprof > 23) {
        this.isFly = false
        this.dprof = 0
      }
    }

    // 小鸟最高飞到距离顶部10px的位置
    this.y < 10?this.y = 10: null

    this.dprof++
    this.d  += 0.03

    game.bird.T = this.y - 8
    game.bird.L = this.x - 8
    game.bird.R = this.x + 4
    game.bird.B = this.y + 12

  }
  Bird.prototype.render = function(){
    game.ctx.save()
    game.ctx.translate(this.x,this.y)
    game.ctx.rotate(this.d)
    game.ctx.drawImage(this.img[this.wingStep],-24,-24)
    game.ctx.restore()
  }
  Bird.prototype.fly = function(){
    this.isFly = true
    this.dprof = 0
    this.d = -0.9
  }
  Bird.prototype.wing = function(){
    // 控制每隔多少帧换取一张小鸟飞行图片 一共三张
    game.fno % 10 == 0 && this.wingStep++
    if(this.wingStep > 2){
      this.wingStep = 0
    }
  }
}()