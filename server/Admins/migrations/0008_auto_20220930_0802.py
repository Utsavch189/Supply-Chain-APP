# Generated by Django 3.2.8 on 2022-09-30 02:32

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Admins', '0007_auto_20220929_1324'),
    ]

    operations = [
        migrations.AlterField(
            model_name='approvedusers',
            name='approved_at',
            field=models.DateField(verbose_name=datetime.date(2022, 9, 30)),
        ),
        migrations.AlterField(
            model_name='deletedusers',
            name='deleted_at',
            field=models.DateField(verbose_name=datetime.date(2022, 9, 30)),
        ),
    ]