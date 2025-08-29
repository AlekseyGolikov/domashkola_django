from django.shortcuts import render
from django.http import HttpResponse
from .models import Content

sections = { 
		'preSchool': 'Дошкольники', 
		'elementarySchool': 'Начальная школа', 
		'upperSchool': 'Средняя школа'
}
preSchool = {
	'1_2': 'Возраст 1 - 2 года',
	'2_3': 'Возраст 2 - 3 года',
	'3_5': 'Возраст 3 - 5 года',
	'5_7': 'Возраст 5 - 7 лет'
	
}
elementarySchool = {
	'1': '1 класс',
	'2': '2 класс',
	'3': '3 класс',
	'4': '4 класс'
}
upperSchool = {
	'5': '5 класс',
	'6': '6 класс',
	'7': '7 класс',
	'8': '8 класс',
	'9': '9 класс',
	'10': '10 класс',
	'11': '11 класс'
}
subjects_0 = {
	'rus': 'Русский язык',
	'lit': 'Чтение',
	'tales': 'Сказки'
}
subjects_1 = {
	'rus': 'Русский язык',
	'lit': 'Чтение',
	'geo': 'Окружающий мир'
}
subjects_2 = {
	'rus': 'Русский язык',
	'lit': 'Чтение',
	'geo': 'Окружающий мир'
}
subjects_3 = {
	'rus': 'Русский язык',
	'lit': 'Чтение',
	'geo': 'Окружающий мир'
}
subjects_4 = {
	'rus': 'Русский язык',
	'lit': 'Чтение',
	'eng': 'Английский язык',
	'math': 'Математика',
	'geo': 'Окружающий мир'
}
subjects_5 = {
	'rus': 'Русский язык',
	'lit': 'Чтение',
	'eng': 'Английский язык',
	'math': 'Математика',
	'geo': 'География',
	'hist': 'История'
}
subjects_6 = {
	'rus': 'Русский язык',
	'lit': 'Чтение',
	'eng': 'Английский язык',
	'math': 'Математика',
	'geo': 'География',
	'hist': 'История'
}
subjects_7 = {
	'rus': 'Русский язык',
	'lit': 'Литература',
	'eng': 'Английский язык',
	'math': 'Математика',
	'geo': 'География',
	'phys': 'Физика',
	'hist': 'История'
}
subjects_8 = {
	'rus': 'Русский язык',
	'lit': 'Литература',
	'eng': 'Английский язык',
	'math': 'Математика',
	'geo': 'География',
	'phys': 'Физика',
	'bio': 'Биология',
	'hist': 'История'
}
subjects_9 = {
	'rus': 'Русский язык',
	'lit': 'Литература',
	'eng': 'Английский язык',
	'math': 'Математика',
	'geo': 'География',
	'phys': 'Физика',
	'bio': 'Биология',
	'hist': 'История'
}
subjects_10 = {
	'rus': 'Русский язык',
	'lit': 'Литература',
	'eng': 'Английский язык',
	'math': 'Математика',
	'geo': 'География',
	'phys': 'Физика',
	'bio': 'Биология',
	'hist': 'История'
}
subjects_11 = {
	'rus': 'Русский язык',
	'lit': 'Литература',
	'eng': 'Английский язык',
	'math': 'Математика',
	'geo': 'География',
	'phys': 'Физика',
	'bio': 'Биология',
	'hist': 'История'
}
presentation = {
	'cartoon': 'Мультфильмы',
	'cinema': 'Кино',
	'clip': 'Клипы',
	'play': 'Игры',
	'channel': 'Каналы',
	'site': 'Сайты'
}
formatData = {
	'text': 'Текст',
	'movie': 'Видео',
	'file': 'Файлы',
	'link': 'Ссылки',		

}



 
def index(request):
	count = Content.objects.count()
	content = Content.objects.all()
	context = {
		'title': 'Домашняя школа',
		'sections': sections,
		'preSchool': preSchool,
		'elementarySchool': elementarySchool,
		'upperSchool': upperSchool,
		'subjects_0': subjects_0,
		'subjects_1': subjects_1,
		'subjects_2': subjects_2,
		'subjects_3': subjects_3,
		'subjects_4': subjects_4,
		'subjects_5': subjects_5,
		'subjects_6': subjects_6,
		'subjects_7': subjects_7,
		'subjects_8': subjects_8,
		'subjects_9': subjects_9,
		'subjects_10': subjects_10,
		'subjects_11': subjects_11,
		'presentation': presentation,
		'formatData': formatData,
		'content': content,
		'count': count,
	}
	return render(request, 'storage/index.html', context)
 