from django.urls import path
from .views import (
    ProjectList,
    ProjectDetails,
    ProjectTaskList,
    TaskDetails,
    LoginView,
    LogoutView,
    RegisterView,
)
urlpatterns = [
    path('projects', ProjectList.as_view(), name="projects"),
    path('get-project', ProjectDetails.as_view()),
    path('tasks', ProjectTaskList.as_view()),
    path('task/<int:id>/', TaskDetails.as_view()),
    path('createtask/', TaskDetails.as_view()),



    # Authentications Views
    path('login/', LoginView, name="login"),
    path('logout/', LogoutView, name='logout'),
    path('register/', RegisterView, name='register')
]
