from django.core.mail import send_mail

def mail(email,name,otp):
    subject=f'OTP verification'
    body=f'{name} Your Reset Password OTP is {otp}'
    mail_sender = 'utsavpokemon9000chatterjee@gmail.com'
    send_mail(subject, body, mail_sender, [email], fail_silently=False)