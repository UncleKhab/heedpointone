from django.db import models
from django.contrib.auth.models import User, AbstractUser

# Create your models here.
PRIORITY_VALUES = (
    ('h', 'High Priority'),
    ('m', 'Medium Priority'),
    ('l', 'Low Priority'),
)

STATUS_VALUES = (
    ('p', 'Pending'),
    ('r', 'Review'),
    ('s', 'Started'),
    ('f', 'Finished'),
)


class User(AbstractUser):
    pass


# class ProjectMembers(models.Model):
#     project = models.ForeignKey(
#         'Project', on_delete=models.CASCADE, related_name="members")
#     members = models.ForeignKey(User, on_delete=models.CASCADE, related_name="member")


class Project(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="myprojects")
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    timestamp = models.DateTimeField(auto_now_add=True)
    deadline = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.id} - {self.title} - {self.owner}"


class Task(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="tasks")
    title = models.CharField(max_length=100)
    requirements = models.CharField(max_length=500)
    points = models.IntegerField(default=0)
    status = models.CharField(
        max_length=1,
        choices=STATUS_VALUES,
        default='p',
        help_text='Status'
    )
    priority = models.CharField(
        max_length=1,
        choices=PRIORITY_VALUES,
        default='l',
        help_text='Priority'
    )

    def __str__(self):
        return self.title
