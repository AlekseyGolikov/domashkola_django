const Accordion = (() => {
    let instance = null;

    return class Accordion {
        constructor() {
        if(instance === null) {
            this.accordion = document.getElementById('accordion');
            this.item1 = new MenuItem(this.accordion, 'Дошкольники', 1, 'preSchool');
            this.item2 = new MenuItem(this.accordion, 'Начальная школа', 1, 'elSchool');
            this.item3 = new MenuItem(this.accordion, 'Средняя школа', 1, 'hiSchool');
            this.item4 = new MenuItem(this.accordion, 'Познавательные материалы', 1, 'usefullMaterials');
            // start_preloader()
            getMenu();
            instance = this;
        }
        return instance;
        }
    }
})();

var cards = new Map();


class MenuItem {
    _parent;
    _header;
    _level;
    _id;

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
        accordion_item.classList.add('d-none'); //empty-item
        // accordion_item.classList.add('opacity-75');
        this._parent.appendChild(accordion_item);

        const accordion_header = document.createElement('h2');
        accordion_header.id = 'header_'+this._id;
        accordion_header.classList.add('accordion-header');
        // accordion_header.classList.add('opacity-100');
        // accordion_header.classList.add('empty-item');
        accordion_item.appendChild(accordion_header);

        const accordion_button = document.createElement('button');
        accordion_button.id = 'button_' + this._id;
        accordion_button.classList.add('accordion-button');
        accordion_button.classList.add('collapsed');
        // accordion_button.classList.add('opacity-100');
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
        // accordion_collapse.classList.add('opacity-100');
        // accordion_collapse.classList.add('show');
        accordion_collapse.setAttribute('data-lvl', this._level);
        // accordion_collapse.classList.add('empty-item');
        accordion_item.appendChild(accordion_collapse);

