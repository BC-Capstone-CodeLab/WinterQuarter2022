import * as monaco from 'monaco-editor'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { uuid } from 'uuidv4';

var userId;
var decorationHandle;
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

	decorationHandle = [];

	if (localStorage.getItem('uuid') === null)
	{
		localStorage.setItem('uuid', uuid());
	}
	else
	{
		userId = localStorage.getItem('uuid');

	}



	let isLoop = false;

    onValue(dataRef, function(data){

		const fireData = data.val();

		if (fireData === null || fireData.userId === undefined) return null;


		const {range: rangeObj, text} = fireData.userEdit;


		if (fireData.type === 'edit')
		{
			if (userId === fireData.userId) return null;

			isLoop = true;

			const range = new monaco.Selection(rangeObj.startLineNumber, rangeObj.startColumn,
							rangeObj.endLineNumber, rangeObj.endColumn);

			sourceEditor.getModel().applyEdits([{range, text: text}]);
		}


		if (fireData.type === 'presence')
		{
			if (userId === fireData.userId) return null;
			const id = fireData.userId.substring(0, 8);

			document.documentElement.style.setProperty('--uuidv4', `"User ${id}"`);


			const selection_presence = [];
			const [afterContentClassName, beforeContentClassName] = ['fakeCursor', null];

			const className = (rangeObj.startColumn === rangeObj.endColumn)
								? 'fakeSelection-non'
								: 'fakeSelection';

			selection_presence.push({

				/* startLine, startColumn, endLine, Endcolumn*/
				range: new monaco.Range(rangeObj.startLineNumber, rangeObj.startColumn,
							rangeObj.endLineNumber, rangeObj.endColumn),
				options: {
						className, /*className: 'fakeSelection-none' or fakeSelection*/
						afterContentClassName,
						beforeContentClassName
				}

			});

			decorationHandle = sourceEditor.getModel().deltaDecorations(decorationHandle, selection_presence);
		}

    });

    sourceEditor.getModel().onDidChangeContent((event)=>{

		if (isLoop)
		{
			isLoop = false;
			return;
		}

		event.changes.forEach(change => {

			const {range, rangeOffset, rangeLength, text } = change;
			set(dataRef, {
						userEdit : {range, rangeLength, rangeOffset, text},
						userId,
						type: 'edit',
			});

		});

    });


	sourceEditor.onDidChangeCursorSelection((event) => {

		/*
		 * if (isLoop){isLoop = false;return;}
		 *	We don't need a safeguard. Decorations don't trigger the onDidContentChange event.
		 * */

		if ( event.reason === 2 ) return null;

		const selection_range = sourceEditor.getSelection();
		const model = sourceEditor.getModel();

		if (selection_range === null) return;

		set(dataRef, {
					userEdit: {range: selection_range},
					userId,
					type: 'presence',
		});

	});

});
