import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const userId = uuidv4();

var layout;
var sourceEditor;
var stdinEditor;
var stdoutEditor;
var stderrEditor;
var $selectLanguage;


var layoutConfig = {
    settings: {
        showPopoutIcon: false,
        reorderEnabled: true
    },
    dimensions: {
        borderWidth: 3,
        headerHeight: 22
    },
    content: [{
        type: "row",
        content: [{
            type: "component",
            componentName: "code area",
            title: "CODE AREA",
            isClosable: false,
            componentState: {
                readOnly: false
            },
            width: 60
        }, {
            type: "column",
            content: [{
                type: "stack",
                content: [{
                    type: "component",
                    componentName: "stdin",
                    title: "STDIN",
                    isClosable: false,
                    componentState: {
                        readOnly: false
                    }
                }, {
                    type: "component",
                    componentName: "stdout",
                    title: "STDOUT",
                    isClosable: false,
                    componentState: {
                        readOnly: true
                    }
                }, {
                    type: "component",
                    componentName: "stderr",
                    title: "STDERR",
                    isClosable: false,
                    componentState: {
                        readOnly: true
                    }
                }]
            }]
        }]
    }]
};

$(document).ready(function () {
    require(["vs/editor/editor.main"], function (ignorable) {
        layout = new GoldenLayout(layoutConfig, $("#ide-windows"));

        layout.registerComponent("code area", function (container, state) {
                sourceEditor = monaco.editor.create(container.getElement()[0], {
                    automaticLayout: true,
                    theme: "vs-dark",
                    scrollBeyondLastLine: true,
                    readOnly: state.readOnly,
                    language: "java",
                    minimap: {
                        enabled: false
                    }
                });

        });

        layout.registerComponent("stdin", function (container, state) {
            stdinEditor = monaco.editor.create(container.getElement()[0], {
                automaticLayout: true,
                theme: "vs-dark",
                scrollBeyondLastLine: false,
                readOnly: state.readOnly,
                language: "plaintext",
                minimap: {
                    enabled: false
                }
            });
        });

        layout.registerComponent("stdout", function (container, state) {
            stdoutEditor = monaco.editor.create(container.getElement()[0], {
                automaticLayout: true,
                theme: "vs-dark",
                scrollBeyondLastLine: false,
                readOnly: state.readOnly,
                language: "plaintext",
                minimap: {
                    enabled: false
                }
            });

            container.on("tab", function(tab) {
                tab.element.append("<span id=\"stdout-dot\" class=\"dot\" hidden></span>");
                tab.element.on("mousedown", function(e) {
                    e.target.closest(".lm_tab").children[3].hidden = true;
                });
            });
        });

        layout.registerComponent("stderr", function (container, state) {
            stderrEditor = monaco.editor.create(container.getElement()[0], {
                automaticLayout: true,
                theme: "vs-dark",
                scrollBeyondLastLine: false,
                readOnly: state.readOnly,
                language: "plaintext",
                minimap: {
                    enabled: false
                }
            });

            container.on("tab", function(tab) {
                tab.element.append("<span id=\"stderr-dot\" class=\"dot\" hidden></span>");
                tab.element.on("mousedown", function(e) {
                    e.target.closest(".lm_tab").children[3].hidden = true;
                });
            });
        });

        
        layout.on("initialised", function () {
            $("#upper-container").css("border-bottom", "1px solid black");
            sourceEditor.focus();
        });
        
        layout.init();
    });


    const firebaseConfig = 
    {
        apiKey: "AIzaSyDICcooHUciQZvAs_dPpExVxqBhtJMojbY",
        authDomain: "codelab-database-1.firebaseapp.com",
        projectId: "codelab-database-1",
        storageBucket: "codelab-database-1.appspot.com",
        messagingSenderId: "573387563239",
        appId: "1:573387563239:web:161f23412c218ba50ac242",
        measurementId: "G-4XTVC35JQL"
    };

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const dataRef  = ref(database, 'Edits/');


    onValue(dataRef, function(data){
	    
		const {position, text} = data.val().userEdit;		
							
		const range = new monaco.Selection(position.lineNumber, position.column,
											position.endLineNumber, position.endColumn);
							
		sourceEditor.getModel().applyEdits([{range, text:text}]);
    });
    
    sourceEditor.onKeyDown((event)=>{
		
		// check if user entered special key
		// Not yet implemented. Backspace key implemented for deletion.
		if (event.browserEvent.key.length > 1 && event.browserEvent.key !== 'Backspace')
			return;
		
		// Get key then cursorPosition, 
		// hence we can deduce the intial and final cursor position
		const key = event.browserEvent.key;
		const cursorPosition = sourceEditor.getPosition();
		
		// endlineNumber is greater than lineNumber a.k.a starLineNumber
		// endColumn == column
		cursorPosition.endLineNumber = cursorPosition.lineNumber + 1;
		cursorPosition.endColumn 	= cursorPosition.column;
		
		// if backspace, the endLineNumber is smaller than the lineNumber
		// endColumn == column for now: need more implementation
		if (event.browserEvent.key === 'Backspace'){
			cursorPosition.lineNumber = cursorPosition.endLineNumber;
			cursorPosition.column = cursorPosition.endColumn;
			cursorPosition.endLineNumber = cursorPosition.lineNumber -1;
		}
		
		set(dataRef, {userEdit : {
								position: cursorPosition, 
								text: (key === 'Backspace') ? "" : key  /* we add black space for now*/
							},
						userId});
	});
 
});
