# Generated by Django 3.1.5 on 2021-01-11 19:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20210107_1928'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='members',
            field=models.ManyToManyField(related_name='members', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='RequestMessage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(blank=True, max_length=100, null=True)),
                ('request', models.IntegerField(default=0)),
                ('recipient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='requests', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_requests', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
