# Generated by Django 4.2.3 on 2023-07-06 02:33

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('epyc', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entry',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='game',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
    ]