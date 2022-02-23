Lulu 嚕路 [網站 DEMO](https://hsuan.info/LuluBike/)

# 專案介紹
本專案為「Lulu 嚕路自行車景點平台」前端原始碼，採用前端技術 React Hooks，串接交通部 API 進行開發。
<img src="https://hsuanxcollection.files.wordpress.com/2022/02/cover-1-1-1.png" width = "800"  alt="專案封面" align=center />

## 專案展示
### 頁面架構
<img src="https://hsuanxcollection.files.wordpress.com/2022/02/lulu-e7b6b2e9a081-1.png" width = "800"  alt="頁面架構" align=center />

### 網頁功能
包含定位與附近自行車車站、自行車道、車道周邊自行車站、車道周邊景點等四大功能
 <img src="https://hsuanxcollection.files.wordpress.com/2022/02/e688aae59c96-2022-02-22-e4b88ae58d881.13.28-1.png" width = "800"  alt="網頁架構" align=center />

[附近車站]
* 定位與搜尋：可於定位後查詢周邊自行車站與自行車租還狀態

[自行車道]
* 搜尋車道：可依照城市、自行車道名稱做車道搜尋
* 車道周邊車站：搜尋後可查看自行車道 500 公尺內的公共自行車出租站點與租還狀況

[周邊景點]
* 瀏覽餐廳：搜尋車道後可查看車道周邊 1000 公尺內的景點資訊


## 專案執行方式
執行 npm install 安裝專案所需套件
執行 npm run start，在 http://localhost:3000 啟動專案
執行 npm run dev
在 GitHub Pages 部屬專案網站

## 前端技術

### 1. 前端框架
* React Hooks
* React DOM

### 2. 第三方套件
* React Redux： 處理 Global State
* Style-components： JSX 語法撰寫 CSS 樣式
* react-map-gl：載入地圖功能（Marker、Popup、Layer）
* fontawesome：icon 圖示載入
* ESLint：檢查語法，統一程式撰寫風格
* Prettier：統一程式碼格式
* gh-pages：快速部署方法

### 3. 第三方 API
* [交通部 MOTC Transport API](https://ptx.transportdata.tw/MOTC/?urls.primaryName=%E8%87%AA%E8%A1%8C%E8%BB%8AV2#/)：自行車道、公共自行車站、自行車站出租借資訊
* [交通部 MOTC Transport API](https://ptx.transportdata.tw/MOTC/?urls.primaryName=%E8%A7%80%E5%85%89V2)：景點資訊

## 專案聲明
UI Design： Stephanie Chang 
此專案為六角學院 F2E 挑戰賽作品
所有內容僅供 網頁 Demo 使用，不具任何商業用途
