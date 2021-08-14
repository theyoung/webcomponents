export default class StudentAttendanceTable extends HTMLElement {
    constructor(){
        super();
        this.render();
    }

    render(){
        this.innerHTML = this.getLoadingText();
        this.getStudentList();
    }

    getLoadingText(){
        return 'loading...';
    }

    async getStudentList(){
        const response = await fetch('./student.json');
        const jsons = await response.json();
        this.generateTable(jsons);
    }

    generateTable(names){
        const rows = names.map((data,idx)=> this.getTableRow(idx,data.name));
        const $table = document.createElement('table');
        $table.innerHTML = rows.join('');
        this.appendHtmlToShadowDom($table);
    }

    getTableRow(index, name){
        const dom = `
            <tr>
                <td>${index + 1}</td>
                <td>${name}</td>
                <td>
                    <input type="checkbox" name="${index}-attendance"/>
                </td>
            </tr>
        `;
        return dom;
    }

    appendHtmlToShadowDom($table){
        this.innerHTML = '';
        const shadowRoot = this.attachShadow({mode:'open'});
        shadowRoot.appendChild($table);
    }
};

customElements.define('student-attendance-table',StudentAttendanceTable);