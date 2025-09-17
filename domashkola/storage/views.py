from django.shortcuts import render
from django.http import JsonResponse
from .models import Content, Grades, Subjects, Presentation, FormatData
from django.core.serializers.json import DjangoJSONEncoder
from django.core.serializers import serialize
import json


# class ContentEncoder(DjangoJSONEncoder):
#     def default(self, obj):
#         if isinstance(obj, Content):
#             return {"grade": obj.grade, "subject": obj.subject}
#             # return obj.__dict__
#         return super().default()

def menujson(request):
	res = {}
	# resp = Subjects.objects.values('subject_name', 'subject_code').order_by('-subject_name')
	resp1 = Grades.objects.values('grade_name', 'grade_code').order_by('id')
	resp2 = Subjects.objects.values('subject_name', 'subject_code').order_by('id')
	resp3 = Presentation.objects.values('presentation_name', 'presentation_code').order_by('id')
	resp4 = FormatData.objects.values('format_name', 'format_code').order_by('id')
	resp5 = Content.objects.values('grade', 'subject', 'presentation', 'formatData', 'content').order_by('id')
	res1 = [item for item in resp1]
	res2 = [item for item in resp2]
	res3 = [item for item in resp3]
	res4 = [item for item in resp4]
	res5 = [item for item in resp5]
	res['grades'] = res1
	res['subjects'] = res2
	res['presentation'] = res3
	res['formatData'] = res4
	res['content'] = res5
	return JsonResponse(res, safe=False)


def contentjson(request):
	resp = Content.objects.values('grade', 'subject', 'presentation', 'formatData', 'content').order_by('-grade')
	res = [item for item in resp]
	# print(f'res = {res} \n ---------')

	resp2 = [{'a': 'ab34s', 'b': 222}, {'a': '23', 'b': 212422}]

	return JsonResponse(res, safe=False)



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
subjects_1_2 = {
	# 'rus': 'Русский язык',
	# 'lit': 'Чтение',
	'tales': 'Сказки'
}
subjects_2_3 = {
	# 'rus': 'Русский язык',
	'lit': 'Чтение',
	'tales': 'Сказки'
}
subjects_3_5 = {
	'rus': 'Русский язык',
	'lit': 'Чтение',
	'tales': 'Сказки'
}
subjects_5_7 = {
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
	'clip': 'Книги',
	'teach': 'Учебники',
	'play': 'Настольные игры',
	'channel': 'Каналы',
	'site': 'Сайты'
}
formatData = {
	'text': 'Текст',
	'movie': 'Видео',
	'file': 'Файлы',
	'link': 'Ссылки',
}

def makeMenu():
	content = Content.objects.count()
	menu = dict()
	i = 0
	for raw in content:
		pass


def index(request):
	count = Content.objects.count()
	content = Content.objects.all()
	context = {
		'title': 'Домашняя школа',
		'sections': sections,
		'preSchool': preSchool,
		'elementarySchool': elementarySchool,
		'upperSchool': upperSchool,
		'subjects_1_2': subjects_1_2,
		'subjects_2_3': subjects_2_3,
		'subjects_3_5': subjects_3_5,
		'subjects_5_7': subjects_5_7,
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
