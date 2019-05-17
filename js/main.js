
window.onload = function(){
    `use strict`;
    const csInterface = new CSInterface();
    themeManager.init();
    const fs = require(`fs`);
    const path = require(`path`);
    
    const dir_home = process.env[process.platform == `win32` ? `USERPROFILE` : `HOME`];
    const dir_desktop = require(`path`).join(dir_home, `Desktop`);//デスクトップパス
    
    const getFolders = document.getElementById(`getFolders`);
    const folderLists = document.getElementById(`folderLists`);
    const folderListsfromJsx = document.getElementById(`folderListsfromJsx`);
    const aSyncList = document.getElementById(`aSyncList`);
    const fromJSX = document.getElementById(`fromJSX`);
    const fromAsync = document.getElementById(`fromAsync`);
    
    const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;
    csInterface.evalScript(`$.evalFile("${extensionRoot}json2.js")`);//json2読み込み
    
    getFolders.addEventListener(`click`,()=>{
        const f = cep.fs.showOpenDialog(false,true,`open`);
        let fileList = [];
        getFiles(f.data[0]);
        console.log(fileList);
        writeLists(folderLists,fileList);
        
        const filesObj = fileList.map(v=> path.parse(v));//path.parseでファイル情報読みむ
        console.log(filesObj);
        
        function getFiles(folderPath){
            const files = fs.readdirSync(folderPath);
            const fullPathList = files.map(v => path.join(folderPath,v));//取得したパスを全て絶対パスに変換
            fullPathList.forEach(v=>{
                if(isFolder(v)){
                    getFiles(v);//フォルダーだったら再帰的に処理
                }else{
                    fileList.push(v);//ファイルだったらリストに追加してゆく
                }
            });
        }//getFiles--------------
        
    });
    
    fromJSX.addEventListener(`click`,()=>{
        csInterface.evalScript(`getFolders()`,(o)=>{
            const fileList = JSON.parse(o);
            writeLists(folderListsfromJsx,fileList);
        });
    });
    
    function isFolder(filePath){//ファイルが存在していてなおかつフォルダーだったらtrueを返す
        return fs.existsSync(filePath)&&fs.statSync(filePath).isDirectory();
    }
    
    function writeLists(parent,array){//htmlに書き込み
        while(parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
        array.forEach(v=>{
            const li = document.createElement(`li`);
            li.textContent = v;
            parent.appendChild(li);
        });
    }
    
}


