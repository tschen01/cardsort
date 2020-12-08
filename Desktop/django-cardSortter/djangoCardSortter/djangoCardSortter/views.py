from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.template import Context, Template
from django.shortcuts import redirect
import json
import uuid
import datetime


def homepage(request):
    return render(request, 'home_view.html')

def about(request):
    return render(request, 'about.html')

@csrf_exempt
def submit_card(request):
    userID = uuid.uuid4()
    data = json.loads(request.body)
    date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    jsonName = 'json/' + str(userID) + '_' + date + '.json'
    with open(jsonName, 'w') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    t = Template('This is your MTurk Code: <span>{{ message }}</span>.')

    c = Context({'message': userID})
    html = t.render(c)
    return HttpResponse(html)
    # return render(request, 'thankyou.html')

# def thankyoupage(request):
#     return render(request, 'thankyou.html')
    # t = Template('This is your MTurk Code: <span>{{ message }}</span>.')

    # c = Context({'message': userID})
    # html = t.render(c)
    # return HttpResponse(html)
    # return render(request,html)
