from django.urls import path

from api.views import NoteListCreateView, NoteUpdateDetailDeleteView, RegistrationView

urlpatterns = [
    path("register/",RegistrationView.as_view(), name = 'register'),
    path("notes/",NoteListCreateView.as_view(),name="ListCreate"),
    path("notes/<int:pk>/",NoteUpdateDetailDeleteView.as_view(),name='DetailUpdateDelete')
]
