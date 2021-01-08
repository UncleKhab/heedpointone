from django.urls import path
from .views import ProjectList, ProjectDetails, TaskDetails, TaskCreate, RegisterAPI
urlpatterns = [
    path('projects/', ProjectList.as_view()),
    path('get-project', ProjectDetails.as_view()),
    path('task/<int:id>/', TaskDetails.as_view()),
    path('createtask/', TaskCreate.as_view()),
    path('register/', RegisterAPI.as_view(), name='register'),
]
