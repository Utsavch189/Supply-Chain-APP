from rest_framework.response import Response
from rest_framework.decorators import api_view
from .Jwt import auths
from .models import *
import json
from datetime import date
from .UID import creates
import random
from .Mail import mail,remail


@api_view(['POST','GET'])
def jwt(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    email=body['uid']
    password=body['password']
    if Register.objects.exists():
        obj=Register.objects.filter(email=email)
        obj2=obj.filter(password=password)
        if obj2.exists():
            data={
                "uid":obj2.values('email')[0]['email'],
                "password":obj2.values('password')[0]['password'],
                "name":obj2.values('name')[0]['name'],
                "id":obj.values('id_no')[0]['id_no'],
                "role":obj.values('role')[0]['role']
            }
            a=auths(data,"")
            JWTs=a.encoded_jwt()
            print(JWTs)
            return Response({"token":JWTs,"status":200})
        else:
            return Response({"msg":"Invalid Credentials","status":400})
    else:
        return Response({"msg":"Invalid Credentials","status":400})


@api_view(['POST'])
def createuser(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    name=body['fname']+body['lname']
    number=body['number']
    email=body['email']
    whatsapp_no=body['whatsapp']
    gender=body['gender']
    role=body['role']
    password=body['password']
   
    try:
        idd=creates()
        x=Register(name=name,phone=number,email=email,password=password,gender=gender,whatsapp_no=whatsapp_no,role=role,id_no=idd,created_at=date.today())
        x.save()
        return Response({"msg":"Successfully Registered","status":200})
    except:
        return Response({"msg":"Something Wrong","status":400})


@api_view(['POST'])
def sendotp(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    email=body['email']
    obb=Register.objects.filter(email=email)
    if obb.exists():
        name=obb.values('name')[0]['name']
        otp=random.randint(1111,9999)
        try:
            otpobj=OTP.objects.filter(email=email)
            if otpobj.exists():
                otpobj.update(otp=otp)
            else:
                x=OTP(email=email,otp=otp,created_at=datetime.now())
                x.save()
            mail(email,name,otp)
            return Response({"msg":"successful","status":200})
        except:
            return Response({"msg":"error","status":400})


@api_view(['POST'])
def resetpassword(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    email=body['email']
    password=body['password']
    f=body['f']
    s=body['s']
    t=body['t']
    fo=body['fo']
    usersotp=int(str(f)+str(s)+str(t)+str(fo))
    obb=Register.objects.filter(email=email)
    if obb.exists():
        name=obb.values('name')[0]['name']
        otpobj=OTP.objects.filter(email=email)
        otp=int(otpobj.values('otp')[0]['otp'])
        if usersotp==otp:
            try:
                obb.update(password=password)
                remail(email,name)
                return Response({"msg":"Password Changed","status":200})
            except:
                return Response({"msg":"error","status":400})
        else:
            return Response({"msg":"invalid OTP","status":401})