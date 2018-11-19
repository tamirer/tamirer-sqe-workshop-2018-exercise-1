import $ from 'jquery';
import {parseCode,getHTML} from './code-analyzer';

//elem = {line,type,name,condition,value}
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