from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth import get_user_model

User = get_user_model()


class UserProfileSerializer(serializers.ModelSerializer):
    """
    User Profile
    """
    class Meta:
        model = User
        fields = ("first_name", "last_name", "birthday", "gender", "mobile", "email")


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
