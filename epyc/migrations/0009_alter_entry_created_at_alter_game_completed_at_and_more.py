# Generated by Django 4.2.3 on 2023-08-19 18:47

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("epyc", "0008_alter_game_completed_at"),
    ]

    operations = [
        migrations.AlterField(
            model_name="entry",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name="game",
            name="completed_at",
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name="game",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]