from rest_framework import serializers
from .models import Project, Task, User


class ProjectSerializer(serializers.ModelSerializer):
    projectowner = serializers.SerializerMethodField('get_owner')
    tasks = serializers.SerializerMethodField('get_task_count')
    completed_tasks = serializers.SerializerMethodField(
        'get_completed_task_count')

    class Meta:
        model = Project
        fields = ['id', 'projectowner', 'title',
                  'description', 'deadline', 'tasks', 'completed_tasks']

    def get_owner(self, obj):
        return(obj.owner.username)

    def get_task_count(self, obj):
        return obj.tasks.all().count()

    def get_completed_task_count(self, obj):
        return obj.tasks.all().filter(status='f').count()


class CreateProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['title', 'description', 'deadline']


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'project', 'title', 'requirements',
                  'points', 'status', 'priority']


class ProjectDetailSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer('get_tasks', many=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'tasks', 'description', 'deadline']

    def get_tasks(self, obj):
        return(task for task in obj.tasks.all())

# User Serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        field = ('id', 'username', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])

        return user
