
## 源码目录介绍
```
./js
├── base                                   // 定义游戏开发基础类
│   ├── animatoin.js                       // 帧动画的简易实现（微信小程序需要，移植到web后已不需要）
│   ├── pool.js                            // 对象池的简易实现（移植到web后已不需要）
│   └── sprite.js                          // 游戏基本元素精灵类（用于载入照片，可以被简化舍弃）
├── libs
│   ├── symbol.js                          // ES6 Symbol简易兼容（移植到web后不需要）
│   └── weapp-adapter.js                   // 小游戏适配器（移植到web后不需要）
├── runtime
│   ├── background.js                      // 背景类
│   ├── element.js                         // 绘制元素方块
│   ├── gameinfo.js                        // 用于展示分数和结算界面
│   ├── login.js                           // 绘制游戏的开始按钮
│   └── music.js                           // 全局音效管理器
├── databus.js                             // 管控游戏状态（移植到web后被舍弃）
└── app.js                                 // 游戏主体
game.js                                    // 游戏启动，没啥用处
index.html                                 // 网页模板，包括对网页显示的适应，canvas对象初始化，游戏启动button。
```