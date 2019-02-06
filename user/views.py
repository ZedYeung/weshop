from django.shortcuts import render
from rest_framework import mixins, viewsets
from .models import User
from .serializer import UserRegisterSerializer


class UserViewset(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    User
    """
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer



