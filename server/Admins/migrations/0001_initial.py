# Generated by Django 3.2.8 on 2022-10-13 06:16

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ApprovedUsers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=40, null=True)),
                ('phone', models.CharField(blank=True, max_length=15, null=True)),
                ('email', models.CharField(blank=True, max_length=46, null=True)),
                ('password', models.CharField(blank=True, max_length=256, null=True)),
                ('gender', models.CharField(blank=True, max_length=6, null=True)),
                ('whatsapp_no', models.CharField(blank=True, max_length=15, null=True)),
                ('role', models.CharField(blank=True, max_length=15, null=True)),
                ('id_no', models.CharField(blank=True, max_length=25, null=True)),
                ('approved_at', models.DateField(verbose_name=datetime.date(2022, 10, 13))),
            ],
        ),
        migrations.CreateModel(
            name='DeletedUsers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=40, null=True)),
                ('phone', models.CharField(blank=True, max_length=15, null=True)),
                ('email', models.CharField(blank=True, max_length=46, null=True)),
                ('password', models.CharField(blank=True, max_length=256, null=True)),
                ('gender', models.CharField(blank=True, max_length=6, null=True)),
                ('whatsapp_no', models.CharField(blank=True, max_length=15, null=True)),
                ('role', models.CharField(blank=True, max_length=15, null=True)),
                ('id_no', models.CharField(blank=True, max_length=25, null=True)),
                ('deleted_at', models.DateField(verbose_name=datetime.date(2022, 10, 13))),
            ],
        ),
    ]
