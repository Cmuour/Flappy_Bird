~function(){
  let SceneManager = window.SceneManager = function(){
    // 1：开始界面，2：教程界面，3：游戏界面，4：gameOver
    this.scene = 1
    this.w = game.canvas.width
    this.h = game.canvas.height
    // logo y值
    this.logoY = -40
    // start y值
    this.button_playY = this.h
    game.bg = new Background()
    game.land = new Land()
    game.bird = new Bird()

    this.bindEvent()
  }
  SceneManager.prototype.update = function(){
    switch(this.scene){
      case 1:
        this.button_playY -= 14
        this.logoY += 10
        if(this.button_playY < 340){
          this.button_playY = 340
        }
        if(this.logoY > 200){
          this.logoY = 200
        }
        break;
      case 2:
        game.bird.wing()
        //改变透明度 
				this.tutorialOpacity += this.tutorialOpacityIsDown ? -0.1 : 0.1;
				//如果到头了，反过来
				if(this.tutorialOpacity < 0.1 || this.tutorialOpacity > 0.9){
					this.tutorialOpacityIsDown = !this.tutorialOpacityIsDown;
				}
        break;
      case 3:
        // 渲染背景
        game.bg.update()
        // 渲染大地
        game.land.update()
        // 渲染管子
        game.fno % 100 == 0 && (new Pipe())
        for(let i = 0; i < game.pipeArr.length; i++){
          game.pipeArr[i].update()
        }
        //  渲染小鸟
        game.bird.update()
        break;
      case 4:
        let godieLine = this.h * 0.7
        if(game.bird.y > godieLine ){
          this.isBirdLand = true;
        }
        this.birdfno++;
        if(!this.isBirdLand){
					game.bird.y += 1 * this.birdfno;
				}else{
					//爆炸序列
					game.fno % 4 == 0 && this.bombStep ++;
				}

        break;
    }
  }
  SceneManager.prototype.render = function(){
    let self = this;
    switch(this.scene){
      case 1:
        // 渲染背景
        game.bg.render()
        // 渲染大地
        game.land.render()
        game.ctx.drawImage(game.R["logo"],this.w / 2 - 89,this.logoY)
        game.ctx.drawImage(game.R["button_play"],this.w / 2 - 58,this.button_playY)
        break;
      case 2:
         // 渲染背景
         game.bg.render()
         // 渲染大地
         game.land.render()
        //  渲染小鸟
        game.bird.render()
        game.ctx.save()
        game.ctx.globalAlpha = this.tutorialOpacity;  //透明度
        game.ctx.drawImage(game.R["tutorial"],50,self.h/2)
        game.ctx.restore()
        break;
      case 3:
        // 渲染背景
        game.bg.render()
        // 渲染大地
        game.land.render()
        //  渲染小鸟
        game.bird.render()
        // 渲染管子
        for(let i = 0; i < game.pipeArr.length; i++){
          game.pipeArr[i].render()
        }
        // 加分
        self.countArr = game.count.toString().length
        for (let i = 0; i<self.countArr; i++) {
          game.ctx.drawImage(game.R["shuzi"+ game.count.toString().charAt(i)],game.canvas.width / 2 - self.countArr / 2 * 24 +  30 * i ,100 )
        }
        break;
      case 4:
        // 渲染背景
        game.bg.render()
        // 渲染大地
        game.land.render()
        // 渲染管子
        for(let i = 0; i < game.pipeArr.length; i++){
          game.pipeArr[i].render()
        }
        for (let i = 0; i<self.countArr; i++) {
          game.ctx.drawImage(game.R["shuzi"+ game.count.toString().charAt(i)],game.canvas.width / 2 - self.countArr / 2 * 24 +  30 * i ,100 )
        }
        //  渲染小鸟
        if(!this.isBirdLand){
					game.bird.render();
				}else{
					//渲染爆炸特效
					if(this.bombStep <= 7){
						game.ctx.drawImage(game.R["b_04"],game.bird.x-24-36,game.bird.y-24);
					}else{
						this.enter(5);
					}
				}
        break;
      case 5:
        // 渲染背景
        game.bg.render()
        // 渲染大地
        game.land.render()
        // 渲染管子
        for(let i = 0; i < game.pipeArr.length; i++){
          game.pipeArr[i].render()
        }
        for (let i = 0; i<self.countArr; i++) {
          game.ctx.drawImage(game.R["shuzi"+ game.count.toString().charAt(i)],game.canvas.width / 2 - self.countArr / 2 * 24 +  30 * i ,100 )
        }
        game.ctx.drawImage(game.R["text_game_over"],this.w/2 - 102,140)
        break;
    }
    
  }
  SceneManager.prototype.enter = function(number){
    this.scene = number
    switch(this.scene){
      case 1:

        game.bird.y = game.canvas.height/2 - 80
        game.bird.d = 0
        game.bird.dprof = 0
        game.count = 0
        this.logoY = -40
        this.button_playY = this.h
        break;
      case 2:
        //tutorial的透明度0~1
				this.tutorialOpacity = 1;
				this.tutorialOpacityIsDown = true;
        break;
      case 3:
        game.pipeArr = []
        break;
      case 4:
        this.birdfno = 0
        this.isBirdLand = false
        this.bombStep = 0
        break;
      case 5:
        break;
    }
  }
  SceneManager.prototype.bindEvent = function(){
    let self = this
    game.canvas.onclick = function(e){
      switch(self.scene){
        case 1:
          if(e.clientX > self.w / 2 - 58 && e.clientX < self.w / 2 + 58 && e.clientY > self.button_playY && e.clientY < self.button_playY + 70){
            self.enter(2)
          }
          break;
        case 2:
          self.enter(3)
          break;
        case 3:
          game.bird.fly()
          break;
        case 5:
          self.enter(1)
          break;
      }
    }
  }
}()