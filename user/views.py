from django.shortcuts import render
from rest_framework import mixins, viewsets
from rest_framework import permissions
from rest_framework import authentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from .serializers import UserRegisterSerializer, UserProfileSerializer
from .models import User


class UserViewset(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    """
    User
    """
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer

    # default is BasicAuthentication and would popup auth window
    authentication_classes = (JSONWebTokenAuthentication, authentication.SessionAuthentication )

    def get_serializer_class(self):
        if self.action == "retrieve":
            return UserProfileSerializer
        elif self.action == "create":
            return UserRegisterSerializer

        return UserProfileSerializer

    # register would not require authentication
    def get_permissions(self):
        if self.action == "retrieve":
            return [permissions.IsAuthenticated()]
        elif self.action == "create":
            return []

        return [permissions.IsAuthenticated()]
        # return []

    # return current user with any id
    def get_object(self):
        return self.request.user