        const accordion_body = document.createElement('div');
        // this._body = accordion_body;
        accordion_body.id = 'body_'+this._id;
        accordion_body.classList.add('accordion-body');
        // accordion_body.classList.add('opacity-100');
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


function createItem(parentNode, grade, subjects, presentation, formatData){
    // console.log(grade);
    // console.log(subjects);
    // console.log(presentation);
    // console.log(formatData);
    let item = new MenuItem(parentNode=parentNode, header=grade.grade_name, level=2, id=grade.grade_code);
    for (let k=0; k<subjects.length; k++){  //subjects.length
        item = new MenuItem(parentNode=document.getElementById('body_'+grade.grade_code), header=subjects[k].subject_name, level=3, id=grade.grade_code+subjects[k].subject_code);
        // console.log(item);

        for (let j=0; j<presentation.length; j++){   //presentation.length
            item = new MenuItem(parentNode=document.getElementById('body_'+grade.grade_code+subjects[k].subject_code), header=presentation[j].presentation_name, level=4, id=grade.grade_code+subjects[k].subject_code+presentation[j].presentation_code);

            const wrap_btn_group = document.createElement('div');
            wrap_btn_group.classList.add('d-flex');
            document.getElementById('body_'+grade.grade_code+subjects[k].subject_code+presentation[j].presentation_code).appendChild(wrap_btn_group);

            const btn_group = document.createElement('div');
            btn_group.classList.add('btn-group');
            btn_group.classList.add('checkbox-group-expanded');
            btn_group.classList.add('flex-grow-1');
            wrap_btn_group.appendChild(btn_group);

            // let checked = true;
            for (let n=0; n<formatData.length; n++){   //formatData.length

                item = new CheckboxItem(parentNode=btn_group, header=formatData[n].format_name, level=5, id=grade.grade_code+subjects[k].subject_code+presentation[j].presentation_code+formatData[n].format_code);

            }

            // <div class="container d-flex h-100">
            //     <div class="d-flex justify-content-between flex-row flex-wrap flex-grow-1">

            const wrap_content = document.createElement('div');
            wrap_content.id = 'wrap_content_'+grade.grade_code+subjects[k].subject_code+presentation[j].presentation_code;
            wrap_content.classList.add('d-flex');
            wrap_content.classList.add('justify-content-sm-around');    //выравнивание карт для дисплеев более 576
            wrap_content.classList.add('justify-content-center');       //выравнивание карт по центру для экрана смартфона до 576
            // wrap_content.classList.add('align-self-stretch');
            wrap_content.classList.add('mt-5');
            wrap_content.classList.add('flex-row');
            // wrap_content.classList.add('border');
            // wrap_content.classList.add('border-black');
            wrap_content.classList.add('flex-wrap');
            wrap_content.classList.add('w-100');
            // wrap_content.classList.add('flex-grow-1');
            document.getElementById('body_'+grade.grade_code+subjects[k].subject_code+presentation[j].presentation_code).appendChild(wrap_content);

        }

    }
}

async function getMenu(){
    // let item;


    try{
        // throw('Проверочное прерывание');
        const response = await fetch('/menujson');

        const data = await response.json();
        if(response.ok){
            console.log('---------формируем полное меню-------------');
            for (let i=0; i<data.grades.length; i++){
                switch (data.grades[i].grade_code){
                    case '1_2':
                    case '2_3':
                    case '3_5':
                    case '5_7':
                        createItem(document.getElementById('body_preSchool'), data.grades[i], data.subjects, data.presentation, data.formatData)
                        break;
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                        createItem(document.getElementById('body_elSchool'), data.grades[i], data.subjects, data.presentation, data.formatData)
                        break;
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                    case '10':
                    case '11':
                        createItem(document.getElementById('body_hiSchool'), data.grades[i], data.subjects, data.presentation, data.formatData)
                        break;
                    case 'psyho':
                        createItem(document.getElementById('body_usefullMaterials'), data.grades[i], data.subjects, data.presentation, data.formatData)
                        break;
                }
            }
            // console.log(data.content);
            addContent(data.content);

        }

    }
    catch(error){
        console.error('Error:', error);
        // $(document).ready(function(){
            const errorMsg = 'Профилактические работы на сервере <br> Повторите попытку позже <br>';
            $('#errorAccordion').html(errorMsg).removeClass('d-none');
            $('#accordion').addClass('d-none');
        // });
        finish_preloader()
    }
    console.log('---------конец  формирования меню-------------');
    navigation();
}


function addContent(data){
    let note;
    console.log('---------Начало записи данных из БД-------------')

    for (let i=0; i<data.length; i++){
        parentNode = document.getElementById('wrap_content_'+data[i].grade_id+data[i].subject_id+data[i].presentation_id);
        // console.log(parentNode);
        createNote(parentNode, data[i]);
        note = document.getElementById(data[i].grade_id+data[i].subject_id+data[i].presentation_id+data[i].formatData_id);
        // note.classList.remove('btn-outline-primary');
        // note.classList.add('btn-primary');
        note.checked = true;


    }
    console.log('---------Конец записи данных из БД-------------')
    finish_preloader();
}

function start_preloader() {
    preloader = document.getElementById('preloader')
    svg = document.createElement('svg')
    svg.classList.add('preloader__image')
    svg.setAttribute('role', 'img');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 512 512')
    preloader.appendChild(svg)
    path = document.createElement('path')
    path.setAttribute('fill', 'currentColor')
    path.setAttribute('d', 'M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z')
    svg.appendChild(path)
}

