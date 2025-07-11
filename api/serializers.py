from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Note


class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id',"username","password"]
        extra_kwargs = {"password":{"write_only":True}}
        
    def create(self,validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    
    
class NoteSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)
    class Meta:
        model = Note
        fields = ['id','title','content','author','created_at']
   
    