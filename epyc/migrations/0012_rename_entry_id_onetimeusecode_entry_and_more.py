# Generated by Django 4.2.3 on 2023-08-31 21:29

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("epyc", "0011_rename_onetimeusecodes_onetimeusecode"),
    ]

    operations = [
        migrations.RenameField(
            model_name="onetimeusecode",
            old_name="entry_id",
            new_name="entry",
        ),
        migrations.RemoveField(
            model_name="onetimeusecode",
            name="game_id",
        ),
    ]
