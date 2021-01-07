from django.shortcuts import render
from .models import Project, Task
from .serializers import (
    ProjectSerializer,
    CreateProjectSerializer,
    ProjectDetailSerializer,
    TaskSerializer)
from django.http import HttpResponse

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


class ProjectList(generics.ListCreateAPIView):
    def get_queryset(self):
        user = self.request.user
        return user.myprojects.all()
    serializer_class = ProjectSerializer

    def post(self, request, format=None):
        serializer = CreateProjectSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            title = serializer.data.get('title')
            description = serializer.data.get('description')
            deadline = serializer.data.get('deadline')
        project = Project(owner=user, title=title,
                          description=description, deadline=deadline)
        project.save()
        return Response(ProjectSerializer(project).data, status=status.HTTP_201_CREATED)


class ProjectDetails(APIView):
    def get_object(self, id):
        try:
            return Project.objects.get(id=id)

        except Project.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, id):
        project = self.get_object(id)
        serializer = ProjectDetailSerializer(project)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TaskDetails(APIView):
    def get_object(self, id):
        try:
            return Task.objects.get(id=id)
        except Task.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, id):
        task = self.get_object(id)
        serializer = TaskSerializer(task)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        task = self.get_object(id)
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        task = self.get_object(id)
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TaskCreate(APIView):
    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
