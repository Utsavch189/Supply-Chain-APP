# Generated by Django 3.2.8 on 2022-10-08 07:12

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Auth', '0033_auto_20221008_1239'),
    ]

    operations = [
        migrations.AddField(
            model_name='otp',
            name='created_at_time',
            field=models.TimeField(default=datetime.time(12, 42, 11, 175273)),
        ),
        migrations.AlterField(
            model_name='otp',
            name='created_at_date',
            field=models.DateField(default=datetime.date(2022, 10, 8)),
        ),
    ]