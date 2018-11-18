import $ from 'jquery';
import {parseCode,getHTML} from './code-analyzer';

//elem = {line,type,name,condition,value}

/*
var fs = require('fs');
var jsdom = require("jsdom").jsdom;
var markup = fs.readFileSync('/Volumes/External1/src/Javascript/foo.html');
var doc = jsdom(markup, {});
*/

if (typeof document !== 'undefined')
    $(document).ready(function () {
        $('#codeSubmissionButton').click(() => {
            let codeToParse = $('#codePlaceholder').val();
            let parsedCode = parseCode(codeToParse);
            let toHTML = getHTML(parsedCode);
            $('#table').empty();
            $('#table').append(toHTML);
        });
    });