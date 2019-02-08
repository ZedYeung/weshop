from django.db import models
from django.contrib.auth import get_user_model

from shop.models import Product

User = get_user_model()

# Create your models here.
class Cart(models.Model):
    """
    Shopping Cart
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)

    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'cart'
        verbose_name_plural = 'carts'
        unique_together = ('user', 'product')

    def __str__(self):
        return "{}({})".format(self.product.name, self.quantity)
