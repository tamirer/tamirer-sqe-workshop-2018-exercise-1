import * as esprima from 'esprima';
import escodegen from 'escodegen';

let isInIf = false;

const parseCode = (codeToParse) => {
    return esprima.parseScript(codeToParse,{loc:true});
};

export function getHTML(parsedCode) {
    console.log(JSON.stringify(parsedCode));
    let res = getElem(parsedCode);
    let toArray = treeTo2DArray(res);
    return makeTableHTML(toArray);
}

export function treeTo2DArray(tree) {
    let res = [];
    tree.forEach((object)=>{
        let line = object.line;
        let type = object.type;
        type = beautifyType(type);
        type = getType(type);
        let name = object.name === null ? '' : object.name ;
        let condition = object.condition === null ? '' : object.condition ;
        let value = object.value === null ? '' : object.value ;

        let arr = [line,type,name,condition,value];
        res.push(arr);
    });
    return res;
}

export function makeTableHTML(myArray) {
    let result = '<table border=1>';
    result += '<thead>' +
        '<tr>' +
        '<th>Line</th><th>Type</th><th>Name</th><th>Condition</th><th>Value</th>' +
        '</tr>' +
        '</thead>';
    for(let i=0; i<myArray.length; i++) {
        result += '<tr>';
        for(let j=0; j<myArray[i].length; j++){
            result += '<td>'+myArray[i][j]+'</td>';
        }
        result += '</tr>';
    }
    result += '</table>';
    return result;
}



function getType(type) {
    if(type === 'ReturnStatement'){
        type = 'return statement';
    }
    else if(type === 'IfStatement'){
        type = 'if statement';
    }
    else if(type === 'ForStatement'){
        type = 'for statement';
    }
    return type;
}

function beautifyType(type) {
    if(type === 'FunctionDeclaration'){
        type = 'function deceleration';
    }
    else if(type === 'VariableDeclaration'){
        type = 'variable deceleration';
    }
    else if(type === 'AssignmentExpression'){
        type = 'assignment expression';
    }
    else if(type === 'WhileStatement'){
        type = 'while statement';
    }
    return type;
}




function concatElem(result,item) {
    if(item.type === 'VariableDeclaration') {
        result = result.concat(getVarDec(item));
    }
    else if(item.type === 'FunctionDeclaration'){
        result = result.concat(getFunDec(item));
    }
    else if(item.type === 'IfStatement'){
        result = result.concat(getIfExp(item));
    }
    return concatLoop(result,item);
}

function concatLoop(result,item) {
    if(item.type === 'WhileStatement'){
        result = result.concat(getWhileExp(item));
    }
    else if(item.type === 'ForStatement'){
        result = result.concat(getForExp(item));
    }
    return result;
}

function pushElem(result,item) {
    if(item.type === 'ExpressionStatement' && item.expression.type === 'AssignmentExpression')
        result.push(getAssExp(item));

    else if(item.type === 'ReturnStatement'){
        result.push(getRetExp(item));
    }
    return result;
}

export function getElem(parsedCode) {
    let result = [];
    parsedCode.body.forEach((item) => {
        result = concatElem(result,item);
        result = pushElem(result,item);
    });
    return result;
}



function getForExp(item){
    let res = [];
    let type = item.type;
    let line = item.loc.start.line;
    let value = null;
    let name = null;
    let init = escodegen.generate(item.init);
    let test = escodegen.generate(item.test);
    let update = escodegen.generate(item.update);
    let condition = init + '; ' + test + '; ' + update;
    res.push({line:line,type:type,name:name,condition:condition,value:value});
    res = res.concat(getElem(item.body));
    return res;
}

function getRetExp(item) {
    let type = item.type;
    let value = escodegen.generate(item.argument);
    let line = item.loc.start.line;
    let name = null;
    let condition = null;
    return {line:line,type:type,name:name,condition:condition,value:value};
}

function getIfExp(item){
    let result = [];
    let condition = escodegen.generate(item.test);
    let line = item.loc.start.line;
    let value = null;
    let name = null;
    let type = isInIf ? 'else if statement' : item.type;
    result.push({line:line,type:type,name:name,condition:condition,value:value});
    result = result.concat(getElem({body:[item.consequent]}));
    isInIf = true;
    let temp = item.alternate === null ? [] : getElem({body:[item.alternate]});
    if(temp.length > 0 && temp[0].type !== 'else if statement')
        temp[0].type = 'else statement';
    result = result.concat(temp);
    isInIf = false;
    return result;
}

function getWhileExp(item) {
    let result = [];
    let condition = escodegen.generate(item.test);
    let name = null;
    let value = null;
    let line = item.loc.start.line;
    let type = item.type;
    let whileExp = {line:line,type:type,name:name,condition:condition,value:value};
    result.push(whileExp);
    result = result.concat(getElem(item.body));
    return result;
}

function getAssExp(item) {
    let exp = item.expression;
    let type = exp.type;
    let name = exp.left.name;
    let value = escodegen.generate(exp.right);
    let condition = null;
    let line = item.loc.start.line;
    return {line:line,type:type,name:name,condition:condition,value:value};
}

function getFunDec(item) {
    let result = [];
    let type = item.type;
    let line = item.loc.start.line;
    let condition = null,value = null;
    let id = item.id, params = item.params;
    let name = id.name;
    result.push({line:line,type:type,name:name,condition:condition,value:value});
    params.forEach((param) => {
        type = 'VariableDeclaration';
        name = param.name;
        line = param.loc.start.line;
        result.push({line:line,type:type,name:name,condition:condition,value:value});
    });


    result = result.concat(getElem(item.body));

    return result;
}

function getVarDec(item) {
    let result = [];
    let type = item.type;
    let condition = null;
    item.declarations.forEach((decl) => {
        let id = decl.id;
        let init = decl.init;

        let value = init === null ? null : escodegen.generate(init);
        let name = id.name;
        let line = id.loc.start.line;
        result.push({line:line,type:type,name:name,condition:condition,value:value});
    });
    return result;
}

export {parseCode};