    //Завершение работы прелоадера
function finish_preloader() {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
    console.log('---------preloader end---------');
}

function navigation(){

    $(document).ready(function(){
        $('input[name="btncheck"]').click(function(){
            // console.log('card_'+this.id);
            $('#card_'+this.id+' div').each(function(el){
                $(this).parent().toggle(350).toggleClass('d-none');
            });
        });

        $(".accordion-header").click(function(){
            console.log('-----работает функция сворачивания вкладок-------')
            let curLvl=0;
            //последняя раскрытая вклад. имеет класс accordion-collapse
            const collapsedTab = $(this).next();
            const body = $(this).next().children();
            const header = $(this);
            const button = $(this).children();
            const item = $(this).parent();

            // уровень последней раскрытой вкладки
            curLvl = collapsedTab.data('lvl');

            //раскрываем или закрываем вкладку, по которой произошёл клик
            collapsedTab.toggle(350).toggleClass('show');
            $(this).children('button').toggleClass('collapsed');

            //закрываем все остальные ранее открытые вкладки
            for (let i = curLvl; i<=5; i++) {
                collapsedEl = $('.show').not(collapsedTab).filter('[data-lvl='+i+']');
                collapsedEl.toggle(350).toggleClass('show');
                collapsedEl.prev().children('button').toggleClass('collapsed');
            }
        });

        $('.card-expander').click(function(){
            const elem = $(this).parent().parent().parent().parent();
            const card_text = $(this).parent().parent().siblings('.visually-hidden');
            // console.log(Number(card_text.attr('id')) + ' | '+ typeof(Number(card_text.attr('id'))));

            // console.log('card_text.id: '+ card_text.id);
            // console.log('card_text.link: '+ card_text.attr('data-link'));
            // console.log('card_text.text.length: '+ card_text.html().length);

            $(this).addClass('d-none');
            $(this).siblings().removeClass('d-none');


            if (elem.hasClass('card-collapsed')){

                elem.parent().siblings().animate({
                    'width': '0', 'height': '0'},
                    'slow',
                    function(){
                        elem.parent().siblings().addClass('d-none');
                    }
                );
                // elem.parent().siblings().addClass('d-none');
                elem.siblings().addClass('d-none');
                elem.animate(
                    {'width': '90%', 'height': '90%'},
                    'slow',
                    function(){
                        elem.removeClass('card-collapsed');
                        elem.addClass('card-expanded');

                        // console.log(cards);
                        cards.get(Number(card_text.attr('id'))).expanding();
                        // elem.children().children('p').html(card_text.html());
                    }
                );
            }
            else{
                elem.parent().siblings().animate({
                            'width': '100%', 'height': '2.5rem'},
                            'slow',
                            function(){
                                elem.parent().siblings().removeClass('d-none');
                            }
                        );

                elem.animate(
                    {'width': '18rem', 'height': '15rem'},
                    'slow', function(){
                        elem.removeClass('card-expanded');
                        elem.addClass('card-collapsed');

                        console.log(Number(card_text.attr('id')));
                        cards.get(Number(card_text.attr('id'))).collapsing();

                        elem.siblings().removeClass('d-none');
                    }
                );
            }
        });
    });
}


class CheckboxItem {

