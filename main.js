const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// 
// 1.render 
// 2.Scroll 
// 3.Play/Seek/Pause

const heading = $('.header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')

const app = {
  
 
  songs: [
    {
      name: "Lỗi Tại Mưa",
      singer: "Bác Sĩ Hải",
      path: './music/Vicky Nhung  Lỗi Tại Mưa  Bác sĩ Hải  Giang tô remix   .mp3',
      image: "https://i1.sndcdn.com/avatars-V5eP6YOddwAW7KlR-2Ykxuw-t240x240.jpg"
    },
    {
      name: "Run Away",
      singer: "Glantis",
      path: "./music/Runaway U I - Galantis.mp3",
      image:
        "https://zmp3-photo-fbcrawler.zmdcdn.me/avatars/1/8/6/6/1866d8172253fe475e9e79e6f9902ae7.jpg"
    },
    {
      name: "Waiting For Love",
      singer: "Avicii",
      path:
        "./music/Waiting For Love - Avicii.mp3",
      image: "https://yt3.ggpht.com/ytc/AMLnZu9gtZe7Pd12rB7dlZP1u0BQ0Po8Py3-_JHLfNypyA=s900-c-k-c0x00ffffff-no-rj"
    },
    {
      name: "Yêu 5",
      singer: "Rhymastic",
      path: "./music/Yeu 5 (Xavius Royal Remix) [Feat. Dang Minh].mp3",
      image:
        "https://cdn.baogiaothong.vn/files/thao.nt/2017/03/16/maxresdefault-1118.jpg"
    },
    {
      name: "Closer",
      singer: "The Chainsmoker",
      path: "./music/The Chainsmokers - Closer (Lyric) ft. Halsey.mp3",
      image:
        "https://upload.wikimedia.org/wikipedia/vi/a/a5/Closer_%28featuring_Halsey%29_%28Official_Single_Cover%29_by_The_Chainsmokers.png"
    }, 
    {
      name: "Yêu 5",
      singer: "Rhymastic",
      path: "./music/Yeu 5 (Xavius Royal Remix) [Feat. Dang Minh].mp3",
      image:
        "https://cdn.baogiaothong.vn/files/thao.nt/2017/03/16/maxresdefault-1118.jpg"
    },
    {
      name: "Yêu 5",
      singer: "Rhymastic",
      path: "./music/Yeu 5 (Xavius Royal Remix) [Feat. Dang Minh].mp3",
      image:
        "https://cdn.baogiaothong.vn/files/thao.nt/2017/03/16/maxresdefault-1118.jpg"
    }
  ],

  currentIndex : 0,
  render: function(){
    let currentIndex = this.currentIndex
    const htmls =  this.songs.map(function(song,index){
      return `<div class="song ${index === currentIndex? 'active':''}" index=${index}>
                  <div class="thumb" style="background-image: url('${song.image}')">
                  </div>
                  <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                  </div>
                  <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                  </div>
                </div>`
    })
    $('.playlist').innerHTML = htmls.join('')
  },
   
  handleEvents : function(){
    // Xử lý khi ấn nút play 
    const _this=this
    const player = $('.player')
    const playBtn = $('.btn-toggle-play')
    const nextBtn = $('.btn-next')
    const prevBtn = $('.btn-prev')
    const randomBtn = $('.btn-random')
    const repBtn = $('.btn-repeat')
    const isRandom = false
    const isRepeat = false
    
    playBtn.onclick = function(){
      const isPlaying = false
      if(_this.isPlaying) {
        audio.pause()
      }else {
        audio.play()
      }
    }
    // Xử lý khi CD quay / dừng 
    const cdThumbAnimate = cdThumb.animate({
      transform : 'rotate(360deg)' 
    },
    {
      duration: 10000,
      iterations : Infinity
    })
    cdThumbAnimate.pause()

    // Xử lý khi song play :
    audio.onplay = function(){
      _this.isPlaying = true
      player.classList.add('playing')
      cdThumbAnimate.play()
    }
     // Xử lý khi song bị pause :
     audio.onpause = function(){
       _this.isPlaying = false
       player.classList.remove('playing')
       cdThumbAnimate.pause()
      }
   
    // Xử lý khi bài hát chạy  :
     let progressBtn = $('.progress')
      audio.ontimeupdate = function(){
        progressBtn.value = audio.currentTime/audio.duration*100
      }

    // Xử lí khi tua  :
      progressBtn.onchange = function(e){
        const seekTime = e.target.value/100*audio.duration
        audio.currentTime = seekTime
        console.log(progressBtn.value)
        progressBtn.value = e.target.value
        console.log(e.target.value)
      }
 
    // Xử lý khi kéo playlist :
    const cd = $('.cd')
    const cdWidth = cd.offsetWidth
    document.onscroll = function(){
      const scrollTop = document.documentElement.scrollTop || window.scrollY
      const newCdWidth = cdWidth - scrollTop
      cd.style.width = newCdWidth > 0 ? newCdWidth +'px' : 0
      cd.style.opacity = newCdWidth / cdWidth > 0 ? newCdWidth / cdWidth : 0
    }

    // Xử lý khi ấn nút next song :
    nextBtn.onclick = function(){
      if(_this.isRandom){
        _this.randomSong()
        _this.loadCurrentSong() 
      }else{
       _this.nextSong()
       _this.loadCurrentSong()
      }
      audio.play()
      _this.render()
      _this.scrollToActivesong()
    }
    
    // Xử lý khi ấn nút prev song :
    prevBtn.onclick = function(){
      if(_this.isRandom){
        _this.randomSong()
        _this.loadCurrentSong()
      }else{
       _this.prevSong()
       _this.loadCurrentSong()
      }
      audio.play()
      _this.render()
      _this.scrollToActivesong()
    }
    // Xử lý khi ấn nút random : 
    randomBtn.onclick = function(){
      _this.isRandom = !_this.isRandom
      randomBtn.classList.toggle("active",_this.isRandom)
      if(_this.isRepeat){
        _this.isRepeat = false
        repBtn.classList.remove("active")
      }
    }
    // Xử lý khi ấn nút repeat : 
    repBtn.onclick = function(){
      _this.isRepeat = !_this.isRepeat
      repBtn.classList.toggle('active',_this.isRepeat)
      if(_this.isRandom){
        _this.isRandom = false
        randomBtn.classList.remove('active')
      }
    }
    // Xử lý khi audio ended :
    audio.onended = function(){
      if(_this.isRandom){
        _this.randomSong()
        _this.nextSong()
        _this.loadCurrentSong()
      }else if (_this.isRepeat){
        audio.play()
      }
      else{
        _this.nextSong()
        _this.loadCurrentSong()
      }
        audio.play()
        _this.render()
        _this.scrollToActivesong()
    }
    // Xử lý khi ấn vào playlist :
    $('.playlist').onclick = function(e){
      const songNode = e.target.closest('.song:not(.active)')
      // Xử lý khi ấn vào bài hát:
      if(songNode || e.target.closest('.option')){
        if(songNode){
          console.log(songNode.getAttribute('index'))
          _this.currentIndex = Number(songNode.getAttribute('index'))
          _this.loadCurrentSong()
          _this.render()
          _this.scrollToActivesong()
          audio.play()

        }
        // Xử lý khi ấn vào option
        else if(e.target.closest('.option')){
          console.log('option')
        }
      }
    }
  },
  nextSong : function(){
    this.currentIndex++
    if(this.currentIndex >= this.songs.length){
      this.currentIndex = 0 
    }
  },
  prevSong: function(){
    this.currentIndex--
    if(this.currentIndex < 0){
      this.currentIndex = this.songs.length -1
    }
  },
  randomSong : function(){
    let newIndex 
    do {
      newIndex = Math.floor(Math.random()*this.songs.length)
    }while(newIndex === this.currentIndex)
      this.currentIndex = newIndex
      console.log(this.currentIndex)
  },

  defineProperties : function(){
    Object.defineProperty(this, 'currentSong',{
      get: function(){
        return this.songs[this.currentIndex]
      }
    })
  },
  scrollToActivesong : function(){
    setTimeout(()=>{
      $('.song.active').scrollIntoView({behavior: "smooth", block: "center",})
    },200)
  },
  loadCurrentSong : function(){
    heading.innerHTML = this.currentSong.name
    cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
    audio.src = this.currentSong.path
  },
  start: function(){

    // Định nghĩa  các thuộc tính cho object 
    this.defineProperties()
    
    // Xử lý các sự kiện
    this.handleEvents()

    // Tải thông tin bài hát đầu tiên vào Ui khi start ứng dụng
    this.loadCurrentSong()

    // Render bài hát
    this.render()
  }
  
}
app.start()
