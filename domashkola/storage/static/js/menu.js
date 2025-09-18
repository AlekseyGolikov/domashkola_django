class MenuItem {
    // _parent;
    // _body;
    _lvl_1_icon =
        `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-book ms-2 me-2" viewBox="0 0 16 16">
            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
        </svg>`;
    _lvl_2_icon =
        `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-person ms-3 me-2" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
        </svg>`;
    _lvl_3_icon =
        `<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" class="bi bi-folder ms-4 me-2" viewBox="0 0 16 16">
            <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
        </svg>`;
    _lvl_4_icon =
        `<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" class="bi bi-postcard ms-5 me-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm7.5.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7ZM2 5.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5ZM10.5 5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3ZM13 8h-2V6h2v2Z"/>
        </svg>`

    constructor(parentNode, header, level, id) {
        this._parent = parentNode;
        this._header = header;
        this._level = level;
        this._id = id;

        const accordion_item = document.createElement('div');
        accordion_item.id = 'item_'+this._id;
        accordion_item.classList.add('accordion-item');
        accordion_item.classList.add('empty-item');
        this._parent.appendChild(accordion_item);

        const accordion_header = document.createElement('h2');
        accordion_header.id = 'header_'+this._id;
        accordion_header.classList.add('accordion-header');
        // accordion_header.classList.add('empty-item');
        accordion_item.appendChild(accordion_header);

        const accordion_button = document.createElement('button');
        accordion_button.id = 'button_' + this._id;
        accordion_button.classList.add('accordion-button');
        accordion_button.classList.add('collapsed');
        accordion_button.setAttribute('type', 'button');
        // accordion_button.classList.add('empty-item');
        const accordion_textNode = document.createTextNode(this._header);
        accordion_button.appendChild(accordion_textNode);
        accordion_header.appendChild(accordion_button);

        const lvl_icon = document.createElement('svg');
        switch (this._level){
            case 1:
                lvl_icon.innerHTML = this._lvl_1_icon;
                break;
            case 2:
                lvl_icon.innerHTML = this._lvl_2_icon;
                break;
            case 3:
                lvl_icon.innerHTML = this._lvl_3_icon;
                break;
            case 4:
                lvl_icon.innerHTML = this._lvl_4_icon;
                break;
        }
        accordion_button.insertBefore(lvl_icon, accordion_textNode);

        const accordion_collapse = document.createElement('div');
        accordion_collapse.id = 'collapse_'+this._id;
        accordion_collapse.classList.add('accordion-collapse');
        accordion_collapse.classList.add('collapse');
        // accordion_collapse.classList.add('show');
        accordion_collapse.setAttribute('data-lvl', this._level);
        // accordion_collapse.classList.add('empty-item');
        accordion_item.appendChild(accordion_collapse);

        const accordion_body = document.createElement('div');
        // this._body = accordion_body;
        accordion_body.id = 'body_'+this._id;
        accordion_body.classList.add('accordion-body');
        accordion_body.setAttribute('style', 'padding-bottom: 0;');
        accordion_body.setAttribute('data-id', 'body_'+this._id);
        // accordion_body.classList.add('empty-item');
        accordion_collapse.appendChild(accordion_body);
        // console.log('accordion_item id = '+accordion_item.id);
        // console.log('accordion_header id = '+accordion_header.id);
        // console.log('accordion_button id = '+accordion_button.id);
        // console.log('accordion_collapse id = '+accordion_collapse.id);
        // console.log('accordion_body id = '+accordion_body.id);
        // console.log('accordion_item classList id = '+accordion_item.classList);
        // console.log('---------');
    }
}

class CheckboxItem {

    constructor(parentNode, header, level, id) {
        this._parent = parentNode;
        this._header = header;
        this._level = level;
        this._id = id;

        // const wrap_btn_group = document.createElement('div');
        // wrap_btn_group.classList.add('d-flex');
        // wrap_btn_group.classList.add('flex-row');
        // // wrap_btn_group.classList.add('flex-nowrap');
        // // wrap_btn_group.classList.add('justify-content-center');
        // this._parent.appendChild(wrap_btn_group);

        // const btn_group = document.createElement('div');
        // btn_group.id = 'item_'+this._id;
        // btn_group.classList.add('btn-group');
        // // btn_group.classList.add('empty-item');
        // wrap_btn_group.appendChild(btn_group);

        const btn_check = document.createElement('input');
        btn_check.id = this._id;
        btn_check.setAttribute('type', 'checkbox');
        btn_check.setAttribute('name', 'btncheck');
        btn_check.classList.add('btn-check');
        btn_check.setAttribute('autocomplete', 'off');

        this._parent.appendChild(btn_check);

        const btn_label = document.createElement('label');
        btn_label.setAttribute('for', this._id);
        btn_label.classList.add('btn');
        btn_label.classList.add('btn-outline-primary');
        this._parent.appendChild(btn_label);

        const check_textNode = document.createTextNode(this._header);
        btn_label.appendChild(check_textNode);
    }
}