    constructor(parentNode, header, level, id) {
        this._parent = parentNode;
        this._header = header;
        this._level = level;
        this._id = id;

        // <div class="btn-group" role="group" aria-label="Базовая группа переключателей флажков">
        //     <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
        //     <label class="btn btn-outline-primary" for="btncheck1">Флажок 1</label>

        //     <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off">
        //     <label class="btn btn-outline-primary" for="btncheck2">Флажок 2</label>

        //     <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off">
        //     <label class="btn btn-outline-primary" for="btncheck3">Флажок 3</label>
        // </div>

        const btn_check = document.createElement('input');
        btn_check.id = this._id;
        // console.log('btn_check.id = '+btn_check.id)
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

    // new Card(parentNode, data);
    cards.set(data.id, new FactroryCard(parentNode, data).getCard());
    cards.get(data.id).collapsing();
    // console.log(data.id + ' | ' + typeof(data.id));
    // console.log(data.formatData_id);

    switch(data.grade_id){
        case '1_2':
            // document.getElementById('item_preSchool').classList.remove('d-none');
            // break;
        case '2_3':
            // document.getElementById('item_preSchool').classList.remove('d-none');
            // break;
        case '3_5':
            // document.getElementById('item_preSchool').classList.remove('d-none');
            // break;
        case '5_7':
            // document.getElementById('item_preSchool').classList.remove('d-none');
            $('#item_preSchool').removeClass('d-none');
            break;
        case '1':
            // document.getElementById('item_elSchool').classList.remove('d-none');
            // break;
        case '2':
            // document.getElementById('item_elSchool').classList.remove('d-none');
            // break;
        case '3':
            // document.getElementById('item_elSchool').classList.remove('d-none');
            // break;
        case '4':
            // document.getElementById('item_elSchool').classList.remove('d-none');
            $('#item_elSchool').removeClass('d-none');
            break;
        case '5':
            // document.getElementById('item_hiSchool').classList.remove('d-none');
            // break;
        case '6':
            // document.getElementById('item_hiSchool').classList.remove('d-none');
            // break;
        case '7':
            // document.getElementById('item_hiSchool').classList.remove('d-none');
            // break;
        case '8':
            // document.getElementById('item_hiSchool').classList.remove('d-none');
            // break;
        case '9':
            // document.getElementById('item_hiSchool').classList.remove('d-none');
            // break;
        case '10':
            // document.getElementById('item_hiSchool').classList.remove('d-none');
            // break;
        case '11':
            // document.getElementById('item_hiSchool').classList.remove('d-none');
            $('#item_hiSchool').removeClass('d-none');
            break;
        case 'psyho':
            // document.getElementById('item_usefullMaterials').classList.remove('d-none');
            $('#item_usefullMaterials').removeClass('d-none');
            break;
    }

    $('#item_'+data.grade_id).removeClass('d-none');
    $('#item_'+data.grade_id+data.subject_id).removeClass('d-none');
    $('#item_'+data.grade_id+data.subject_id+data.presentation_id).removeClass('d-none');

}

class FactroryCard {
    constructor(parentNode, data){
        this._parentNode = parentNode;
        this._data = data;
    }

    getCard() {
        // console.log(this._data.formatData_id);
        switch (this._data.formatData_id) {
            case 'text':  return new TextCard(this._parentNode, this._data);
            case 'files': return new PDFViewerCard(this._parentNode, this._data);
            default: return;
        }
    }
}

class TextCard {

    _card;
    _data;

