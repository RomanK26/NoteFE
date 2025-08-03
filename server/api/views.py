from django.contrib.auth.models import User
from django.core.cache import cache
from rest_framework import filters
from rest_framework.generics import (CreateAPIView, ListCreateAPIView,
                                     RetrieveUpdateDestroyAPIView)
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from api.permissions import IsOwner
from api.serializers import NoteSerializer, UserSerializer

from .models import Note

# Create your views here.


class RegistrationView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    queryset = User.objects.all()


class NoteListCreateView(ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsOwner,]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'content']

    def get_queryset(self):
        user = self.request.user
        notes = Note.objects.filter(author=user)
        return notes

    def list(self, request, *args, **kwargs):
        user = self.request.user
        cache_key = f"notes_user_{user.id}"
        cached_data = cache.get(cache_key)

        if cached_data:
            return Response(cached_data)

        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        cache.set(cache_key, serializer.data, timeout=300)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class NoteUpdateDetailDeleteView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwner,]
    serializer_class = NoteSerializer
    queryset = Note.objects.all()
