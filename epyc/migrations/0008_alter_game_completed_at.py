# Generated by Django 4.2.3 on 2023-08-18 00:10

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("epyc", "0007_game_completed_at"),
    ]

    operations = [
        migrations.AlterField(
            model_name="game",
            name="completed_at",
            field=models.DateField(null=True),
        ),
    ]
