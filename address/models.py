from datetime import datetime

from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
User = get_user_model()


class Address(models.Model):
    """
    Address
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    fullname = models.CharField(max_length=30, blank=True)
    phone = models.CharField(max_length=11, blank=True)
    address1 = models.CharField(max_length=30, blank=True)
    address2 = models.CharField(max_length=30, null=True, blank=True)
    city = models.CharField(max_length=30, blank=True)
    state = models.CharField(max_length=30, blank=True)
    country = models.CharField(max_length=30, blank=True)
    zipcode = models.CharField(max_length=30, blank=True)

    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "address"
        verbose_name_plural = "addresses"

    def __str__(self):
        return ", ".join([self.address1, self.address2, self.city, self.state, self.zipcode, self.country])
