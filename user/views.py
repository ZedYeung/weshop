from django.shortcuts import render
from rest_framework import mixins, viewsets
from rest_framework import permissions
from rest_framework import authentication
from rest_framework import status
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.serializers import jwt_payload_handler, jwt_encode_handler
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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)

        res = serializer.data
        payload = jwt_payload_handler(user)
        res["token"] = jwt_encode_handler(payload)

        headers = self.get_success_headers(serializer.data)
        return Response(res, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        return serializer.save()



