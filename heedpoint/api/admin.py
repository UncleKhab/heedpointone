from django.contrib import admin
from .models import Project, Task, RequestMessage
# Register your models here.

admin.site.register(Project)
admin.site.register(Task)
admin.site.register(RequestMessage)
