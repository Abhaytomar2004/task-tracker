from django.urls import path
from .views import Tasks,AddDep
urlpatterns=[
 path('tasks/',Tasks.as_view()),
 path('tasks/<int:pk>/dependencies/',AddDep.as_view()),
]
