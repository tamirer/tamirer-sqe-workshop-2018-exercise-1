import assert from 'assert';
import {parseCode, getElem, treeTo2DArray, makeTableHTML, getHTML} from '../src/js/code-analyzer';

describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('')),
            '{"type":"Program","body":[],"sourceType":"script","loc":{"start":{"line":0,"column":0},"end":{"line":0,"column":0}}}'
        );
    });

    it('is parsing a simple variable declaration correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let a = 1;')),
            '{"type":"Program","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"a","loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":5}}},"init":{"type":"Literal","value":1,"raw":"1","loc":{"start":{"line":1,"column":8},"end":{"line":1,"column":9}}},"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9}}}],"kind":"let","loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":10}}}],"sourceType":"script","loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":10}}}'
        );
    });

    it('test for statement', ()=>{

        assert.deepEqual(
            getElem({'type':'Program','body':[{'type':'ForStatement','init':{'type':'VariableDeclaration','declarations':[{'type':'VariableDeclarator','id':{'type':'Identifier','name':'i','loc':{'start':{'line':1,'column':8},'end':{'line':1,'column':9}}},'init':{'type':'Literal','value':0,'raw':'0','loc':{'start':{'line':1,'column':12},'end':{'line':1,'column':13}}},'loc':{'start':{'line':1,'column':8},'end':{'line':1,'column':13}}}],'kind':'var','loc':{'start':{'line':1,'column':4},'end':{'line':1,'column':13}}},'test':{'type':'BinaryExpression','operator':'<','left':{'type':'Identifier','name':'i','loc':{'start':{'line':1,'column':15},'end':{'line':1,'column':16}}},'right':{'type':'Literal','value':4,'raw':'4','loc':{'start':{'line':1,'column':19},'end':{'line':1,'column':20}}},'loc':{'start':{'line':1,'column':15},'end':{'line':1,'column':20}}},'update':{'type':'UpdateExpression','operator':'++','argument':{'type':'Identifier','name':'i','loc':{'start':{'line':1,'column':22},'end':{'line':1,'column':23}}},'prefix':false,'loc':{'start':{'line':1,'column':22},'end':{'line':1,'column':25}}},'body':{'type':'BlockStatement','body':[],'loc':{'start':{'line':1,'column':26},'end':{'line':1,'column':28}}},'loc':{'start':{'line':1,'column':0},'end':{'line':1,'column':28}}}],'sourceType':'script','loc':{'start':{'line':1,'column':0},'end':{'line':1,'column':28}}}),
            [{'line':1,'type':'ForStatement','name':null,'condition':'var i = 0;; i < 4; i++','value':null}]
        );
    });

    it('test treeToArray function', ()=>{

        assert.deepEqual(
            treeTo2DArray([{'line':1,'type':'FunctionDeclaration','name':'binarySearch','condition':null,'value':null},{'line':1,'type':'VariableDeclaration','name':'X','condition':null,'value':null},{'line':1,'type':'VariableDeclaration','name':'V','condition':null,'value':null},{'line':1,'type':'VariableDeclaration','name':'n','condition':null,'value':null},{'line':2, 'type':'VariableDeclaration','name':'low','condition':null,'value':null},{'line':2,'type':'VariableDeclaration','name':'high','condition':null,'value':null},{'line':2,'type':'VariableDeclaration','name':'mid','condition':null,'value':null},{'line':3,'type':'AssignmentExpression','name':'low','condition':null,'value':'0'},{'line':4,'type':'AssignmentExpression','name':'high','condition':null,'value':'n - 1'},{'line':5,'type':'WhileStatement','name':null,'condition':'low <= high','value':null},{'line':6,'type':'AssignmentExpression','name':'mid','condition':null,'value':'(low + high) / 2'},{'line':7,'type':'IfStatement','name':null,'condition':'X < V[mid]','value':null},{'line':8,'type':'AssignmentExpression','name':'high','condition':null,'value':'mid - 1'},{'line':9,'type':'else if statement','name':null,'condition':'X > V[mid]','value':null},{'line':10,'type':'AssignmentExpression','name':'low','condition':null,'value':'mid + 1'},{'line':12,'type':'else statement','name':null,'condition':null,'value':'mid'},{'line':14,'type':'ReturnStatement','name':null,'condition':null,'value':'-1'}]),
            [
                [
                    1,
                    'function deceleration',
                    'binarySearch',
                    '',
                    ''
                ],
                [
                    1,
                    'variable deceleration',
                    'X',
                    '',
                    ''
                ],
                [
                    1,
                    'variable deceleration',
                    'V',
                    '',
                    ''
                ],
                [
                    1,
                    'variable deceleration',
                    'n',
                    '',
                    ''
                ],
                [
                    2,
                    'variable deceleration',
                    'low',
                    '',
                    ''
                ],
                [
                    2,
                    'variable deceleration',
                    'high',
                    '',
                    ''
                ],
                [
                    2,
                    'variable deceleration',
                    'mid',
                    '',
                    ''
                ],
                [
                    3,
                    'assignment expression',
                    'low',
                    '',
                    '0'
                ],
                [
                    4,
                    'assignment expression',
                    'high',
                    '',
                    'n - 1'
                ],
                [
                    5,
                    'while statement',
                    '',
                    'low <= high',
                    ''
                ],
                [
                    6,
                    'assignment expression',
                    'mid',
                    '',
                    '(low + high) / 2'
                ],
                [
                    7,
                    'if statement',
                    '',
                    'X < V[mid]',
                    ''
                ],
                [
                    8,
                    'assignment expression',
                    'high',
                    '',
                    'mid - 1'
                ],
                [9, 'else if statement', '', 'X > V[mid]', ''],
                [10, 'assignment expression', 'low', '', 'mid + 1'],
                [12, 'else statement', '', '', 'mid'],
                [14, 'return statement', '', '', '-1']
            ]
        );
    });

    it('test makeHTMLTable function', ()=>{

        assert.deepEqual(
            getHTML({'type':'Program','body':[{'type':'ForStatement','init':{'type':'VariableDeclaration','declarations':[{'type':'VariableDeclarator','id':{'type':'Identifier','name':'i','loc':{'start':{'line':1,'column':8},'end':{'line':1,'column':9}}},'init':{'type':'Literal','value':0,'raw':'0','loc':{'start':{'line':1,'column':12},'end':{'line':1,'column':13}}},'loc':{'start':{'line':1,'column':8},'end':{'line':1,'column':13}}}],'kind':'var','loc':{'start':{'line':1,'column':4},'end':{'line':1,'column':13}}},'test':{'type':'BinaryExpression','operator':'<','left':{'type':'Identifier','name':'i','loc':{'start':{'line':1,'column':15},'end':{'line':1,'column':16}}},'right':{'type':'Literal','value':4,'raw':'4','loc':{'start':{'line':1,'column':19},'end':{'line':1,'column':20}}},'loc':{'start':{'line':1,'column':15},'end':{'line':1,'column':20}}},'update':{'type':'UpdateExpression','operator':'++','argument':{'type':'Identifier','name':'i','loc':{'start':{'line':1,'column':22},'end':{'line':1,'column':23}}},'prefix':false,'loc':{'start':{'line':1,'column':22},'end':{'line':1,'column':25}}},'body':{'type':'BlockStatement','body':[],'loc':{'start':{'line':1,'column':26},'end':{'line':1,'column':28}}},'loc':{'start':{'line':1,'column':0},'end':{'line':1,'column':28}}}],'sourceType':'script','loc':{'start':{'line':1,'column':0},'end':{'line':1,'column':28}}}),
            '<table border=1><thead><tr><th>Line</th><th>Type</th><th>Name</th><th>Condition</th><th>Value</th></tr></thead><tr><td>1</td><td>for statement</td><td></td><td>var i = 0;; i < 4; i++</td><td></td></tr></table>'
        );
    });

    it('test full function', ()=>{

        assert.deepEqual(
            getElem({'type':'Program','body':[{'type':'FunctionDeclaration','id':{'type':'Identifier','name':'binarySearch','loc':{'start':{'line':1,'column':9},'end':{'line':1,'column':21}}},'params':[{'type':'Identifier','name':'X','loc':{'start':{'line':1,'column':22},'end':{'line':1,'column':23}}},{'type':'Identifier','name':'V','loc':{'start':{'line':1,'column':25},'end':{'line':1,'column':26}}},{'type':'Identifier','name':'n','loc':{'start':{'line':1,'column':28},'end':{'line':1,'column':29}}}],'body':{'type':'BlockStatement','body':[{'type':'VariableDeclaration','declarations':[{'type':'VariableDeclarator','id':{'type':'Identifier','name':'low','loc':{'start':{'line':2,'column':8},'end':{'line':2,'column':11}}},'init':null,'loc':{'start':{'line':2,'column':8},'end':{'line':2,'column':11}}},{'type':'VariableDeclarator','id':{'type':'Identifier','name':'high','loc':{'start':{'line':2,'column':13},'end':{'line':2,'column':17}}},'init':null,'loc':{'start':{'line':2,'column':13},'end':{'line':2,'column':17}}},{'type':'VariableDeclarator','id':{'type':'Identifier','name':'mid','loc':{'start':{'line':2,'column':19},'end':{'line':2,'column':22}}},'init':null,'loc':{'start':{'line':2,'column':19},'end':{'line':2,'column':22}}}],'kind':'let','loc':{'start':{'line':2,'column':4},'end':{'line':2,'column':23}}},{'type':'ExpressionStatement','expression':{'type':'AssignmentExpression','operator':'=','left':{'type':'Identifier','name':'low','loc':{'start':{'line':3,'column':4},'end':{'line':3,'column':7}}},'right':{'type':'Literal','value':0,'raw':'0','loc':{'start':{'line':3,'column':10},'end':{'line':3,'column':11}}},'loc':{'start':{'line':3,'column':4},'end':{'line':3,'column':11}}},'loc':{'start':{'line':3,'column':4},'end':{'line':3,'column':12}}},{'type':'ExpressionStatement','expression':{'type':'AssignmentExpression','operator':'=','left':{'type':'Identifier','name':'high','loc':{'start':{'line':4,'column':4},'end':{'line':4,'column':8}}},'right':{'type':'BinaryExpression','operator':'-','left':{'type':'Identifier','name':'n','loc':{'start':{'line':4,'column':11},'end':{'line':4,'column':12}}},'right':{'type':'Literal','value':1,'raw':'1','loc':{'start':{'line':4,'column':15},'end':{'line':4,'column':16}}},'loc':{'start':{'line':4,'column':11},'end':{'line':4,'column':16}}},'loc':{'start':{'line':4,'column':4},'end':{'line':4,'column':16}}},'loc':{'start':{'line':4,'column':4},'end':{'line':4,'column':17}}},{'type':'WhileStatement','test':{'type':'BinaryExpression','operator':'<=','left':{'type':'Identifier','name':'low','loc':{'start':{'line':5,'column':11},'end':{'line':5,'column':14}}},'right':{'type':'Identifier','name':'high','loc':{'start':{'line':5,'column':18},'end':{'line':5,'column':22}}},'loc':{'start':{'line':5,'column':11},'end':{'line':5,'column':22}}},'body':{'type':'BlockStatement','body':[{'type':'ExpressionStatement','expression':{'type':'AssignmentExpression','operator':'=','left':{'type':'Identifier','name':'mid','loc':{'start':{'line':6,'column':8},'end':{'line':6,'column':11}}},'right':{'type':'BinaryExpression','operator':'/','left':{'type':'BinaryExpression','operator':'+','left':{'type':'Identifier','name':'low','loc':{'start':{'line':6,'column':15},'end':{'line':6,'column':18}}},'right':{'type':'Identifier','name':'high','loc':{'start':{'line':6,'column':21},'end':{'line':6,'column':25}}},'loc':{'start':{'line':6,'column':15},'end':{'line':6,'column':25}}},'right':{'type':'Literal','value':2,'raw':'2','loc':{'start':{'line':6,'column':27},'end':{'line':6,'column':28}}},'loc':{'start':{'line':6,'column':14},'end':{'line':6,'column':28}}},'loc':{'start':{'line':6,'column':8},'end':{'line':6,'column':28}}},'loc':{'start':{'line':6,'column':8},'end':{'line':6,'column':29}}},{'type':'IfStatement','test':{'type':'BinaryExpression','operator':'<','left':{'type':'Identifier','name':'X','loc':{'start':{'line':7,'column':12},'end':{'line':7,'column':13}}},'right':{'type':'MemberExpression','computed':true,'object':{'type':'Identifier','name':'V','loc':{'start':{'line':7,'column':16},'end':{'line':7,'column':17}}},'property':{'type':'Identifier','name':'mid','loc':{'start':{'line':7,'column':18},'end':{'line':7,'column':21}}},'loc':{'start':{'line':7,'column':16},'end':{'line':7,'column':22}}},'loc':{'start':{'line':7,'column':12},'end':{'line':7,'column':22}}},'consequent':{'type':'ExpressionStatement','expression':{'type':'AssignmentExpression','operator':'=','left':{'type':'Identifier','name':'high','loc':{'start':{'line':8,'column':12},'end':{'line':8,'column':16}}},'right':{'type':'BinaryExpression','operator':'-','left':{'type':'Identifier','name':'mid','loc':{'start':{'line':8,'column':19},'end':{'line':8,'column':22}}},'right':{'type':'Literal','value':1,'raw':'1','loc':{'start':{'line':8,'column':25},'end':{'line':8,'column':26}}},'loc':{'start':{'line':8,'column':19},'end':{'line':8,'column':26}}},'loc':{'start':{'line':8,'column':12},'end':{'line':8,'column':26}}},'loc':{'start':{'line':8,'column':12},'end':{'line':8,'column':27}}},'alternate':{'type':'IfStatement','test':{'type':'BinaryExpression','operator':'>','left':{'type':'Identifier','name':'X','loc':{'start':{'line':9,'column':17},'end':{'line':9,'column':18}}},'right':{'type':'MemberExpression','computed':true,'object':{'type':'Identifier','name':'V','loc':{'start':{'line':9,'column':21},'end':{'line':9,'column':22}}},'property':{'type':'Identifier','name':'mid','loc':{'start':{'line':9,'column':23},'end':{'line':9,'column':26}}},'loc':{'start':{'line':9,'column':21},'end':{'line':9,'column':27}}},'loc':{'start':{'line':9,'column':17},'end':{'line':9,'column':27}}},'consequent':{'type':'ExpressionStatement','expression':{'type':'AssignmentExpression','operator':'=','left':{'type':'Identifier','name':'low','loc':{'start':{'line':10,'column':12},'end':{'line':10,'column':15}}},'right':{'type':'BinaryExpression','operator':'+','left':{'type':'Identifier','name':'mid','loc':{'start':{'line':10,'column':18},'end':{'line':10,'column':21}}},'right':{'type':'Literal','value':1,'raw':'1','loc':{'start':{'line':10,'column':24},'end':{'line':10,'column':25}}},'loc':{'start':{'line':10,'column':18},'end':{'line':10,'column':25}}},'loc':{'start':{'line':10,'column':12},'end':{'line':10,'column':25}}},'loc':{'start':{'line':10,'column':12},'end':{'line':10,'column':26}}},'alternate':{'type':'ReturnStatement','argument':{'type':'Identifier','name':'mid','loc':{'start':{'line':12,'column':19},'end':{'line':12,'column':22}}},'loc':{'start':{'line':12,'column':12},'end':{'line':12,'column':23}}},'loc':{'start':{'line':9,'column':13},'end':{'line':12,'column':23}}},'loc':{'start':{'line':7,'column':8},'end':{'line':12,'column':23}}}],'loc':{'start':{'line':5,'column':24},'end':{'line':13,'column':5}}},'loc':{'start':{'line':5,'column':4},'end':{'line':13,'column':5}}},{'type':'ReturnStatement','argument':{'type':'UnaryExpression','operator':'-','argument':{'type':'Literal','value':1,'raw':'1','loc':{'start':{'line':14,'column':12},'end':{'line':14,'column':13}}},'prefix':true,'loc':{'start':{'line':14,'column':11},'end':{'line':14,'column':13}}},'loc':{'start':{'line':14,'column':4},'end':{'line':14,'column':14}}}],'loc':{'start':{'line':1,'column':30},'end':{'line':15,'column':1}}},'generator':false,'expression':false,'async':false,'loc':{'start':{'line':1,'column':0},'end':{'line':15,'column':1}}}],'sourceType':'script','loc':{'start':{'line':1,'column':0},'end':{'line':15,'column':1}}}),
            [{'line':1,'type':'FunctionDeclaration','name':'binarySearch','condition':null,'value':null},{'line':1,'type':'VariableDeclaration','name':'X','condition':null,'value':null},{'line':1,'type':'VariableDeclaration','name':'V','condition':null,'value':null},{'line':1,'type':'VariableDeclaration','name':'n','condition':null,'value':null},{'line':2, 'type':'VariableDeclaration','name':'low','condition':null,'value':null},{'line':2,'type':'VariableDeclaration','name':'high','condition':null,'value':null},{'line':2,'type':'VariableDeclaration','name':'mid','condition':null,'value':null},{'line':3,'type':'AssignmentExpression','name':'low','condition':null,'value':'0'},{'line':4,'type':'AssignmentExpression','name':'high','condition':null,'value':'n - 1'},{'line':5,'type':'WhileStatement','name':null,'condition':'low <= high','value':null},{'line':6,'type':'AssignmentExpression','name':'mid','condition':null,'value':'(low + high) / 2'},{'line':7,'type':'IfStatement','name':null,'condition':'X < V[mid]','value':null},{'line':8,'type':'AssignmentExpression','name':'high','condition':null,'value':'mid - 1'},{'line':9,'type':'else if statement','name':null,'condition':'X > V[mid]','value':null},{'line':10,'type':'AssignmentExpression','name':'low','condition':null,'value':'mid + 1'},{'line':12,'type':'else statement','name':null,'condition':null,'value':'mid'},{'line':14,'type':'ReturnStatement','name':null,'condition':null,'value':'-1'}]
        );
    });

    it('test empty let function', ()=>{

        assert.deepEqual(
            getElem({'type':'Program','body':[{'type':'VariableDeclaration','declarations':[{'type':'VariableDeclarator','id':{'type':'Identifier','name':'x','loc':{'start':{'line':1,'column':4},'end':{'line':1,'column':5}}},'init':null,'loc':{'start':{'line':1,'column':4},'end':{'line':1,'column':5}}}],'kind':'let','loc':{'start':{'line':1,'column':0},'end':{'line':1,'column':5}}}],'sourceType':'script','loc':{'start':{'line':1,'column':0},'end':{'line':1,'column':5}}}),
            [{'line':1,'type':'VariableDeclaration','name':'x','condition':null,'value':null}]
        );
    });

    it('test non empty let function', ()=>{

        assert.deepEqual(
            getElem({'type':'Program','body':[{'type':'VariableDeclaration','declarations':[{'type':'VariableDeclarator','id':{'type':'Identifier','name':'x','loc':{'start':{'line':1,'column':4},'end':{'line':1,'column':5}}},'init':{'type':'Literal','value':2,'raw':'2','loc':{'start':{'line':1,'column':8},'end':{'line':1,'column':9}}},'loc':{'start':{'line':1,'column':4},'end':{'line':1,'column':9}}}],'kind':'let','loc':{'start':{'line':1,'column':0},'end':{'line':1,'column':9}}}],'sourceType':'script','loc':{'start':{'line':1,'column':0},'end':{'line':1,'column':9}}}),
            [{'line':1,'type':'VariableDeclaration','name':'x','condition':null,'value':'2'}]
        );
    });

    it('test no else in if function', ()=>{

        assert.deepEqual(
            getElem({'type':'Program','body':[{'type':'IfStatement','test':{'type':'BinaryExpression','operator':'<','left':{'type':'Literal','value':2,'raw':'2','loc':{'start':{'line':1,'column':3},'end':{'line':1,'column':4}}},'right':{'type':'Literal','value':3,'raw':'3','loc':{'start':{'line':1,'column':5},'end':{'line':1,'column':6}}},'loc':{'start':{'line':1,'column':3},'end':{'line':1,'column':6}}},'consequent':{'type':'ExpressionStatement','expression':{'type':'AssignmentExpression','operator':'=','left':{'type':'Identifier','name':'x','loc':{'start':{'line':2,'column':2},'end':{'line':2,'column':3}}},'right':{'type':'Literal','value':3,'raw':'3','loc':{'start':{'line':2,'column':6},'end':{'line':2,'column':7}}},'loc':{'start':{'line':2,'column':2},'end':{'line':2,'column':7}}},'loc':{'start':{'line':2,'column':2},'end':{'line':2,'column':7}}},'alternate':null,'loc':{'start':{'line':1,'column':0},'end':{'line':2,'column':7}}}],'sourceType':'script','loc':{'start':{'line':1,'column':0},'end':{'line':2,'column':7}}}),
            [{'line':1,'type':'IfStatement','name':null,'condition':'2 < 3','value':null},{'line':2,'type':'AssignmentExpression','name':'x','condition':null,'value':'3'}]
        );
    });


    it('test block statement', () => {
        assert.deepEqual(
            getElem({"type":"Program","body":[{"type":"FunctionDeclaration","id":{"type":"Identifier","name":"foo","loc":{"start":{"line":1,"column":9},"end":{"line":1,"column":12}}},"params":[{"type":"Identifier","name":"x","loc":{"start":{"line":1,"column":13},"end":{"line":1,"column":14}}}],"body":{"type":"BlockStatement","body":[{"type":"IfStatement","test":{"type":"BinaryExpression","operator":"<","left":{"type":"Identifier","name":"x","loc":{"start":{"line":2,"column":3},"end":{"line":2,"column":4}}},"right":{"type":"Literal","value":3,"raw":"3","loc":{"start":{"line":2,"column":7},"end":{"line":2,"column":8}}},"loc":{"start":{"line":2,"column":3},"end":{"line":2,"column":8}}},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"UpdateExpression","operator":"++","argument":{"type":"Identifier","name":"x","loc":{"start":{"line":3,"column":0},"end":{"line":3,"column":1}}},"prefix":false,"loc":{"start":{"line":3,"column":0},"end":{"line":3,"column":3}}},"loc":{"start":{"line":3,"column":0},"end":{"line":3,"column":4}}},{"type":"ExpressionStatement","expression":{"type":"UpdateExpression","operator":"++","argument":{"type":"Identifier","name":"x","loc":{"start":{"line":4,"column":0},"end":{"line":4,"column":1}}},"prefix":false,"loc":{"start":{"line":4,"column":0},"end":{"line":4,"column":3}}},"loc":{"start":{"line":4,"column":0},"end":{"line":4,"column":4}}}],"loc":{"start":{"line":2,"column":9},"end":{"line":5,"column":1}}},"alternate":null,"loc":{"start":{"line":2,"column":0},"end":{"line":5,"column":1}}},{"type":"ReturnStatement","argument":{"type":"Identifier","name":"x","loc":{"start":{"line":6,"column":7},"end":{"line":6,"column":8}}},"loc":{"start":{"line":6,"column":0},"end":{"line":6,"column":9}}}],"loc":{"start":{"line":1,"column":15},"end":{"line":7,"column":1}}},"generator":false,"expression":false,"async":false,"loc":{"start":{"line":1,"column":0},"end":{"line":7,"column":1}}}],"sourceType":"script","loc":{"start":{"line":1,"column":0},"end":{"line":7,"column":1}}})
                [{"line":1,"type":"FunctionDeclaration","name":"foo","condition":null,"value":null},{"line":1,"type":"VariableDeclaration","name":"x","condition":null,"value":null},{"line":2,"type":"IfStatement","name":null,"condition":"x < 3","value":null},{"line":6,"type":"ReturnStatement","name":null,"condition":null,"value":"x"}]
             );
    });

    it('test if function', ()=>{

        assert.deepEqual(
            getElem({'type':'Program','body':[{'type':'FunctionDeclaration','id':{'type':'Identifier','name':'test','loc':{'start':{'line':1,'column':9},'end':{'line':1,'column':13}}},'params':[{'type':'Identifier','name':'x','loc':{'start':{'line':1,'column':14},'end':{'line':1,'column':15}}}],'body':{'type':'BlockStatement','body':[{'type':'IfStatement','test':{'type':'BinaryExpression','operator':'>','left':{'type':'Identifier','name':'x','loc':{'start':{'line':2,'column':3},'end':{'line':2,'column':4}}},'right':{'type':'Literal','value':2,'raw':'2','loc':{'start':{'line':2,'column':5},'end':{'line':2,'column':6}}},'loc':{'start':{'line':2,'column':3},'end':{'line':2,'column':6}}},'consequent':{'type':'ReturnStatement','argument':{'type':'Identifier','name':'x','loc':{'start':{'line':3,'column':7},'end':{'line':3,'column':8}}},'loc':{'start':{'line':3,'column':0},'end':{'line':3,'column':8}}},'alternate':null,'loc':{'start':{'line':2,'column':0},'end':{'line':3,'column':8}}}],'loc':{'start':{'line':1,'column':17},'end':{'line':4,'column':1}}},'generator':false,'expression':false,'async':false,'loc':{'start':{'line':1,'column':0},'end':{'line':4,'column':1}}}],'sourceType':'script','loc':{'start':{'line':1,'column':0},'end':{'line':4,'column':1}}}),
            [{'line':1,'type':'FunctionDeclaration','name':'test','condition':null,'value':null},{'line':1,'type':'VariableDeclaration','name':'x','condition':null,'value':null},{'line':2,'type':'IfStatement','name':null,'condition':'x > 2','value':null},{'line':3,'type':'ReturnStatement','name':null,'condition':null,'value':'x'}]
        );
    });
});
