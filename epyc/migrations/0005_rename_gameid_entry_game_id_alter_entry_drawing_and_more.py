# Generated by Django 4.2.3 on 2023-07-06 04:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('epyc', '0004_entry_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='entry',
            old_name='gameId',
            new_name='game_id',
        ),
        migrations.AlterField(
            model_name='entry',
            name='drawing',
            field=models.BinaryField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='entry',
            name='sentence',
            field=models.CharField(blank=True, max_length=500),
        ),
        migrations.AlterField(
            model_name='entry',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='game',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]