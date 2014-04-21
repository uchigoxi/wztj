/**
 * Created with JetBrains WebStorm.
 * User: tjrb
 * Date: 13-8-21
 * Time: 下午2:54
 * To change this template use File | Settings | File Templates.
 */



/**
 * 图片处理
 * @type {*}
 */
var fs = require('fs');
var zy = require('./tools.js');

var _getExtensions = function(filename){
    filename = filename.toLowerCase();
    return filename.substring(filename.indexOf('.'), filename.length);
};

var _rename = function (oldPath, newPath, newName, callback){

    zy.sleep(1000*1);
    fs.exists(newPath,function(exists){
        if(exists){
            fs.rename(oldPath, newPath + newName, function(err){
                if(err){
                    callback(err);
                    return;
                }
                callback(null,{path:newPath,name:newName});
            });
        }else{
            fs.mkdir(newPath,function(err){
                if(err){
                    callback(err);
                    return;
                }
                fs.rename(oldPath, newPath + newName, function(err){
                    if(err){
                        callback(err);
                        return;
                    }
                    callback(null,{path:newPath,name:newName});
                });
            })
        }
    });
}


var _fileUpload = function(option, callback){

    var extensions = _getExtensions(option.name);

    if(option.allowFiles != "*" && option.allowFiles.indexOf(extensions) < 0){
        callback(new Error("err extensions"));
        return;
    };

    if(option.maxSize < option.size){
        callback(new Error("max size"));
        return;
    }

    _rename(option.path, option.savePath, option.saveName + extensions, function(err, result){
        callback(err, result);
    });
};
module.exports.fileUpload = _fileUpload;