    constructor(parentNode, data){

        this._data = data;
        this._card = document.createElement('div');

        this._card.id = 'card_'+data.grade_id+data.subject_id+data.presentation_id+data.formatData_id;
        // this._card.id = 'card_'+data.id;
        // console.log(this._card.id);
        this._card.classList.add('card');
        this._card.classList.add('card-collapsed')
        this._card.classList.add('shadow');
        this._card.classList.add('mb-3');
        this._card.classList.add('bg-body-tertiary');
        this._card.classList.add('rounded');
        parentNode.appendChild(this._card);

        this._card_body = document.createElement('div');
        this._card.appendChild(this._card_body);
        // card_body.id = 'card-body_'+data.grade_id+data.subject_id+data.presentation_id+data.formatData_id;
        this._card_body.classList.add('card-body');
        this._card_body.classList.add('d-flex');
        this._card_body.classList.add('flex-column');
        this._card_body.classList.add('h-100');


        if(this._data.title != ''){
            this._card_body.innerHTML = "<h5 class=\"card-title\">"+this._data.title+"</h5>";
        }

        const card_text = document.createElement('div');
        card_text.classList.add('visually-hidden');
        card_text.setAttribute('data-content', data.content);
        card_text.id = this._data.id;
        this._card_body.appendChild(card_text);

        if (this._data.content.length >= 100){

            if(this._data.title == '' && this._data.link != ''){
                this._card_body.innerHTML +="<p class=\"card-text flex-grow-1 \">"+text_trancate(this._data.content, text_trancate_sizes['notitle_link'])+"</p>";
            }
            if(this._data.title != '' && this._data.link == ''){
                this._card_body.innerHTML +="<p class=\"card-text flex-grow-1 \">"+text_trancate(this._data.content, text_trancate_sizes['title_nolink'])+"</p>";
            }
            if(this._data.title == '' && this._data.link == ''){
                this._card_body.innerHTML +="<p class=\"card-text flex-grow-1 \">"+text_trancate(this._data.content, text_trancate_sizes['notitle_nolink'])+"</p>";
            }
            if(this._data.title != '' && this._data.link != ''){
                this._card_body.innerHTML +="<p class=\"card-text flex-grow-1 \">"+text_trancate(this._data.content, text_trancate_sizes['title_link'])+"</p>";
            }
            // console.log(data.content);
        }
        else {
            this._card_body.innerHTML += "<p class=\"card-text flex-grow-1\">"+this._data.content+"</p>";
        }

        if(this._data.link != ''){
            this._card_body.innerHTML += "<div class=\"d-flex flex-row\">"
                +"<div class=\"flex-grow-1 \">"
                    +"<a href=\""+this._data.link+"\" class=\" card-link link-offset-2 link-offset-3-hover link-underline link-underline-opacity-25 link-underline-opacity-100-hover \" target=\"_blank\" >Перейти по ссылке</a>"
                +"</div>"
                +"<div class=\"position-relative \">"
                    +"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1.5rem\" height=\"1.5rem\" fill=\"currentColor\" class=\"card-expander bi bi-box-arrow-down-right position-absolute bottom-0 end-100 text-primary hover-target \" viewBox=\"0 0 16 16\">"
                        +"<path fill-rule=\"evenodd\" d=\"M8.636 12.5a.5.5 0 0 1-.5.5H1.5A1.5 1.5 0 0 1 0 11.5v-10A1.5 1.5 0 0 1 1.5 0h10A1.5 1.5 0 0 1 13 1.5v6.636a.5.5 0 0 1-1 0V1.5a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h6.636a.5.5 0 0 1 .5.5z\"/>"
                        +"<path fill-rule=\"evenodd\" d=\"M16 15.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h3.793L6.146 6.854a.5.5 0 1 1 .708-.708L15 14.293V10.5a.5.5 0 0 1 1 0v5z\"/>"
                    +"</svg>"
                    +"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1.5rem\" height=\"1.5rem\" fill=\"currentColor\" class=\"card-expander d-none bi bi-box-arrow-up-left position-absolute bottom-0 end-100 text-primary hover-target \" viewBox=\"0 0 16 16\">"
                            +"<path fill-rule=\"evenodd\" d=\"M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5z\"/>"
                            +"<path fill-rule=\"evenodd\" d=\"M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0v-5z\"/>"
                    +"</svg>"
                +"</div>";

            /*
            <div class="d-flex flex-row">
                    <div class="flex-grow-1">
                        <a href="https://doka.guide/css/transition/" class=" card-link ">Ссылка карточки</a>
                    </div>
                    <div class="position-relative " >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor"  class="d-none card-expander bi bi-box-arrow-down-right position-absolute bottom-0 end-100" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8.636 12.5a.5.5 0 0 1-.5.5H1.5A1.5 1.5 0 0 1 0 11.5v-10A1.5 1.5 0 0 1 1.5 0h10A1.5 1.5 0 0 1 13 1.5v6.636a.5.5 0 0 1-1 0V1.5a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h6.636a.5.5 0 0 1 .5.5z"/>
                            <path fill-rule="evenodd" d="M16 15.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h3.793L6.146 6.854a.5.5 0 1 1 .708-.708L15 14.293V10.5a.5.5 0 0 1 1 0v5z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" class="card-expander bi bi-box-arrow-up-left position-absolute bottom-0 end-100" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5z"/>
                            <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0v-5z"/>
                        </svg>
                    </div>
                </div>
            */

        }
        else {
            this._card_body.innerHTML += "<div class=\"d-flex flex-row flex-row \">"
                +"<div class=\"flex-grow-1 \">"
                    +"<div href=\"\" class=\" card-link \" style=\"height: 1.5rem\"></div>"
                +"</div>"
                +"<div class=\"position-relative\">"
                    +"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1.5rem\" height=\"1.5rem\" fill=\"currentColor\" class=\"card-expander bi bi-box-arrow-down-right  position-absolute bottom-0 end-100 text-primary hover-target \" viewBox=\"0 0 16 16\">"
                        +"<path fill-rule=\"evenodd\" d=\"M8.636 12.5a.5.5 0 0 1-.5.5H1.5A1.5 1.5 0 0 1 0 11.5v-10A1.5 1.5 0 0 1 1.5 0h10A1.5 1.5 0 0 1 13 1.5v6.636a.5.5 0 0 1-1 0V1.5a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h6.636a.5.5 0 0 1 .5.5z\"/>"
                        +"<path fill-rule=\"evenodd\" d=\"M16 15.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h3.793L6.146 6.854a.5.5 0 1 1 .708-.708L15 14.293V10.5a.5.5 0 0 1 1 0v5z\"/>"
                    +"</svg>"
                    +"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1.5rem\" height=\"1.5rem\" fill=\"currentColor\" class=\"card-expander d-none bi bi-box-arrow-up-left position-absolute bottom-0 end-100 text-primary hover-target \" viewBox=\"0 0 16 16\">"
                            +"<path fill-rule=\"evenodd\" d=\"M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5z\"/>"
                            +"<path fill-rule=\"evenodd\" d=\"M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0v-5z\"/>"
                    +"</svg>"
                +"</div>";
        }
        this._card_body.innerHTML += "</div>";
    }

