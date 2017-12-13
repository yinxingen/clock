function clock() {
    this.clock = $("#clock")[0]
    this.size = 300
    this.clock.width = this.size;
    this.clock.height = this.size;
    this.ctx = this.clock.getContext("2d")
    this.pi = Math.PI

    // this.s = new Date().getSeconds()
    // this.h = new Date().getHours()
    // this.m = new Date().getMinutes()

    this.init()

    setInterval(function() {
        this.ctx.clearRect(0, 0, this.size, this.size)
        this.drawPan()
        this.drawKedu()
        this.drawSP()
        this.drawM()
        this.drawH()
    }.bind(this), 1000)
}

clock.prototype = {
    init: function() {
        this.drawPan()
        this.drawKedu()
        this.drawSP()
        this.drawM()
        this.drawH()
    },

    //画表盘
    drawPan: function() {
        this.draw(function() {
            this.ctx.save(); //保存当前环境的状态  
            this.ctx.translate(this.size / 2, this.size / 2); //重新映射画布的（0,0）位置设置为（r，r）  
            this.ctx.beginPath(); //重置当前路径  
            this.ctx.lineWidth = 10; //设置当前的线条宽度  
            this.ctx.arc(0, 0, this.size / 2 - this.ctx.lineWidth / 2, 0, 2 * Math.PI, false);
            this.ctx.fill()
            this.drawNumber()
        }.bind(this))
    },

    //画刻度
    drawKedu: function() {
        var w = 0
        for (let i = 0; i < 60; i++) {
            w = i % 5 == 0 ? 20 : 15
            this.draw(function() {
                this.ctx.translate(this.size / 2, this.size / 2)
                this.ctx.rotate(i * this.pi / 30)
                this.ctx.moveTo(this.size / 2 - w, 0)
                this.ctx.lineTo(this.size / 2 - 5, 0)
                this.ctx.strokeStyle = '#fff'
                this.ctx.stroke()
            }.bind(this))
        }
    },

    //画数字
    drawNumber: function() {
        this.ctx.font = 18 + 'px Arial'
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2]
        hourNumbers.forEach(function(number, i) {
            var rad = 2 * Math.PI / 12 * i
            var x = Math.cos(rad) * (120)
            var y = Math.sin(rad) * (120)
            this.ctx.fillStyle = '#fff'
            this.ctx.fillText(number, x, y) //方法在画布上绘制填色的文本。文本的默认颜色是黑色。为每个坐标x和y上的设置数值number  
        }.bind(this))
    },

    //画秒针
    drawSP: function() {
        this.draw(function() {

            var s = new Date().getSeconds()
            console.log(s)
            this.ctx.translate(this.size / 2, this.size / 2)
            this.ctx.rotate(s * this.pi / 30)
            this.ctx.moveTo(0, 30);
            this.ctx.lineTo(0, -120);
            this.ctx.strokeStyle = "red";
            this.ctx.stroke()
        }.bind(this))
    },

    //画分针
    drawM: function() {
        this.draw(function() {
            var m = new Date().getMinutes()
            let s = new Date().getSeconds()
            this.ctx.translate(this.size / 2, this.size / 2)
            this.ctx.rotate(s * this.pi / 1800 + m * this.pi / 30)
            this.ctx.moveTo(0, 20);
            this.ctx.lineTo(0, -100);
            this.ctx.strokeStyle = "yellow";
            this.ctx.stroke()
        }.bind(this))
    },

    //画时针
    drawH: function() {
        this.draw(function() {
            let h = new Date().getHours()
            let m = new Date().getMinutes()
            this.ctx.translate(this.size / 2, this.size / 2)
            this.ctx.rotate(m * this.pi / 360 + h * this.pi / 6)
            this.ctx.moveTo(0, 10);
            this.ctx.lineTo(0, -80);
            this.ctx.strokeStyle = '#fff'
            this.ctx.stroke()
        }.bind(this))
    },

    draw: function(cb) {
        this.ctx.save()
        this.ctx.beginPath()
        cb()
        this.ctx.closePath()
        this.ctx.restore()
    }
}