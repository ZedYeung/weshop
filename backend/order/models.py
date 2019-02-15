from django.db import models
from django.contrib.auth import get_user_model

from shop.models import Product

User = get_user_model()

# Create your models here.
class Order(models.Model):
    """
    Order
    """
    PAY_STATUS = (
        ("succeeded", "succeeded"),
        ("pending", "pending"),
        ("failed", "failed")
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order_id = models.CharField(max_length=40, null=True, blank=True, unique=True)
    stripe_id = models.CharField(max_length=40, null=True, blank=True, unique=True)
    order_amount = models.DecimalField(max_digits=6, decimal_places=2)
    pay_status = models.CharField(max_length=30, choices=PAY_STATUS, default="pending")
    pay_time = models.DateTimeField(null=True, blank=True)
    customer_message = models.CharField(max_length=200, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    # shipping information
    shipping_fullname = models.CharField(max_length=30, blank=True)
    shipping_address1 = models.CharField(max_length=30, blank=True)
    shipping_address2 = models.CharField(max_length=30, null=True, blank=True)
    shipping_city = models.CharField(max_length=30, blank=True)
    shipping_state = models.CharField(max_length=30, blank=True)
    shipping_country = models.CharField(max_length=30, blank=True)
    shipping_zipcode = models.CharField(max_length=30, blank=True)
    shipping_phone = models.CharField(max_length=11, blank=True)


    class Meta:
        verbose_name = 'order'
        verbose_name_plural = 'orders'

    def __str__(self):
        return "{}".format(self.order_id)


class OrderProduct(models.Model):
    """
    Order product
    """
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="product")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)

    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "order product"
        verbose_name_plural = "order products"

    def __str__(self):
        return "{} {}".format(self.order.order_id, self.product.name)

