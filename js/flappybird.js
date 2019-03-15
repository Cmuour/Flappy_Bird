~function(){
  let Game = window.Game = function(options){
    let self = this
    self.fno = 0
    self.dataUrl = options.sourceUrl
    self.canvas = document.querySelector(options.canvasId)
    self.ctx = self.canvas.getContext("2d")

    // 存储图片
    self.R = {}

    // 计数小鸟飞过多少管子
    self.count = 0

    // 初始化界面宽度
    self.initView()

    self.isGameOver = false

    // 加载图片开始游戏
    self.loadSource(function(){
      self.start()
    })

  }

  Game.prototype.initView = function(){
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;
    if(this.width >= 414) {
      this.width = 414
    }else if(this.width <= 320) {
      this.width = 320
    }
    if(this.height >= 823) {
      this.height = 823
    }else if(this.height <= 568){
      this.height = 568
    }
    this.canvas.width = this.width
    this.canvas.height = this.height
  }

  Game.prototype.loadSource = function(callback){
    let self = this
    let sourceNumber = 0
    let xhr = new XMLHttpRequest()
    xhr.open("get",self.dataUrl,true)
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4) {
        let res = JSON.parse(xhr.responseText).images;
        for(let i = 0, len = res.length; i < len; i++) {
          self.R[res[i].name] = new Image()
          self.R[res[i].name].src = res[i].url
          self.R[res[i].name].onload = function(){
            sourceNumber++
            self.ctx.clearRect(0,0,self.width,self.height)
            self.ctx.textAlign = "center"
            self.ctx.font = "20px 微软雅黑"
            self.ctx.fillText("资源正在加载 "+ sourceNumber + "/" + res.length + " 请耐心等待",self.width/2,self.height * (1-0.618))
            if(sourceNumber === res.length) {
              callback()
            }
          }
        }
      }
    }
    xhr.send(null)
  }

  Game.prototype.start = function(){
    let self = this

    self.sm = new SceneManager()

    self.timer = setInterval(function(){
      // 清屏
      self.ctx.clearRect(0,0,self.width,self.height)

      self.sm.update()
      self.sm.render()


      self.fno++
      self.ctx.textAlign = "left"
      self.ctx.font = "16px 宋体"
      self.ctx.fillText("FNO:"+self.fno,10,16)
    },20)

  }


}()