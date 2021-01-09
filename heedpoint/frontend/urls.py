from django.urls import path
from .views import index
urlpatterns = [
    path('', index),
    path('newproject/', index),
    path('myprojects/', index),
    path('project/<int:id>', index),
    path('login/', index)
]
