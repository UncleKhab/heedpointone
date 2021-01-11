from django.urls import path
from .views import (
    LoginView,
    LogoutView,
    RegisterView,
    ProjectList,
    ProjectDetails,
    ProjectTaskList,
    TaskDetails,
    RequestMessageView,
)
urlpatterns = [
    path('projects', ProjectList.as_view(), name="projects"),
    path('get-project', ProjectDetails.as_view()),
    path('tasks', ProjectTaskList.as_view()),
    path('task/<int:id>/', TaskDetails.as_view()),
    path('createtask/', TaskDetails.as_view()),
    path('message/', RequestMessageView.as_view()),



    # Authentications Views
    path('login/', LoginView, name="login"),
    path('logout/', LogoutView, name='logout'),
    path('register/', RegisterView, name='register')
]
