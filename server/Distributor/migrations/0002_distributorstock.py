# Generated by Django 3.2.8 on 2022-09-30 04:32

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Distributor', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DistributorStock',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_id', models.CharField(blank=True, max_length=30, null=True)),
                ('product_name', models.CharField(blank=True, max_length=25, null=True)),
                ('manufacturer_id', models.CharField(blank=True, max_length=50, null=True)),
                ('distributor_id', models.CharField(blank=True, max_length=50, null=True)),
                ('product_quantity', models.CharField(blank=True, max_length=10, null=True)),
                ('total_price', models.CharField(blank=True, max_length=10, null=True)),
                ('price_per_product', models.CharField(blank=True, max_length=10, null=True)),
                ('date', models.DateField(verbose_name=datetime.date(2022, 9, 30))),
            ],
        ),
    ]