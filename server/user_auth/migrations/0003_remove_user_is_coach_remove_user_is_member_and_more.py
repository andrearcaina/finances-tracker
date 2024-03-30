# Generated by Django 5.0.2 on 2024-03-30 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_auth', '0002_remove_user_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_coach',
        ),
        migrations.RemoveField(
            model_name='user',
            name='is_member',
        ),
        migrations.RemoveField(
            model_name='user',
            name='is_treasurer',
        ),
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.CharField(default='member', max_length=20),
        ),
    ]