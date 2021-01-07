from django.urls import path
from .views import ProjectList, ProjectDetails, TaskDetails, TaskCreate
urlpatterns = [
    path('projects/', ProjectList.as_view()),
    path('project/<int:id>/', ProjectDetails.as_view()),
    path('task/<int:id>/', TaskDetails.as_view()),
    path('createtask/', TaskCreate.as_view())
]
