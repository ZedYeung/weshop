from datetime import datetime

from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    first_name = models.CharField(null=True, blank=True, max_length=30)
    last_name = models.CharField(null=True, blank=True, max_length=30)
    birthday = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=6, choices=(("O", "other"), ("M", "male"), ("F", "female")), default="O")
    mobile = models.CharField(null=True, blank=True, max_length=11)
    email = models.EmailField(null=True, blank=True, max_length=100)

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"

    def __str__(self):
        return self.username