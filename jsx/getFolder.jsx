
    function getFolders(){
        var fileList = [];//ファイルリスト用配列
        var mainFolder = Folder.selectDialog("フォルダを選択してください");
        $.writeln(mainFolder);
        getFilesFromPath(mainFolder);
        $.writeln(fileList);
        return JSON.stringify(fileList);//js側にリストを渡す
        
        function getFilesFromPath(folderPath){
            if(!folderPath){
                return false;//ウインドウでキャンセルを押したら中止
            }
            var files = folderPath.getFiles();
            for(var i=0;i<files.length;i++){
                if(files[i].getFiles !== undefined){//フォルダーだったら繰り返す
                    getFilesFromPath(files[i]);//再帰的に処理
                }else{
                    fileList.push(decodeURI(files[i]));//日本語にも対応するようにデコード
                }
            }
        }//getFilesFromPath================
    }//getFolders==================
