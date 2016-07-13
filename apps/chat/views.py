from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    return render(request, 'chat/index.html', {
    })


def robots(request):
    """`robot.txt <http://www.robotstxt.org>`_"""
    return HttpResponse('User-agent: *\nDisallow: /')