function createNote(parentNode, data){
    // <p><a class="link-opacity-50" href="#">Link opacity 50</a></p>
    const el_p = document.createElement('p');
    el_p.id = 'content_'+data.grade+data.subject+data.presentation+data.formatData;
    // el_p.classList.add('empty-item');
    // console.log('#'+data.grade+data.subject+data.presentation+data.formatData);
    parentNode.appendChild(el_p);
    const el_a = document.createElement('a');
    el_p.appendChild(el_a);
    el_a.classList.add('link-opacity-50');
    el_a.setAttribute('href','#')
    el_a.appendChild(document.createTextNode(data.content));

    // console.log(data);
    switch(data.grade){
        case '1_2':
            document.getElementById('item_preSchool').classList.remove('empty-item');
            break;
        case '2_3':
            document.getElementById('item_preSchool').classList.remove('empty-item');
            break;
        case '3_5':
            document.getElementById('item_preSchool').classList.remove('empty-item');
            break;
        case '5_7':
            document.getElementById('item_preSchool').classList.remove('empty-item');
            break;
        case '1':
            document.getElementById('item_elSchool').classList.remove('empty-item');
            break;
        case '2':
            document.getElementById('item_elSchool').classList.remove('empty-item');
            break;
        case '3':
            document.getElementById('item_elSchool').classList.remove('empty-item');
            break;
        case '4':
            document.getElementById('item_elSchool').classList.remove('empty-item');
            break;
        case '5':
            document.getElementById('item_hiSchool').classList.remove('empty-item');
            break;
        case '6':
            document.getElementById('item_hiSchool').classList.remove('empty-item');
            break;
        case '7':
            document.getElementById('item_hiSchool').classList.remove('empty-item');
            break;
        case '8':
            document.getElementById('item_hiSchool').classList.remove('empty-item');
            break;
        case '9':
            document.getElementById('item_hiSchool').classList.remove('empty-item');
            break;
        case '10':
            document.getElementById('item_hiSchool').classList.remove('empty-item');
            break;
        case '11':
            document.getElementById('item_hiSchool').classList.remove('empty-item');
            break;
    }

    // document.getElementById('item_preSchool').classList.toggle('empty-item');
    // // document.getElementById('header_preSchool').classList.toggle('empty-item');
    // // document.getElementById('button_preSchool').classList.toggle('empty-item');
    // // document.getElementById('collapse_preSchool').classList.toggle('empty-item');
    // // document.getElementById('body_preSchool').classList.toggle('empty-item');

    // document.getElementById('item_elSchool').classList.remove('empty-item');
    // document.getElementById('header_elSchool').classList.toggle('empty-item');
    // document.getElementById('button_elSchool').classList.toggle('empty-item');
    // document.getElementById('collapse_elSchool').classList.toggle('empty-item');
    // document.getElementById('body_elSchool').classList.toggle('empty-item');

    document.getElementById('item_'+data.grade).classList.remove('empty-item');
    // document.getElementById('header_'+data.grade).classList.toggle('empty-item');
    // document.getElementById('button_'+data.grade).classList.toggle('empty-item');
    // document.getElementById('collapse_'+data.grade).classList.toggle('empty-item');
    // document.getElementById('body_'+data.grade).classList.toggle('empty-item');

    document.getElementById('item_'+data.grade+data.subject).classList.remove('empty-item');
    // document.getElementById('header_'+data.grade+data.subject).classList.toggle('empty-item');
    // document.getElementById('button_'+data.grade+data.subject).classList.toggle('empty-item');
    // document.getElementById('collapse_'+data.grade+data.subject).classList.toggle('empty-item');
    // document.getElementById('body_'+data.grade+data.subject).classList.toggle('empty-item');

    document.getElementById('item_'+data.grade+data.subject+data.presentation).classList.remove('empty-item');
    // console.log('-----------------------');
    // console.log('accordion_body id = '+parentNode.id);
    // console.log('accordion_collapse id = '+parentNode.closest('#collapse_'+data.grade+data.subject).id);
    // console.log('accordion_item id = '+parentNode.closest('#item_'+data.grade+data.subject).id);
    // console.log('accordion_header id = '+parentNode.closest('#item_'+data.grade+data.subject).childNodes[0].id);
    // console.log('accordion_button id = '+parentNode.closest('#item_'+data.grade+data.subject).childNodes[0].childNodes[0].id);
    // console.log('-----------------------');

}
