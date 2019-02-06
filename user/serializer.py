import re
from rest_framework import serializers
from django.contrib.auth import get_user_model
from datetime import datetime
from datetime import timedelta
from rest_framework.validators import UniqueValidator

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """
    User Profile
    """
    class Meta:
        model = User
        fields = ("name", "gender", "birthday", "email", "mobile")


class UserRegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(label="username", required=True, allow_blank=False,
                                     validators=[UniqueValidator(queryset=User.objects.all(), message="User already exists")])

    password = serializers.CharField(
         label="password", style={'input_type': 'password'},  write_only=True,
    )

    def create(self, validated_data):
        user = super(UserRegisterSerializer, self).create(validated_data=validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user

    class Meta:
        model = User
        fields = ("username", "email", "mobile", "password")