    collapsing(){

        if (this._data.content.length >= 100){

            if(this._data.title == '' && this._data.link != ''){
                this._card_body.children[1].innerHTML = text_trancate(this._data.content, text_trancate_sizes['notitle_link']);
            }
            if(this._data.title != '' && this._data.link == ''){
                this._card_body.children[2].innerHTML = text_trancate(this._data.content, text_trancate_sizes['title_nolink']);
            }
            if(this._data.title == '' && this._data.link == ''){
                this._card_body.children[1].innerHTML = text_trancate(this._data.content, text_trancate_sizes['notitle_nolink']);
            }
            if(this._data.title != '' && this._data.link != ''){
                this._card_body.children[2].innerHTML = text_trancate(this._data.content, text_trancate_sizes['title_link']);
            }
        }
        else {
            if(this._data.title == '') {
                this._card_body.children[1].innerHTML = this._data.content;
            }
            else {
                this._card_body.children[2].innerHTML = this._data.content;
            }

        }
    }

    expanding(){
        // console.log(this._card_body.children);

        if(this._data.title == '') {
                this._card_body.children[1].innerHTML = this._data.content;
            }
            else {
                this._card_body.children[2].innerHTML = this._data.content;
            }
    }
}

class PDFViewerCard {

    _card;
    _data;

