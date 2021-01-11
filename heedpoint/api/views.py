import json
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from .models import Project, Task, User, RequestMessage
from .serializers import (
    ProjectSerializer,
    CreateProjectSerializer,
    ProjectDetailSerializer,
    TaskSerializer,
    UserSerializer,
    RegisterSerializer,
    RequestMessageSerializer,
    CreateMessageSerializer)
from django.http import HttpResponse

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


class RequestMessageView(APIView):
    def get(self, request):
        user = self.request.user
        request_messages = user.requests.all().order_by('-id')
        serializer = RequestMessageSerializer(request_messages, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CreateMessageSerializer(data=request.data)
        if serializer.is_valid():
            sender = self.request.user
            message = serializer.data.get('message')
            request = serializer.data.get('request')
            recipient_id = serializer.data.get('recipient')
            recipient = User.objects.get(id=recipient_id)
            request_message = RequestMessage(
                sender=sender, message=message, request=request, recipient=recipient)
            request_message.save()
            return Response(RequestMessageSerializer(request_message).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)


class ProjectList(APIView):

    def get(self, request):
        self.lookup_url_kwarg = 'box'
        user = self.request.user
        box = request.GET.get(self.lookup_url_kwarg)
        if box != None:
            if box == 'myprojects':
                projectList = user.myprojects.all()
                serializer = ProjectSerializer(projectList, many=True)
                return Response(serializer.data)
            elif box == "allprojects":
                projectList = Project.objects.all()
                serializer = ProjectSerializer(projectList, many=True)
                return Response(serializer.data)

        return Response({'Bad Request': 'Box Parameter not Found in Request'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        serializer = CreateProjectSerializer(data=request.data)
        if serializer.is_valid():
            user = self.request.user
            title = serializer.data.get('title')
            description = serializer.data.get('description')
            deadline = serializer.data.get('deadline')
        project = Project(owner=user, title=title,
                          description=description, deadline=deadline)
        project.save()
        return Response(ProjectSerializer(project).data, status=status.HTTP_201_CREATED)


class ProjectDetails(APIView):
    serializer_class = ProjectDetailSerializer
    lookup_url_kwarg = 'id'

    def get_object(self, request):
        id = request.GET.get(self.lookup_url_kwarg)
        if id != None:
            try:
                return Project.objects.get(id=id)
            except Project.DoesNotExist:
                return Response({'Project Not Found': 'Invalid Project Id'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Id Parameter not Found in Request'}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        project = self.get_object(request)
        serializer = ProjectDetailSerializer(project)
        isOwner = project.owner == request.user
        isMember = True
        if not isOwner:
            isMember = request.user in project.members.all()
        obj = serializer.data
        obj['isOwner'] = isOwner
        obj['isMember'] = isMember
        obj['ownerId'] = request.user.id
        return Response(obj)

    def put(self, request):
        project = self.get_object(request)
        user = request.user
        if project.owner != user:
            return Response({'Bad Request': 'You need to be the owner to modify this project'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = CreateProjectSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        project = self.get_object(request)
        user = request.user
        if project.owner != user:
            return Response({'Bad Request': 'You need to be the owner to modify this project'}, status=status.HTTP_400_BAD_REQUEST)
        project.delete()
        return Response({'Deleted Successfully': 'Done!'})


class ProjectTaskList(APIView):
    lookup_url_kwarg = 'id'

    def get_object(self, request):
        id = request.GET.get(self.lookup_url_kwarg)
        if id != None:
            try:
                return Project.objects.get(id=id)
            except Project.DoesNotExist:
                return Response({'Project Not Found': 'Invalid Project Id'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Id Parameter not Found in Request'}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        project = self.get_object(request)
        taskList = project.tasks.all().order_by('-id')
        serializer = TaskSerializer(taskList, many=True)
        return Response(serializer.data)


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
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -- USER AUTHENTICATION RELATED VIEWS!


def LoginView(request):
    if request.method == "POST":

        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('/')
        else:
            return JsonResponse({"error": "User Not Found"}, status=404)
    else:
        return JsonResponse({"error": "You need to send a POST request"}, status=403)


def LogoutView(request):
    logout(request)
    return JsonResponse({"message": "You have been logged out"}, status=200)


def RegisterView(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return JsonResponse({
                "message": "Passwords must match."
            }, status=403)

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return JsonResponse({
                "message": "Username already taken."
            }, status=403)
        login(request, user)
        return redirect('/')
    else:
        return JsonResponse({"error": "You need to send a POST request"}, status=403)
