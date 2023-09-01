# Generated by Django 4.2.3 on 2023-09-01 00:33

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("epyc", "0013_onetimeusecode_expires_in"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="onetimeusecode",
            name="entry",
        ),
        migrations.AddField(
            model_name="onetimeusecode",
            name="path",
            field=models.TextField(default="/"),
            preserve_default=False,
        ),
    ]