    constructor(parentNode, data){

        this._data = data;
        this._card = document.createElement('div');

        this._card.id = 'card_'+data.grade_id+data.subject_id+data.presentation_id+data.formatData_id;
        // this._card.id = 'card_'+data.id;
        // console.log(this._card.id);
        this._card.classList.add('card');
        this._card.classList.add('card-collapsed')
        this._card.classList.add('shadow');
        this._card.classList.add('mb-3');
        this._card.classList.add('bg-body-tertiary');
        this._card.classList.add('rounded');
        parentNode.appendChild(this._card);

        this._card_body = document.createElement('div');
        this._card.appendChild(this._card_body);
        // card_body.id = 'card-body_'+data.grade_id+data.subject_id+data.presentation_id+data.formatData_id;
        this._card_body.classList.add('card-body');
        this._card_body.classList.add('d-flex');
        this._card_body.classList.add('flex-column');
        this._card_body.classList.add('h-100');


        if(this._data.title != ''){
            this._card_body.innerHTML = "<h5 class=\"card-title\">"+this._data.title+"</h5>";
        }

        const card_text = document.createElement('div');
        card_text.classList.add('visually-hidden');
        card_text.setAttribute('data-content', data.content);
        card_text.id = this._data.id;
        this._card_body.appendChild(card_text);

        if (this._data.content.length >= 100){

            if(this._data.title == '' && this._data.link != ''){
                this._card_body.innerHTML +="<p class=\"card-text flex-grow-1 \">"+text_trancate(this._data.content, text_trancate_sizes['notitle_link'])+"</p>";
            }
            if(this._data.title != '' && this._data.link == ''){
                this._card_body.innerHTML +="<p class=\"card-text flex-grow-1 \">"+text_trancate(this._data.content, text_trancate_sizes['title_nolink'])+"</p>";
            }
            if(this._data.title == '' && this._data.link == ''){
                this._card_body.innerHTML +="<p class=\"card-text flex-grow-1 \">"+text_trancate(this._data.content, text_trancate_sizes['notitle_nolink'])+"</p>";
            }
            if(this._data.title != '' && this._data.link != ''){
                this._card_body.innerHTML +="<p class=\"card-text flex-grow-1 \">"+text_trancate(this._data.content, text_trancate_sizes['title_link'])+"</p>";
            }
            // console.log(data.content);
        }
        else {
            this._card_body.innerHTML += "<p class=\"card-text flex-grow-1\">"+this._data.content+"</p>";
        }

        if(this._data.link != ''){
            this._card_body.innerHTML += "<div class=\"d-flex flex-row\">"
                +"<div class=\"flex-grow-1 \">"
                    +"<a href=\""+this._data.link+"\" class=\" card-link link-offset-2 link-offset-3-hover link-underline link-underline-opacity-25 link-underline-opacity-100-hover \" target=\"_blank\" >Перейти по ссылке</a>"
                +"</div>"
                +"<div class=\"position-relative \">"
                    +"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1.5rem\" height=\"1.5rem\" fill=\"currentColor\" class=\"card-expander bi bi-box-arrow-down-right position-absolute bottom-0 end-100 text-primary hover-target \" viewBox=\"0 0 16 16\">"
                        +"<path fill-rule=\"evenodd\" d=\"M8.636 12.5a.5.5 0 0 1-.5.5H1.5A1.5 1.5 0 0 1 0 11.5v-10A1.5 1.5 0 0 1 1.5 0h10A1.5 1.5 0 0 1 13 1.5v6.636a.5.5 0 0 1-1 0V1.5a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h6.636a.5.5 0 0 1 .5.5z\"/>"
                        +"<path fill-rule=\"evenodd\" d=\"M16 15.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h3.793L6.146 6.854a.5.5 0 1 1 .708-.708L15 14.293V10.5a.5.5 0 0 1 1 0v5z\"/>"
                    +"</svg>"
                    +"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1.5rem\" height=\"1.5rem\" fill=\"currentColor\" class=\"card-expander d-none bi bi-box-arrow-up-left position-absolute bottom-0 end-100 text-primary hover-target \" viewBox=\"0 0 16 16\">"
                            +"<path fill-rule=\"evenodd\" d=\"M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5z\"/>"
                            +"<path fill-rule=\"evenodd\" d=\"M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0v-5z\"/>"
                    +"</svg>"
                +"</div>";

            /*
            <div class="d-flex flex-row">
                    <div class="flex-grow-1">
                        <a href="https://doka.guide/css/transition/" class=" card-link ">Ссылка карточки</a>
                    </div>
                    <div class="position-relative " >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor"  class="d-none card-expander bi bi-box-arrow-down-right position-absolute bottom-0 end-100" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8.636 12.5a.5.5 0 0 1-.5.5H1.5A1.5 1.5 0 0 1 0 11.5v-10A1.5 1.5 0 0 1 1.5 0h10A1.5 1.5 0 0 1 13 1.5v6.636a.5.5 0 0 1-1 0V1.5a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h6.636a.5.5 0 0 1 .5.5z"/>
                            <path fill-rule="evenodd" d="M16 15.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h3.793L6.146 6.854a.5.5 0 1 1 .708-.708L15 14.293V10.5a.5.5 0 0 1 1 0v5z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" class="card-expander bi bi-box-arrow-up-left position-absolute bottom-0 end-100" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5z"/>
                            <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0v-5z"/>
                        </svg>
                    </div>
                </div>
            */

        }
        else {
            this._card_body.innerHTML += "<div class=\"d-flex flex-row flex-row \">"
                +"<div class=\"flex-grow-1 \">"
                    +"<div href=\"\" class=\" card-link \" style=\"height: 1.5rem\"></div>"
                +"</div>"
                +"<div class=\"position-relative\">"
                    +"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1.5rem\" height=\"1.5rem\" fill=\"currentColor\" class=\"card-expander bi bi-box-arrow-down-right  position-absolute bottom-0 end-100 text-primary hover-target \" viewBox=\"0 0 16 16\">"
                        +"<path fill-rule=\"evenodd\" d=\"M8.636 12.5a.5.5 0 0 1-.5.5H1.5A1.5 1.5 0 0 1 0 11.5v-10A1.5 1.5 0 0 1 1.5 0h10A1.5 1.5 0 0 1 13 1.5v6.636a.5.5 0 0 1-1 0V1.5a.5.5 0 0 0-.5-.5h-10a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h6.636a.5.5 0 0 1 .5.5z\"/>"
                        +"<path fill-rule=\"evenodd\" d=\"M16 15.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h3.793L6.146 6.854a.5.5 0 1 1 .708-.708L15 14.293V10.5a.5.5 0 0 1 1 0v5z\"/>"
                    +"</svg>"
                    +"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1.5rem\" height=\"1.5rem\" fill=\"currentColor\" class=\"card-expander d-none bi bi-box-arrow-up-left position-absolute bottom-0 end-100 text-primary hover-target \" viewBox=\"0 0 16 16\">"
                            +"<path fill-rule=\"evenodd\" d=\"M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5z\"/>"
                            +"<path fill-rule=\"evenodd\" d=\"M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0v-5z\"/>"
                    +"</svg>"
                +"</div>";
        }
        this._card_body.innerHTML += "</div>";
    }

