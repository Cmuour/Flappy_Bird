~function(){
  let Pipe = window.Pipe = function(){
    // 上下管子
    this.imgDown = game.R.pipe_down
    this.imgUp = game.R.pipe_up
    // 定义唯一高度
    this.allheight = game.canvas.height * 0.7
    // 画布宽度
    this.x = game.canvas.width + 160
    // 上下管间距
    this.space = 120
    // 图片宽度and高度
    this.imgwidth = 52
    this.imgheight = 320
    // 上下管子大小
    this.height1 = 100 + parseInt(Math.random() * (this.imgheight - 100))
    this.height2 = this.allheight - this.height1 - this.space
    // 是否已经国通加分
    this.isFlyOver = false
    // 将自己放入数组，在game类里循环实例
    game.pipeArr.push(this)
  }
  Pipe.prototype.update = function(){
    this.x -= 2
    // 检测小鸟是否撞到管子
    if(game.bird.R > this.x && game.bird.L < this.x + this.imgwidth){
      if(game.bird.T < this.height1 || game.bird.B > this.height1 + this.space ) {
        game.sm.enter(4)
      }
    }

    // 小鸟低于唯一高度就认为撞到大地
    game.bird.B > this.allheight?game.sm.enter(4):null
    
    // 加分
    if ( !this.isFlyOver && game.bird.L > this.x + this.imgwidth){
      game.count++
      this.isFlyOver =true
    }
    
    for(let i = 0; i < game.pipeArr.length; i++){
      if(game.pipeArr[i].x < -300){
        game.pipeArr.splice(i,1)
      }
    }

  }
  Pipe.prototype.render = function(){
    // 管子
    game.ctx.drawImage(this.imgDown,0,this.imgheight - this.height1,this.imgwidth,this.height1,this.x,0,this.imgwidth,this.height1)
    game.ctx.drawImage(this.imgUp,0,0,this.imgwidth,this.height2,this.x,this.height1 + this.space,this.imgwidth,this.height2)
  }
}()