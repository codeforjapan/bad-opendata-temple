import React from 'react';
import AsciiArt from './asciiArt'

interface SakadaruPropertyType {
    name: string
}

//中央をデコレーションで囲って指定した長さにする。
function line(center: string, length: number, decoration: string = " "):string {
    if (length < center.length) {
        return decoration.repeat(length).substr(0,length);
    } else {
        var sideLength = (length-center.length)/2;
        return decoration.repeat(sideLength).substr(0,sideLength)
            + center + decoration.repeat(sideLength).substr(0,sideLength);
    }
}

//全体的にスペースを取る
function spacer(center: Array<string>, spaces: number, decoration: string = " "):Array<string> {
    return center.map((value)=>decoration.repeat(spaces).substr(0,spaces)+value);
}

//酒樽のヘッダーを作る
function header(length: number):Array<string> {
    var output;
    //全体の長さによって装飾を変える
    if(length < 6) {
        output = ["=".repeat(length)];
    } else if(length < 10) {
        if(length % 2 == 0) {
            output = ["=".repeat(length)];
            output.push(line(" 奉納 ", length-1, "=")); //漢字はちょっと長い
            output.push("=".repeat(length));
        } else {
            output = ["=".repeat(length)];
            output.push(line(" 奉 納 ", length-1, "=")); //漢字はちょっと長い
            output.push("=".repeat(length));
        }
    } else if(length % 2 == 0) {
        output = [line("____", length)];
        output.push(line(line("@@@@", length/2, "="),length, "-"));
        output.push(line(line(" 奉納 ", length-6, "+"),length-1,"-")); //漢字はちょっと長い
        output.push("=".repeat(length));
    } else {
        output = [line("___", length)];
        output.push(line(line("@@@", length/2, "="),length, "-"));
        output.push(line(line(" 奉 納 ", length-6, "+"),length-1,"-")); //漢字はちょっと長い
        output.push("=".repeat(length));
    }
    return output;
}

//酒樽のフッターを作る
function footer(length: number):Array<string> {
    var output;
    //全体の長さによって装飾を変える
    if(length < 8) {
        output = ["=".repeat(length)];
    }else{
        output = ["=".repeat(length)];
        output.push(line("=".repeat(length-4),length));
    }
    return output;
}
//酒樽の両脇を作る
function side(content: Array<string>):Array<string> {
    var height = content.length;
    var rownum = 0;
    var width;
    
    return content.map(function(line){
        rownum++;
        width = (rownum > height/2) ? height - rownum + 1 : rownum;
        return " ".repeat(height-width)+"(".repeat(width)+line+")".repeat(width)+" ".repeat(height-width);
    });

}
const Sakadaru = (props: SakadaruPropertyType) => {

    const sakadaruDeoration = (data: string) => {
        var letters = data.split(/\r?\n/g);
        //外堀の長さを決める
        var length = 0;
        var height = letters.length;
        //右端にスペースを追加
        letters = letters.map(function(line){
            length = line.length > length ? line.length + 1 : length;
            return line + " ";
        });
        //酒樽の装飾をつける
        var output = spacer(header(length), height);
        output = output.concat(side(letters));
        output = output.concat(spacer(footer(length), height));
        return output.join('\n');
    }

    return (
        <AsciiArt name={props.name} decoration={sakadaruDeoration} />
    )
}

export default Sakadaru