    collapsing(){

        if (this._data.content.length >= 100){

            if(this._data.title == '' && this._data.link != ''){
                this._card_body.children[1].innerHTML = text_trancate(this._data.content, text_trancate_sizes['notitle_link']);
            }
            if(this._data.title != '' && this._data.link == ''){
                this._card_body.children[2].innerHTML = text_trancate(this._data.content, text_trancate_sizes['title_nolink']);
            }
            if(this._data.title == '' && this._data.link == ''){
                this._card_body.children[1].innerHTML = text_trancate(this._data.content, text_trancate_sizes['notitle_nolink']);
            }
            if(this._data.title != '' && this._data.link != ''){
                this._card_body.children[2].innerHTML = text_trancate(this._data.content, text_trancate_sizes['title_link']);
            }
        }
        else {
            if(this._data.title == '') {
                this._card_body.children[1].innerHTML = this._data.content;
            }
            else {
                this._card_body.children[2].innerHTML = this._data.content;
            }

        }
    }

    expanding(){
        // console.log(this._card_body.children);

        if(this._data.title == '') {
                this._card_body.children[1].innerHTML = this._data.content;
            }
            else {
                this._card_body.children[2].innerHTML = this._data.content;
            }
    }
}


function isMobileDevice() {
    const isMobileUA = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isHighDPI = window.devicePixelRatio >= 2;
    const isSmallScreen = window.innerWidth < 768;

    //return isMobileUA || (isHighDPI && isSmallScreen);
    if (isMobileUA || (isHighDPI && isSmallScreen)) {
        document.getElementById('isMobile').innerText = "Скорее всего, это мобильное устройство";
    } else {
        document.getElementById('isMobile').innerText = "Десктоп или устройство без высокого DPI";
    }
}

function text_trancate(str, numLts){
    let res = '';
    for(let i=0; i<(numLts-3); i++){
        res += str[i];
    }
    res += '...';

    return res;
}

text_trancate_sizes = { 'notitle_link': 190, 'title_nolink': 120, 'notitle_nolink': 200, 'title_link': 100 }
